import {useEffect, useState} from "react";
import apiClient from "../../services/apiClient.tsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import endpoints from "../../services/endpoints.tsx";
import {toast, ToastContainer} from "react-toastify";
import {
    BsCart, BsEraser, BsFacebook,
    BsHeart, BsPinterest, BsPlusCircle,
    BsStarFill,
    BsStarHalf, BsTwitterX,
    BsWhatsapp
} from "react-icons/bs";
import {fetchData, fetchDataWithQuery, formatedNumber} from "../../utils/functions.utils.tsx";
import AmountInput from "../../components/modules/AmountInput.tsx";
import SlideShowImg from "../../components/modules/SlideShowImg.tsx";
import {getAccessToken} from "../../services/tokenStore.tsx";
import {
    listVariantsType,
    productDetailDataType,
    productVariantType,
    reviewDataType
} from "../../utils/user.data-types.tsx";
import UserCreateOrder from "../Customer/user/UserCreateOrder.tsx";

const ProductDetail = () => {
    const [data, setData] = useState<productDetailDataType>()
    const [openAttributes, setOpenAttributes] = useState<productVariantType>()
    const [listVariants, setListVariants] = useState<productVariantType[]>([])
    const [reviewData, setReviewData] = useState<reviewDataType>()
    const [total, setTotal] = useState<number>(0)
    const [openCreate, setOpenCreate] = useState<boolean>(false)
    const [list, setList] = useState<listVariantsType | null>(null)

    const [amount, setAmount] = useState<number[]>([])

    const params = useParams()
    const navigate = useNavigate()

    const handleOpenAttributes = (variant: productVariantType) => {
        setOpenAttributes(variant)
    }

    const handleAddVariants = (variant: productVariantType) => {
        const exist = listVariants.find(item => item.id === variant.id)
        if (!exist) {
            setListVariants(prevState => [...prevState, variant])
            setAmount(prevState => [...prevState, 1])
        }
    }

    const handleAddToCart = async (variants: productVariantType[]) => {
        try {
            if (variants.length === 0) {
                toast.warning('Bạn chưa chọn sản phẩm!')
                return;
            }
            if (getAccessToken() === '' || getAccessToken() === undefined) {
                toast.warning('Bạn cần đăng nhập!')
                return;
            }

            const payload = {
                list: []
            };
            for (let i = 0; i < variants.length; i++) {
                const temp = {
                    id: variants[i].id,
                    amount: amount[i],
                    image_link: data?.ImageProducts[0].image_link,
                }
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                payload.list.push(temp)
            }

            const response = await apiClient.post(endpoints.user.addToCart, payload);
            if (response && response.status === 200) {
                toast.success('Thêm vào giỏ hàng thành công')
            } else toast.warning('Thêm sản phẩm thất bại!')

        } catch (e) {
            console.error(e)
            toast.error('Thêm sản phẩm thất bại!')
        }
    }

    const handleBuyItemNow = () => {
        if (listVariants.length === 0) {
            toast.warn('Bạn chưa chọn sản phẩm nào!')
            return;
        }
        const listData = []

        for (const item of listVariants) {
            listData.push({
                variant_id: item.id,
                variant_name: item.name,
                image_link: data?.ProductVariants.find(variant => variant.id === item.id)?.image_link,
                amount: amount[listVariants.indexOf(item)],
                cost: amount[listVariants.indexOf(item)] * Number(item.price),
            })
        }

        const payload = [{
            brand_id: data?.brand_id,
            brand_name: data?.Brands.name,
            list: listData,
            cost: total,
            fee: 0
        }]

        console.log(payload)

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setList({list: payload});
        setOpenCreate(true)
    }

    const handleRemoveVariants = (variant: productVariantType, i: number) => {
        const exist = listVariants.find(item => item.id === variant.id)
        if (exist) {
            setListVariants(prevState => prevState.filter(item => item.id !== variant.id))
            setAmount((prevState) => {
                const newAmount = [...prevState]
                newAmount[i] = 1
                return newAmount
            })
        }
    }

    useEffect(() => {
        if (params.id !== undefined) {
            fetchData(endpoints.public.getProductByIdFromUser(params.id), false, setData, 'Sản phẩm không tồn tại hoặc có lỗi xảy ra!')
            fetchDataWithQuery(endpoints.public.getAllReviews, setReviewData, {id: params.id})
        } else {
            navigate('/')
        }
    }, []);

    useEffect(() => {
        let total = 0
        listVariants.forEach(item => {
            total += Number(item.price) * amount[listVariants.indexOf(item)]
        })
        setTotal(total)
    }, [amount, listVariants]);

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <>
            <div className={'w-full h-full flex flex-col justify-start items-center mt-5 p-2 relative'}>
                <div className={'w-full h-full flex flex-col justify-start items-center mt-5 p-2'}>
                    {/*images zone*/}
                    <SlideShowImg data={data?.ImageProducts}/>
                    {/*title: product's name zone*/}
                    <div className={'w-[90%] h-fit flex flex-col justify-start items-center my-2'}>
                        <p><strong className={'text-lg'}>{data?.name}</strong></p>
                    </div>
                    {/*share zone and pin zone*/}
                    <div className={'w-[90%] h-fit flex flex-row justify-between items-start my-2'}>
                        <div className={'w-fit h-fit flex flex-col justify-between items-start gap-2'}>
                            <p>Chia sẻ:</p>
                            <ul className={'w-fit h-fit flex justify-start items-center gap-2'}>
                                <li><BsFacebook color={'blue'} size={20}/></li>
                                <li><BsWhatsapp color={'green'} size={20}/></li>
                                <li><BsPinterest color={'red'} size={20}/></li>
                                <li><BsTwitterX color={'rgb(var(--accent-color)'} size={20}/></li>
                            </ul>
                        </div>
                        <div className={'w-fit h-fit flex flex-col justify-between items-end gap-2'}>
                            <div className={'w-fit h-fit flex flex-row justify-between items-center gap-2'}>
                                <button className={'w-fit h-fit '}>
                                    <BsHeart size={20} color={'rgb(var(--text-error))'}/>
                                </button>
                                <p className={'text-[rgb(var(--text-error))]'}>Thích</p>
                            </div>
                            <p className={'text-[rgb(var(--text-error))]'}>({data?.FeaturedProduct.product_wishlist} lượt
                                thích)</p>
                        </div>
                    </div>
                    {/*rating on the left and review on the right*/}
                    <div className={'w-[90%] h-fit flex flex-row justify-between items-end my-2'}>
                        <div className={'w-fit h-fit flex flex-row justify-between items-center gap-2'}>
                            <p className={'text-lg'}>
                                <Link to={'*'} className={'underline'}>4.5</Link></p>
                            <ul className={'w-fit h-fit flex justify-start items-center gap-2'}>
                                <li><BsStarFill color={'rgb(var(--main-color))'} size={20}/></li>
                                <li><BsStarFill color={'rgb(var(--main-color))'} size={20}/></li>
                                <li><BsStarFill color={'rgb(var(--main-color))'} size={20}/></li>
                                <li><BsStarFill color={'rgb(var(--main-color))'} size={20}/></li>
                                <li><BsStarHalf color={'rgb(var(--main-color))'} size={20}/></li>
                            </ul>
                        </div>
                        <div className={'w-fit h-fit flex flex-row justify-center items-end gap-2'}>
                            <div><Link to={'*'} className={'underline'}>301</Link> đánh giá</div>
                            <div><Link to={'*'} className={'underline'}>Tố cáo</Link></div>
                        </div>
                    </div>

                    {/*Show shop's name*/}
                    <div className={'w-[90%] h-fit flex flex-col justify-center items-start my-5 gap-3'}>
                        <p className={'font-bold text-[rgb(var(--main-color))] border-b-2 border-[rgb(var(--border-color))]'}>Sản
                            phẩm này được bán bởi:</p>
                        <div className={'w-full h-fit flex flex-row justify-start items-center gap-2'}>
                            <div className={'w-fit border-2 border-[rgb(var(--main-color))] p-1 rounded-full'}>
                                <img src={data?.Brands.image_link} alt={'brand'} className={'p-1 w-30 rounded-full'}/>
                            </div>
                            <div className={'w-full border-t-2 border-b-2 border-[rgb(var(--main-color))] rounded-lg'}>
                                <p className={'whitespace-nowrap p-1'}>{data?.Brands.name}</p>
                            </div>
                            <div className={'w-full h-[1px] bg-[rgb(var(--main-color))]'}></div>
                        </div>
                    </div>

                    {/*variants zone*/}
                    <div className={'w-[90%] h-fit flex flex-col justify-start items-start my-5'}>
                        <p className={'text-lg font-bold border-b-[1px] border-(rgb(var(--border-color))] w-full my-2'}>
                            Các phiên bản
                        </p>

                        <div className={'w-full max-h-50 overflow-y-auto'}>
                            <div
                                className={'w-full border-b-2 border-[rgb(var(--border-color))] bg-[rgb(var(--main-color))] rounded-tl-lg rounded-tr-lg grid grid-cols-6'}>
                                <div className={'col-span-4 text-left p-1 text-white font-bold'}>Tên</div>
                                <div className={'col-1 text-left p-1 text-white font-bold'}>Giá</div>
                                <div className={'col-1 text-left p-1'}></div>
                            </div>

                            {data?.ProductVariants && data?.ProductVariants.map((item) => (
                                <div key={item.id}
                                     className={'w-full border-b-2 border-[rgb(var(--border-color))] bg-[rgb(var(--main-color)/0.2)] grid grid-cols-6'}
                                >
                                    <div className={'p-1 col-span-4 text-left h-full'} onClick={() => {
                                        handleOpenAttributes(item)
                                    }}>
                                        <p>{item.name}</p>
                                        <p className={'text-sm italic text-gray-400'}>Mã sku: {item.sku}</p>
                                    </div>
                                    <div
                                        className={'p-1 col-1 flex justify-center items-center'}>{formatedNumber(Number(item.price))}đ
                                    </div>
                                    <div className={'p-1 col-1 flex justify-center items-center'}
                                         onClick={() => {
                                             handleAddVariants(item)
                                         }}
                                    >
                                        <BsPlusCircle size={20}/>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>

                    {/*price and amount or promotion*/}
                    <div className={'w-[90%] h-fit flex flex-col justify-between items-center my-2'}>
                        <div
                            className={'bg-[rgb(var(--main-color))] w-full h-fit p-2 text-white text-lg font-bold text-center rounded-tl-lg rounded-tr-lg'}>
                            GIÁ TRỊ ĐƠN HÀNG
                        </div>
                        {listVariants.map((item, i) => (
                            <div
                                className={'w-full h-fit flex flex-row justify-between items-center gap-2 p-2 bg-[rgb(var(--main-color)/0.2)]'}>
                                <div className={'flex flex-col justify-center items-start'}>
                                    <small className={'text-gray-400 italic text-sm'}>sku: {item.sku}</small>
                                    <strong className={'text-2xl text-[rgb(var(--text-color))]'}>
                                        {formatedNumber(Number(item.price) * amount[i])}đ
                                    </strong>
                                </div>
                                <div className={'flex flex-row justify-center items-center gap-2'}>
                                    <div>
                                        {<AmountInput amount={amount} setAmount={setAmount} index={i}/>}
                                    </div>
                                    <div
                                        className={'w-10 h-10 rounded-lg border-2 border-[rgb(var(--main-color))] flex justify-center items-center'}
                                        onClick={() => handleRemoveVariants(item, i)}>
                                        <BsEraser size={20}/>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div
                            className={'w-full p-1 bg-[rgb(var(--main-color)/0.2)] flex justify-between items-center rounded-bl-lg rounded-br-lg'}>
                            <p className={'text-lg'}>TỔNG: <strong>{formatedNumber(total)}đ</strong></p>
                        </div>
                    </div>

                    {/*buy button now and add to the cart button*/}
                    <div className={'w-[90%] h-fit flex flex-row justify-between items-center my-2'}>
                        <button type={'button'}
                                className={'w-fit h-fit text-(rgb(var(--text-color))] text-lg rounded-lg p-2 flex flex-row jus-center items-center gap-2 border-2 border-[rgb(var(--main-color))]'}
                                onClick={() => {
                                    handleAddToCart(listVariants)
                                }}>
                            <BsCart size={20}/>
                            Vào giỏ
                        </button>
                        <button type={'button'}
                                className={'w-fit h-fit bg-[rgb(var(--main-color))] text-white text-lg rounded-lg p-2'}
                                onClick={() => {
                                    handleBuyItemNow()
                                }}
                        >
                            Mua ngay
                        </button>
                    </div>

                    {/*descripcion zone*/}
                    <div className={'w-[90%] h-fit flex flex-col justify-start items-start my-5'}>
                        <p className={'text-lg font-bold border-b-[1px] border-(rgb(var(--border-color))] w-full my-2'}>
                            Mô tả sản phẩm
                        </p>
                        <p className={'my-2'}>{data?.description}</p>
                    </div>

                    {/*review here*/}
                    <div className={'w-[90%] h-fit flex flex-col justify-start items-start my-5'}>
                        <p className={'text-lg font-bold border-b-[1px] border-(rgb(var(--border-color))] w-full my-2'}>
                            Đánh giá sản phẩm
                        </p>
                        {reviewData?.total_items === 0 ? 'Chưa có đánh giá' : ''}
                    </div>
                </div>

                {openAttributes !== undefined ? (
                    <div
                        className={'absolute bg-white shadow-lg shadow-gray-500 bottom-10 w-[60%] min-h-40 max-h-50 rounded-lg overflow-y-auto'}>
                        <div className={'grid grid-cols-8'}>
                            <p className={'w-full bg-[rgb(var(--main-color))] text-white col-span-7 rounded-tl-lg p-1'}>
                                Chi tiết</p>
                            <div
                                className={'bg-red-600 rounded-tr-lg w-full h-full flex justify-center items-center text-white top-0 right-0 col-1'}
                                onClick={() => {
                                    setOpenAttributes(undefined)
                                }}>x
                            </div>
                        </div>
                        <p className={'text-center text-sm italic text-gray-400'}>SKU: {openAttributes.sku}</p>
                        {openAttributes.ProductAttributes.length !== 0 ? openAttributes.ProductAttributes.map((item) => (
                            <div className={'p-2'}>{item.name_att}: {item.value_att}</div>
                        )) : <div className={'text-center text-red-400 italic'}>Sản phẩm không có thêm thuộc
                            tính</div>}
                    </div>
                ) : null}

                {openCreate && list ? (
                    <UserCreateOrder setOpenCreate={setOpenCreate} listVariant={list}/>
                ) : null}
            </div>
            <ToastContainer/>
        </>
    )
}

export default ProductDetail