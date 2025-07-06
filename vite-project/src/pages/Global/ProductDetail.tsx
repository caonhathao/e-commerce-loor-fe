import {useEffect, useState} from "react";
import apiClient from "../../services/apiClient.tsx";
import {Link, useParams} from "react-router-dom";
import endpoints from "../../services/endpoints.tsx";
import {toast} from "react-toastify";
import {
    BsCart, BsEraser, BsFacebook,
    BsHeart, BsPinterest, BsPlusCircle,
    BsStarFill,
    BsStarHalf, BsTwitterX,
    BsWhatsapp
} from "react-icons/bs";
import {formatedNumber} from "../../utils/functions.utils.tsx";
import AmountInput from "../../components/modules/AmountInput.tsx";
import SlideShowImg from "../../components/modules/SlideShowImg.tsx";

interface productVariantType {
    id: string,
    name: string,
    price: string,
    product_attributes: {
        name_att: string,
        value_att: string,
    }[],
    sku: string,
}

interface dataType {
    id: string,
    brand_id: string,
    category_id: string,
    subcategory_id: string,
    name: string,
    image_products: {
        image_link: string,
    }[],
    average_price: string,
    status: string,
    origin: string,
    promotion: number,
    stock: number,
    description: string,
    product_variants: productVariantType[]
}

const ProductDetail = () => {
    const [data, setData] = useState<dataType>()
    const [openAttributes, setOpenAttributes] = useState<productVariantType>()
    const [listVariants, setListVariants] = useState<productVariantType[]>([])
    const [total, setTotal] = useState<number>(0)

    const [amount, setAmount] = useState<number[]>([])

    const params = useParams()

    const handleOpenAttributes = (variant: productVariantType) => {
        setOpenAttributes(variant)
    }

    const handleAddVariants = (variant: productVariantType) => {
        const exist = listVariants.find(item => item.id === variant.id)
        if (!exist) {
            setListVariants(prevState => [...prevState, variant])
        }
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

    const fetchData = async () => {
        try {
            if (params.id !== undefined) {
                const response = await apiClient.get(endpoints.public.getProductByIdFromUser(params.id))
                if (response.status === 200) {
                    setData(response.data)
                    setAmount(new Array(response.data.product_variants.length).fill(1))
                }
            }
        } catch (err) {
            console.log(err)
            toast.error('Sản phẩm không tồn tại hoặc có lỗi xảy ra!')
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    useEffect(() => {
        let total = 0
        listVariants.forEach(item => {
            total += Number(item.price) * amount[listVariants.indexOf(item)]
        })
        setTotal(total)
    }, [amount, listVariants]);

    useEffect(()=>{
        console.log(data)
    },[data])

    return (
        <div className={'w-full h-full flex flex-col justify-start items-center mt-5 p-2'}>
            {/*images zone*/}
            <SlideShowImg data={data?.image_products}/>
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
                    <p className={'text-[rgb(var(--text-error))]'}>(1.1k lượt thích)</p>
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

            {/*variants zone*/}
            <div className={'w-[90%] h-fit flex flex-col justify-start items-start my-5'}>
                <p className={'text-lg font-bold border-b-[1px] border-(rgb(var(--border-color))] w-full my-2'}>
                    Các phiên bản
                </p>

                <div
                    className={'w-full border-b-2 border-[rgb(var(--border-color))] bg-[rgb(var(--main-color))] rounded-tl-lg rounded-tr-lg grid grid-cols-6'}>
                    <div className={'col-span-4 text-left p-1'}>Tên</div>
                    <div className={'col-1 text-left p-1'}>Giá</div>
                    <div className={'col-1 text-left p-1'}></div>
                </div>

                {data?.product_variants && data?.product_variants.map((item) => (
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

            {/*price and amount or promotion*/}
            <div className={'w-[90%] h-fit flex flex-col justify-between items-center my-2'}>
                <div
                    className={'bg-[rgb(var(--main-color))] w-full h-fit p-2 text-[rgb(var(--text-color)] text-lg text-center rounded-tl-lg rounded-tr-lg'}>
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
                    className={'w-full p-1 bg-[rgb(var(--main-color))] flex justify-between items-center rounded-bl-lg rounded-br-lg'}>
                    <p className={'text-lg'}>TỔNG: <strong>{formatedNumber(total)}đ</strong></p>
                </div>
            </div>

            {/*buy button now and add to cart button*/}
            <div className={'w-[90%] h-fit flex flex-row justify-between items-center my-2'}>
                <button type={'button'}
                        className={'w-fit h-fit text-(rgb(var(--text-color))] text-lg rounded-lg p-2 flex flex-row jus-center items-center gap-2 border-2 border-[rgb(var(--main-color))]'}>
                    <BsCart size={20}/>
                    Vào giỏ
                </button>
                <button type={'button'}
                        className={'w-fit h-fit bg-[rgb(var(--main-color))] text-(rgb(var(--text-color))] text-lg rounded-lg p-2'}
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
            </div>
            {
                openAttributes !== undefined ? (
                    <div
                        className={'absolute bg-white shadow-lg shadow-gray-500 bottom-10 w-[50%] min-h-40 rounded-lg'}>
                        <div className={'grid grid-cols-8'}>
                            <p className={'w-full bg-[rgb(var(--main-color))] col-span-7 rounded-tl-lg p-1'}>Thuộc
                                tính
                                phiên bản</p>
                            <div
                                className={'bg-red-600 rounded-tr-lg w-full h-full flex justify-center items-center text-white top-0 right-0 col-1'}
                                onClick={() => {
                                    setOpenAttributes(undefined)
                                }}>x
                            </div>
                        </div>
                        <p className={'text-center text-sm italic text-gray-400'}>SKU: {openAttributes.sku}</p>
                        {openAttributes.product_attributes.length !== 0 ? openAttributes.product_attributes.map((item) => (
                            <div className={'p-2'}>{item.name_att}: {item.value_att}</div>
                        )) : <div className={'text-center text-red-400 italic'}>Sản phẩm không có thêm thuộc
                            tính</div>}
                    </div>
                ) : null
            }
        </div>
    )
}

export default ProductDetail