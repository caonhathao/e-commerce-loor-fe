import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import endpoints from "../../../services/endpoints.tsx";
import {fetchData, formatedNumber} from "../../../utils/functions.utils.tsx";
import {animate, press} from "motion"
import errImg from '../../../assets/img/404.png'
import UserCreateOrder from "./UserCreateOrder.tsx";
import {cartType, listVariantsType} from "../../../utils/data-types.tsx";
import apiClient from "../../../services/apiClient.tsx";
import {useUser} from "../../../context/UserContext.tsx";
import Loading from "../../../components/loading/Loading.tsx";

interface amountType {
    amount: number,
    variant_id: string,
    checked: boolean,
}

press("#add-btn", (element) => {
    animate(element, {scale: 0.8}, {type: "spring", stiffness: 1000})

    return () =>
        animate(element, {scale: 1}, {type: "spring", stiffness: 500})
})

press("#minus-btn", (element) => {
    animate(element, {scale: 0.8}, {type: "spring", stiffness: 100})

    return () =>
        animate(element, {scale: 1}, {type: "spring", stiffness: 100})
})

const UserCart = () => {
    const [data, setData] = useState<cartType[]>([])
    const [amount, setAmount] = useState<amountType[]>([])
    const [listVariants, setListVariants] = useState<listVariantsType>()
    const [openCreateOrder, setOpenCreateOrder] = useState<boolean>(false)
    const [total, setTotal] = useState<number>(0)
    const {user} = useUser()

    const handleAdd = (id: string, a: number) => {
        const newAmount = [...amount];
        const index = newAmount.findIndex(item => item.variant_id === id);

        if (index === -1) {
            newAmount.push({
                amount: a,
                variant_id: id,
                checked: false
            });
        } else {
            newAmount[index].amount += 1;
        }

        setAmount(newAmount);

        // Cập nhật nếu checked
        if (newAmount[index]?.checked) {
            const updated = updateListVariants(data, newAmount);
            setListVariants(updated);
        }
    };

    const handleMinus = (id: string) => {
        const newAmount = [...amount];
        const index = newAmount.findIndex(item => item.variant_id === id);

        if (index !== -1) {
            if (newAmount[index].amount === 1) {
                toast.warning('Số lượng không thể bằng 0');
                return;
            }

            newAmount[index].amount -= 1;
            setAmount(newAmount);

            // Cập nhật nếu checked
            if (newAmount[index].checked) {
                const updated = updateListVariants(data, newAmount);
                setListVariants(updated);
            }
        }
    };

    const getCheckedItemIds = (
        data: cartType[],
        amount: amountType[]
    ): string[] => {
        const checkedIds: string[] = [];

        data.forEach(brand => {
            brand.items.forEach(item => {
                const found = amount.find(a => a.variant_id === item.variant_id);
                if (found?.checked) {
                    checkedIds.push(item.id);
                }
            });
        });

        return checkedIds;
    };

    const handleDelete = async () => {
        if (listVariants === undefined) {
            toast.warning('Không có sản phẩm để xóa');
            return;
        }

        const idsToDelete = getCheckedItemIds(data, amount);

        if (idsToDelete.length === 0) {
            toast.warning('Bạn chưa chọn sản phẩm nào để xóa');
            return;
        }

        // Ví dụ log ra payload cần gửi
        console.log("Payload cần gửi:", idsToDelete);

        try {
            const response = await apiClient.delete(endpoints.user.deleteCart, {data: idsToDelete})
            if (response && response.status === 200) {
                fetchData(endpoints.user.getCart, true, setData, 'Lấy dữ liệu thất bại')
                return;
            } else {
                toast.error('Thất bại')
            }
        } catch (e) {
            console.error(e)
            toast.error('Xóa sản phẩm thât bại!')
        }
    };


    const updateListVariants = (
        brands: cartType[],
        amount: amountType[]
    ): listVariantsType | undefined => {
        const list = brands
            .map(brand => {
                const brandVariants = brand.items
                    .filter(item => amount.find(a => a.variant_id === item.variant_id)?.checked)
                    .map(item => {
                        const found = amount.find(a => a.variant_id === item.variant_id)!;
                        return {
                            variant_id: item.variant_id,
                            cart_id: item.id,
                            image_link: item.image_link,
                            variant_name: item.product_variants.name,
                            amount: found.amount,
                            cost: found.amount * item.product_variants.price
                        };
                    });

                if (brandVariants.length === 0) return null;

                const cost = brandVariants.reduce((sum, v) => sum + v.cost, 0);
                const fee = 0

                return {
                    brand_id: brand.brand_id,
                    brand_name: brand.brand_name,
                    list: brandVariants,
                    cost,
                    fee
                };
            })
            .filter(Boolean); // loại bỏ null

        if (list.length > 0)
            return {
                list: list as listVariantsType["list"]
            };
        else return undefined
    };

    const handleAddAllOfOne = (brand: cartType) => {
        const isAllChecked = brand.items.every(item =>
            amount.find(a => a.variant_id === item.variant_id)?.checked
        );

        const updatedAmount = [...amount];

        brand.items.forEach(item => {
            const index = updatedAmount.findIndex(a => a.variant_id === item.variant_id);

            if (isAllChecked) {
                if (index !== -1) updatedAmount[index].checked = false;
            } else {
                if (index !== -1) {
                    updatedAmount[index].checked = true;
                    updatedAmount[index].amount = item.amount !== updatedAmount[index].amount ? updatedAmount[index].amount : item.amount;
                } else {
                    updatedAmount.push({
                        variant_id: item.variant_id,
                        amount: item.amount !== updatedAmount[index].amount ? updatedAmount[index].amount : item.amount,
                        checked: true
                    });
                }
            }
        });

        setAmount(updatedAmount);
        setListVariants(updateListVariants(data, updatedAmount));
    };

    const handleAddOne = (
        item: cartType["items"][number],
    ) => {
        const index = amount.findIndex(a => a.variant_id === item.variant_id);
        const alreadyChecked = index !== -1 && amount[index].checked;
        const updatedAmount = [...amount];

        if (alreadyChecked) {
            updatedAmount[index].checked = false;
        } else if (index !== -1) {
            updatedAmount[index].checked = true;
            updatedAmount[index].amount = item.amount !== updatedAmount[index].amount ? updatedAmount[index].amount : item.amount;
        } else {
            updatedAmount.push({
                variant_id: item.variant_id,
                amount: item.amount !== updatedAmount[index].amount ? updatedAmount[index].amount : item.amount,
                checked: true
            });
        }

        setAmount(updatedAmount);
        setListVariants(updateListVariants(data, updatedAmount));
    };

    const handleAddAll = (brands: cartType[], isChecked: boolean) => {
        const isAllChecked = brands.every(brand =>
            brand.items.every(item =>
                amount.find(a => a.variant_id === item.variant_id)?.checked
            )
        );

        if (isAllChecked === true && isChecked === true) {
            return
        }

        const updatedAmount = [...amount];

        brands.forEach(brand => {
            brand.items.forEach(item => {
                const index = updatedAmount.findIndex(a => a.variant_id === item.variant_id);

                if (isAllChecked) {
                    if (index !== -1) updatedAmount[index].checked = false;
                } else {
                    if (index !== -1) {
                        updatedAmount[index].checked = true;
                        updatedAmount[index].amount = item.amount !== updatedAmount[index].amount ? updatedAmount[index].amount : item.amount;
                    } else {
                        updatedAmount.push({
                            variant_id: item.variant_id,
                            amount: item.amount !== updatedAmount[index].amount ? updatedAmount[index].amount : item.amount,
                            checked: true
                        });
                    }
                }
            });
        });

        setAmount(updatedAmount);
        setListVariants(isAllChecked ? undefined : updateListVariants(data, updatedAmount));
    };

    const handleCreateOrder = () => {
        if (listVariants === undefined) {
            toast.warning('Bạn chưa chọn sản phẩm nào!')
        } else setOpenCreateOrder(true)
    }

    useEffect(() => {
        if (!listVariants) {
            setTotal(0);
            return;
        }
        const totalCost = listVariants.list.reduce((sum, brand) => sum + brand.cost + brand.fee, 0);
        setTotal(totalCost);
    }, [listVariants]);

    //get user's cart data
    useEffect(() => {
        fetchData(endpoints.user.getCart, true, setData, 'Lấy dữ liệu thất bại')
    }, [])

    //set amount
    useEffect(() => {
        if (data.length > 0) {
            const newAmountList: amountType[] = [];

            data.forEach(brand => {
                brand.items.forEach(item => {
                    newAmountList.push({
                        amount: item.amount,
                        variant_id: item.variant_id,
                        checked: false
                    });
                });
            });

            setAmount(prev => [...prev, ...newAmountList]);
        }
    }, [data]);

    // useEffect(() => {
    //     console.log(user)
    // }, [user])

    if (!user) {
        return <Loading/>
    }

    return (
        <>
            <div className={'w-full h-full flex flex-col justify-center items-start flex-col'}>
                <div className={'min-h-[300px] max-h-[300px]'}></div>
                <div className={'w-full h-full flex flex-col justify-start items-center p-2 mt-2 pb-20'}>
                    {data.length > 0 ? (
                        data.map(brand => <div key={brand.brand_id}
                                               className={'w-full h-fit flex flex-col justify-between items-center'}>
                            <div className={'w-full flex flex-row justify-start items-center gap-2'}>
                                <img src={brand.brand_image || errImg}
                                     alt="brand"
                                     className={'w-12 h-12 border-2 broder-[rgb(var(--border-color))] rounded-full p-2'}/>
                                <p className={'text-lg border-t-2 border-b-2 border-[rgb(var(--border-color))] rounded-b-lg rounded-t-lg px-2 font-bold'}>{brand.brand_name}</p>
                                <div
                                    className={'w-full h-fit border-b-2 border-[rgb(var(--border-color))] rounded-b-lg'}>
                                </div>
                                <button type={'button'}
                                        id={'add-list-btn'}
                                        className={'w-full h-fit p-1 border-2 border-[rgb(var(--border-color))] rounded-full font-bold'}
                                        onClick={() => {
                                            handleAddAllOfOne(brand)
                                        }}>
                                    Tât cả
                                </button>
                            </div>
                            <div className={'w-full flex flex-col justify-start items-center gap-2 my-3'}>
                                {brand.items && brand.items.map(item =>
                                    <div key={item.id} className={'w-full h-[200px] flex flex-row justify-center items-center gap-4 border-b-[1px] border-(rgb(var(--border-color))) p-2'}>
                                    <div>
                                        <div className={'w-full flex flex-row justify-start items-center gap-2 p-2'}>
                                            <div className={'w-[30%] flex flex-col justify-center items-center'}>
                                                <img src={item.image_link} alt={'thumbnail'}/>
                                            </div>
                                            <p className={'w-[70%] text-lg'}>{item.product_variants.name}</p>
                                        </div>
                                        <div className={'w-full grid grid-cols-5 grid-rows-1 gap-2 p-2'}>
                                            <div className={'col-span-5 grid grid-cols-5 items-center'}>
                                                <div className={'col-span-2'}>
                                                    <p className={'col-span-2 text-lg'}>
                                                        Số lượng:<strong
                                                        className={'text-[rgb(var(--main-color))]'}> {item.amount}</strong>
                                                    </p>
                                                    <p className="col-span-3 text-lg">
                                                        Tổng: <strong className={'text-[rgb(var(--main-color))]'}>{
                                                        formatedNumber(
                                                            (amount.find(a => a.variant_id === item.variant_id)?.amount ?? item.amount)
                                                            * item.product_variants.price
                                                        )
                                                    }đ</strong>
                                                    </p>
                                                </div>

                                                <div
                                                    className={'col-span-3 flex flex-row justify-end items-center gap-4'}>
                                                    <div
                                                        className={'w-fit h-fit flex flex-row jus-center items-center gap-2'}>
                                                        <button type={'button'}
                                                                id={'minus-btn'}
                                                                className={'w-10 h-10 border-2 border-[rgb(var(--main-color))] rounded-lg font-bold text-lg'}
                                                                onClick={() => handleMinus(item.variant_id)}
                                                        >
                                                            -
                                                        </button>
                                                        <input type={'number'}
                                                               className={'w-10 h-10 text-center border-2 border-[rgb(var(--border-color))] rounded-lg'}
                                                               value={amount.find(a => a.variant_id === item.variant_id)?.amount ?? item.amount}
                                                               readOnly={true}/>
                                                        <button type={'button'}
                                                                id={'add-btn'}
                                                                className={'w-10 h-10 border-2 border-[rgb(var(--main-color))] rounded-lg font-bold text-lg'}
                                                                onClick={() => handleAdd(item.variant_id, item.amount)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <div className={'flex flex-col justify-center items-center'}>
                                                        <input type={'checkbox'} className={'w-5 h-5 text'}
                                                               checked={amount.find(a => a.variant_id === item.variant_id)?.checked ?? false}
                                                               onChange={() => handleAddOne(item)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>)}
                            </div>
                        </div>)
                    ) : (
                        <p>Bạn chưa chọn sản phẩm nào</p>
                    )}
                </div>
                <div
                    className={'w-full h-fit bottom-0 absolute border-t-2 border-[rgb(var(--main-color))] rounded-t-lg  bg-white flex flex-row justify-between items-center p-2 fixed z-10 bottom-0 right-0'}>
                    <div className={'w-fit h-full flex flex-row justify-center items-center gap-2'}>
                        <input type={'checkbox'} className={'w-7 h-7'}
                               onChange={(e) => handleAddAll(data, e.target.checked)}/>
                        <p className={'text-lg'}>Tất cả</p>
                    </div>
                    <div className={'w-fit h-full flex flex-row justify-center items-center gap-2'}>
                        <div className={'w-fit h-fit flex flex-col justify-center items-end gap-2'}>
                            <p className={'text-lg'}>Tổng cộng: <strong
                                className={'text-[rgb(var(--main-color))]'}>{formatedNumber(total)}đ</strong></p>
                            <p className={'text-sm'}>Phí vận chuyển: <strong
                                className={'text-[rgb(var(--main-color))]'}>{formatedNumber(total)}đ</strong></p>
                        </div>
                        <div className={'w-fit h-fit flex flex-col justify-center items-center gap-2'}>
                            <button type={'button'}
                                    className={'w-fit h-fit p-2 border-2 border-[rgb(var(--main-color))] rounded-lg text-lg bg-[rgb(var(--main-color))] text-white'}
                                    onClick={handleCreateOrder}
                            >Thanh toán
                            </button>
                            <button className={'w-fit h-fit text-sm text-[rgb(var(--main-color))]'}
                                    onClick={() => handleDelete()}>
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {openCreateOrder ?
                <UserCreateOrder listVariant={listVariants} setOpenCreate={setOpenCreateOrder}/> : null}
        </>
    )
}
export default UserCart