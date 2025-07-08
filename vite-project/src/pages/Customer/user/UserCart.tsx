import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import apiClient from "../../../services/apiClient.tsx";
import endpoints from "../../../services/endpoints.tsx";
import {formatedNumber} from "../../../utils/functions.utils.tsx";
import {animate, press} from "motion"
import errImg from '../../../assets/img/404.png'
import UserCreateOrder from "./UserCreateOrder.tsx";
import {cartType, listVariantsType} from "../../../utils/data-types.tsx";

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

    const handleAdd = (id: string, a: number) => {
        const newAmount = [...amount]
        const index = newAmount.findIndex(item => item.variant_id === id)
        if (index === -1) {
            newAmount.push({
                amount: a,
                variant_id: id,
                checked: false
            })
            setAmount(newAmount)
        } else {
            newAmount[index].amount = newAmount[index].amount + 1
            setAmount(newAmount)
        }
    }

    const handleMinus = (id: string) => {
        const newAmount = [...amount]
        const index = newAmount.findIndex(item => item.variant_id === id)
        if (newAmount[index].amount === 1) {
            toast.warning('Số lượng không thể bằng 0')
        } else {
            newAmount[index].amount = newAmount[index].amount - 1
            setAmount(newAmount)
        }
    }

    const updateListVariants = (
        brands: cartType[],
        amount: amountType[]
    ): listVariantsType => {
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

        return {
            method: "default",
            list: list as listVariantsType["list"]
        };
    };

    const handleAddAllOfOne = (brand: cartType) => {
        const isAllChecked = brand.items.every(item =>
            amount.find(a => a.variant_id === item.variant_id)?.checked
        );

        const updatedAmount = [...amount];

        brand.items.forEach(item => {
            const idx = updatedAmount.findIndex(a => a.variant_id === item.variant_id);

            if (isAllChecked) {
                if (idx !== -1) updatedAmount[idx].checked = false;
            } else {
                if (idx !== -1) {
                    updatedAmount[idx].checked = true;
                    updatedAmount[idx].amount = item.amount;
                } else {
                    updatedAmount.push({
                        variant_id: item.variant_id,
                        amount: item.amount,
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
            updatedAmount[index].amount = item.amount;
        } else {
            updatedAmount.push({
                variant_id: item.variant_id,
                amount: item.amount,
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
                const idx = updatedAmount.findIndex(a => a.variant_id === item.variant_id);

                if (isAllChecked) {
                    if (idx !== -1) updatedAmount[idx].checked = false;
                } else {
                    if (idx !== -1) {
                        updatedAmount[idx].checked = true;
                        updatedAmount[idx].amount = item.amount;
                    } else {
                        updatedAmount.push({
                            variant_id: item.variant_id,
                            amount: item.amount,
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
        if (!listVariants || listVariants.method !== 'default') {
            setTotal(0);
            return;
        }
        const totalCost = listVariants.list.reduce((sum, brand) => sum + brand.cost + brand.fee, 0);
        setTotal(totalCost);
    }, [listVariants]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get(endpoints.user.getCart)
                if (response && response.status === 200) {
                    setData(response.data)
                }
            } catch (err) {
                console.error(err)
                toast.error('Kết nối thất bại')
            }
        }
        fetchData()
    }, [])

    // useEffect(() => {
    //     console.log('data: ', data)
    //     console.log('type of data: ', typeof data)
    // }, [data])
    //
    // useEffect(() => {
    //     console.log('list variants: ', listVariants)
    // }, [listVariants]);

    return (
        <div className={'w-full h-full flex justify-center items-center flex-col'}>
            <div className={'w-full h-full flex flex-col justify-center items-center p-2 my-2'}>
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
                            {brand.items && brand.items.map(item => <div key={item.id}
                                                                         className={'w-full flex flex-row justify-center items-center gap-4 border-b-[1px] border-(rgb(var(--border-color))) p-2'}>
                                <div>
                                    <div className={'w-full flex flex-row justify-start items-center gap-2'}>
                                        <div className={'w-[20%] flex flex-col justify-center items-center'}>
                                            <img src={item.image_link} alt={'thumbnail'}/>
                                        </div>
                                        <p className={'w-[80%]'}>{item.product_variants.name}</p>
                                    </div>
                                    <div className={'w-full grid grid-cols-5 grid-rows-2 gap-2'}>
                                        <div className={'col-span-5 grid grid-cols-5 items-center'}>
                                            <p className={'col-span-2'}>Số lượng:
                                            </p>
                                            <div className={'col-span-3'}>
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
                                            </div>
                                        </div>
                                        <p className="col-span-3">
                                            Tổng: {
                                            formatedNumber(
                                                (amount.find(a => a.variant_id === item.variant_id)?.amount ?? item.amount)
                                                * item.product_variants.price
                                            )
                                        }đ
                                        </p>
                                    </div>
                                </div>
                                <div className={'flex flex-col justify-center items-center'}>
                                    <input type={'checkbox'} className={'w-5 h-5'}
                                           checked={amount.find(a => a.variant_id === item.variant_id)?.checked ?? false}
                                           onChange={() => handleAddOne(item)}
                                    />
                                </div>
                            </div>)}
                        </div>
                    </div>)
                ) : (
                    <p>Bạn chưa chọn sản phẩm nào</p>
                )}
            </div>
            <div
                className={'w-full h-fit bottom-0 absolute border-t-2 border-[rgb(var(--main-color))] rounded-t-lg  bg-white flex flex-row justify-between items-center p-2'}>
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
                    <button type={'button'}
                            className={'w-fit h-fit p-2 border-2 border-[rgb(var(--main-color))] rounded-lg text-lg bg-[rgb(var(--main-color))] text-white'}
                            onClick={handleCreateOrder}
                    >Thanh toán
                    </button>
                </div>
            </div>
            {openCreateOrder ?
                <UserCreateOrder listVariant={listVariants} setOpenCreate={setOpenCreateOrder}/> : null}
        </div>
    )
}
export default UserCart