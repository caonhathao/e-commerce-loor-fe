import React, {SetStateAction, useEffect, useState} from "react";
import {fetchData, formatedDate, formatedNumber} from "../../utils/functions.utils.tsx";
import endpoints from "../../services/endpoints.tsx";
import {orderDetailType, orderStatusType, receiptData} from "../../utils/user.data-types.tsx";
import Loading from "../loading/Loading.tsx";
import {BsExclamationTriangleFill, BsXLg, BsXSquareFill} from "react-icons/bs";
import {toast} from "react-toastify";
import apiClient from "../../services/apiClient.tsx";
import {Formik, useField} from "formik";
import * as Bs from "react-icons/bs";

interface Props {
    order_id: string,
    setOpen: React.Dispatch<SetStateAction<boolean>>
}

interface img {
    file: File,
    url: string,
}

const UserOrderDetail: React.FC<Props> = ({order_id, setOpen}) => {
    const [data, setData] = useState<orderDetailType | null>(null)
    const [billData, setBillData] = useState<receiptData | null>(null)
    const [orderStatus, setOrderStatus] = useState<orderStatusType[]>([])

    const [images, setImages] = useState<img[]>([]);

    const [showInfo, setShowInfo] = useState<boolean[]>([false, false, false])

    const handleShowInfo = (index: number) => {
        setShowInfo((prevState) => {
            const copy = [...prevState]
            copy[index] = !copy[index]
            return copy
        })
    }

    const handleOrderStatusMean = (_status: keyof typeof orderStatus) => {
        if (_status === 'PENDING') {
            return <strong className={'text-yellow-500'}>
                {orderStatus[_status]}
            </strong>
        }
        if (_status === 'CONFIRMED') {
            return <strong className={'text-green-400'}>
                {orderStatus[_status]}
            </strong>
        }
        if (_status === 'PREPARING') {
            return <strong className={'text-green-700'}>
                {orderStatus[_status]}
            </strong>
        }
        if (_status === 'DELIVERING') {
            return <strong className={'text-blue-800'}>
                {orderStatus[_status]}
            </strong>
        }
        if (_status === 'CANCELED') {
            return <strong className={'text-amber-900'}>
                {orderStatus[_status]}
            </strong>
        }
    };

    const handleCancelOrder = async () => {
        try {
            const response = await apiClient.put(endpoints.user.cancelOrder(order_id))
            if (response.status !== 200) toast.error('Lỗi')
            else toast.success('Hủy thành công')
        } catch (e) {
            console.error(e)
            toast.error('Hủy đơn thất bại')
        }
    }

    const handleRemoveImage = (obj: img) => {
        setImages((prev) => prev.filter(item => item["file"] !== obj.file));
    }

    const StarRating = ({name}: { name: string }) => {
        const [field, , helpers] = useField(name);
        const value = field.value;

        return (
            <div style={{display: 'flex', gap: '8px'}}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        onClick={() => helpers.setValue(star)}
                        style={{
                            cursor: 'pointer',
                            fontSize: '24px',
                            color: star <= value ? '#ffc107' : '#e4e5e9',
                        }}
                    >
          ★
        </span>
                ))}
            </div>
        );
    };

    useEffect(() => {
        fetchData(endpoints.user.getOrderDetail(order_id), false, setData, 'Có lỗi xẩy ra')
        fetchData(endpoints.user.getReceiptByOrderId(order_id), false, setBillData, 'Có lỗi xảy ra');
        fetchData(endpoints.user.getAllOrderStatus, false, setOrderStatus, "Có lỗi xảy ra!")
    }, [order_id])

    // useEffect(() => {
    //     console.log((orderStatus))
    // }, [orderStatus]);

    if (data === null || billData === null) return <Loading/>

    return (
        <div className={'w-full h-full absolute top-0 left-0 z-[110] bg-white flex flex-col justify-start items-start'}>
            <div
                className={'w-full h-fit p-2 grid grid-cols-5 grid-rows-1 gap-3 items-center border-b-2 border-[rgb(var(--border-color))]'}>
                <div className={'col-span-3 col-start-2 text-center'}>
                    <strong className={'text-xl text-[rgb(var(--main-color))]'}>CHI TIẾT ĐƠN HÀNG</strong>
                </div>
                <div className={'col-span-1 flex justify-center items-center'}>
                    <button type={'button'}
                            className={'bg-red-500 w-10 h-10 rounded-lg font-bold text-xl text-white flex justify-center items-center'}
                            onClick={() => setOpen(false)}>
                        <BsXLg size={20}/>
                    </button>
                </div>
            </div>

            <div className={'p-2 my-2 w-full h-fit'}>
                <button
                    className={`border-2 border-[rgb(var(--main-color))] p-2 rounded-lg ${showInfo[0] ? `bg-[rgb(var(--btn-primary-bg))] text-white` : `bg-white`}`}
                    onClick={() => handleShowInfo(0)}>
                    Thông tin đơn hàng
                </button>
                <div className={`w-full h-fit ${showInfo[0] ? 'block' : 'hidden'}`}>
                    <div className={'my-3'}>
                        <p>Ngày tạo: <strong
                            className={' text-[rgb(var(--main-color))]'}>{formatedDate(data.createdAt)}</strong></p>
                        <p>Tình trạng: {handleOrderStatusMean(data.status as keyof typeof orderStatus)}</p>
                    </div>
                    <table className={"border-collapse border border-gray-400"}>
                        <thead>
                        <tr>
                            <th className={'border border-gray-500 w-[10%]'}>STT</th>
                            <th className={'border border-gray-500 w-[45%]'}>Tên sản phẩm</th>
                            <th className={'border border-gray-500 w-[10%]'}>SL</th>
                            <th className={'border border-gray-500'}>Giá</th>
                            <th className={'border border-gray-500'}>Tổng</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.OrderDetail && data.OrderDetail.map((item, index) => {
                            return <tr key={index}>
                                <td className={'border border-gray-500 p-1 text-center'}>{index + 1}</td>
                                <td className={'border border-gray-500 p-1 text-center'}>{item.ProductVariants.name}</td>
                                <td className={'border border-gray-500 p-1 text-center'}>{item.amount}</td>
                                <td className={'border border-gray-500 p-1 text-center'}>{formatedNumber(item.ProductVariants.price)}</td>
                                <td className={'border border-gray-500 p-1 text-center'}>{formatedNumber(item.amount * item.ProductVariants.price)}</td>
                            </tr>
                        })}
                        <tr>
                            <td></td>
                            <td colSpan={2} className={'border border-gray-500 p-1'}>Tổng cộng:</td>
                            <td colSpan={3} className={'border border-gray-500 p-1'}>{formatedNumber(data.cost)}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td colSpan={2} className={'border border-gray-500 p-1'}>Phí vận chuyển:</td>
                            <td colSpan={3} className={'border border-gray-500 p-1'}>{data.fee}</td>
                        </tr>
                        </tbody>
                    </table>
                    <p><small className={'italic'}>(*Đơn vị tiền tệ: VND*)</small></p>
                    <div className={'my-3'}>
                        <p>Hình thúc vận chuyển: <strong
                            className={' text-[rgb(var(--main-color))]'}>{data.shipping_type}</strong></p>
                        <p>Địa chỉ giao hàng: <strong>{data.address}</strong></p>
                    </div>
                </div>
            </div>

            <div className={'p-2 my-2 w-full h-fit flex flex-col justify-start items-start'}>
                <button
                    className={`border-2 border-[rgb(var(--main-color))] p-2 rounded-lg ${showInfo[1] ? `bg-[rgb(var(--btn-primary-bg))] text-white` : 'bg-white '}`}
                    onClick={() => handleShowInfo(1)}>
                    Thông tin hóa đơn
                </button>
                <div className={`w-full h-fit ${showInfo[1] ? 'block' : 'hidden'}`}>
                    <p className={'my-1'}>Mã hóa đơn: <strong
                        className={' text-[rgb(var(--main-color))]'}>{billData?.id}</strong></p>
                    <p className={'my-1'}>Mã đơn hàng: <strong
                        className={' text-[rgb(var(--main-color))]'}>{billData?.order_id}</strong></p>
                    <table className={"border-collapse border border-gray-400"}>
                        <thead>
                        <tr>
                            <th className={'border border-gray-500 w-[20%]'}>PTTT</th>
                            <th className={'border border-gray-500 w-[20%]'}>Tình trạng</th>
                            <th className={'border border-gray-500 w-[40%]'}>Lí do (nếu có)</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className={'border border-gray-500 p-2 text-center'}>{billData?.payment}</td>
                            <td className={'border border-gray-500 p-2 text-center'}>{billData?.payment_status}</td>
                            <td className={'border border-gray-500 p-2 text-center'}>{billData?.reason ?? 'Không có'}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div
                className={`p-2 my-2 w-full h-fit ${data.status === 'COMPLETE' ? 'flex' : 'hidden'} flex-col justify-start items-start`}>
                <button
                    className={`border-2 border-[rgb(var(--main-color))] p-2 rounded-lg ${showInfo[2] ? `bg-[rgb(var(--btn-primary-bg))] text-white` : 'bg-white '}}`}
                    onClick={() => handleShowInfo(2)}>
                    Đánh giá sản phẩm
                </button>
                <div className={`w-full h-fit ${showInfo[2] ? 'block' : 'hidden'}`}>
                    {data.OrderDetail.map((item, index) => {
                        return <div key={index} className={'my-2'}>
                            <p>{index + 1}. {item.ProductVariants.name}</p>
                            <Formik
                                initialValues={{
                                    content: '',
                                    rating: 0,
                                    images: []
                                }}
                                onSubmit={async (values) => {

                                }}
                            >
                                {({
                                      handleChange,
                                      handleSubmit,
                                      setFieldValue,
                                      values
                                  }) => {
                                    return (
                                        <form onSubmit={handleSubmit}>
                                            <fieldset
                                                className={'w-full h-fit border-2 border-[rgb(var(--border-color))] rounded-lg'}>
                                                <legend>Mô tả</legend>
                                                <textarea
                                                    className={'w-full h-fit p-2 outline-none'}
                                                    name={'content'}
                                                    onChange={(e) => handleChange(e)}
                                                ></textarea>
                                            </fieldset>
                                            <fieldset>
                                                <StarRating name="rating"/>
                                            </fieldset>
                                            <fieldset
                                                className={'w-full border border-gray-700 rounded-lg flex flex-row items-center justify-between'}>
                                                <legend>Hình ảnh</legend>
                                                <div className={'flex flex-row  flex-wrap items-center justify-start'}>
                                                    {images && images.map((item, i) => (
                                                        <div
                                                            className={'w-15 h-15 relative mx-1 border-indigo-500 border-2 rounded-lg flex item-center justify-center'}
                                                            key={i}>
                                                            {/*delete button here (remove image*/}
                                                            <button className={'absolute -top-2 -right-2'}
                                                                    type={'button'}
                                                                    onClick={() => handleRemoveImage(item)}>
                                                                <Bs.BsXCircleFill color={'red'}/>
                                                            </button>
                                                            <img className={'object-contain'} src={item.url}
                                                                 alt={'image'}/>
                                                        </div>
                                                    ))}
                                                    <input type={'file'} hidden={true} accept={'image/*'}
                                                           id={'imageInput'} multiple={true}
                                                           onChange={(e) => {
                                                               const fileList = e.target.files;
                                                               if (!fileList) return;

                                                               const files = Array.from(fileList);
                                                               const images = files.map((item) => ({
                                                                   file: item,
                                                                   url: URL.createObjectURL(item as File),
                                                               }));
                                                               setImages((prevImages) => [...prevImages, ...images]);
                                                               setFieldValue('images', [...values.images, ...images]);
                                                           }}/>
                                                    <button type={'button'}
                                                            className={'w-15 h-15 m-1 rounded-lg flex justify-center items-center focus:outline-indigo-400 focus:outline-2 '}
                                                            onClick={() => {
                                                                const input = document.getElementById("imageInput") as HTMLInputElement;
                                                                if (input) {
                                                                    input.click();
                                                                }
                                                            }}>
                                                        <Bs.BsPlusSquare className={'w-20 h-20'} color={'gray'}/>
                                                    </button>
                                                </div>
                                            </fieldset>
                                        </form>
                                    )
                                }}
                            </Formik>
                        </div>
                    })}
                </div>
            </div>

            <div className={'w-full grid grid-cols-2 grid-rows-1 gap-4 mb-10'}>
                <div className={'col-span-1 flex justify-center items-center'}>
                    <button type={'button'}
                            className={'w-fit h-fit p-2 flex flex-row justify-center items-center gap-2 border-2 border-[rgb(var(--border-color))] rounded-lg text-red-400'}>
                        <BsExclamationTriangleFill size={20}/>
                        <p>Tố cáo</p>
                    </button>
                </div>
                <div className={'col-span-1 flex justify-center items-center'}>
                    <button type={'button'} disabled={data.status === 'CANCELED' || data.status === 'COMPLETED'}
                            className={'w-fit h-fit p-2 flex flex-row justify-center items-center gap-2 border-2 border-[rgb(var(--border-color))] rounded-lg text-amber-400'}
                            onClick={() => handleCancelOrder()}>
                        <BsXSquareFill size={20}/>
                        <p>Hủy đơn</p>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default UserOrderDetail