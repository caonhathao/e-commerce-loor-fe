import React, {SetStateAction, useEffect, useState} from "react";
import {fetchData, formatedDate, formatedNumber} from "../../../utils/functions.utils.tsx";
import endpoints from "../../../services/endpoints.tsx";
import {orderDetailType, receiptData} from "../../../utils/data-types.tsx";
import Loading from "../../../components/loading/Loading.tsx";
import {BsExclamationTriangleFill, BsXLg, BsXSquareFill} from "react-icons/bs";
import {toast} from "react-toastify";
import apiClient from "../../../services/apiClient.tsx";

interface Props {
    order_id: string,
    setOpen: React.Dispatch<SetStateAction<boolean>>
}

const UserOrderDetail: React.FC<Props> = ({order_id, setOpen}) => {
    const [data, setData] = useState<orderDetailType | null>(null)
    const [billData, setBillData] = useState<receiptData | null>(null)

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

    useEffect(() => {
        fetchData(endpoints.user.getOrderDetail(order_id), true, setData, 'Có lỗi xẩy ra')
        fetchData(endpoints.user.getReceiptByOrderId(order_id), true, setBillData, 'Có lỗi xảy ra');
    }, [order_id])

    useEffect(() => {
        console.log("✅ ORDER ID:", order_id);
        console.log("📦 Bill data:", billData);
    }, [billData, order_id]);


    if (data === null || billData === null) return <Loading/>

    return (
        <div className={'w-full h-full fixed top-0 left-0 z-50 bg-white flex flex-col justify-start iem-center'}>
            <div
                className={'w-full h-fit p-2 grid grid-cols-5 grid-rows-1 gap-3 items-center border-b-2 border-[rgb(var(--border-color))]'}>
                <div className={'col-span-3 col-start-2 text-center'}>
                    <strong className={'text-xl'}>Thông tin đơn hàng</strong>
                </div>
                <div className={'col-span-1 flex justify-center items-center'}>
                    <button type={'button'}
                            className={'bg-red-500 w-10 h-10 rounded-lg font-bold text-xl text-white flex justify-center items-center'}
                            onClick={() => setOpen(false)}>
                        <BsXLg size={20}/>
                    </button>
                </div>
            </div>
            <div className={'p-2 w-full h-full'}>
                <div className={'my-3'}>
                    <p>Ngày tạo: <strong>{formatedDate(data.createdAt)}</strong></p>
                    <p>Tình trạng: <strong>{data.status}</strong></p>
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
                            <td className={'border border-gray-500 p-1 text-center'}>{item.product_variants.name}</td>
                            <td className={'border border-gray-500 p-1 text-center'}>{item.amount}</td>
                            <td className={'border border-gray-500 p-1 text-center'}>{formatedNumber(item.product_variants.price)}</td>
                            <td className={'border border-gray-500 p-1 text-center'}>{formatedNumber(item.amount * item.product_variants.price)}</td>
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
                    <p>Hình thúc vận chuyển: <strong>{data.shipping_type}</strong></p>
                    <p>Địa chỉ giao hàng: <strong>{data.address}</strong></p>
                </div>
            </div>
            <div className={'p-2 w-full h-full'}>
                <table className={"border-collapse border border-gray-400"}>
                    <thead>
                    <tr>
                        <th className={'border border-gray-500 w-[10%]'}>Mã HD</th>
                        <th className={'border border-gray-500 w-[10%]'}>Mã DH</th>
                        <th className={'border border-gray-500 w-[20%]'}>PTTT</th>
                        <th className={'border border-gray-500 w-[20%]'}>Tình trạng</th>
                        <th className={'border border-gray-500 w-[40%]'}>Lí do (nếu có)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className={'border border-gray-500'}>{billData?.id}</td>
                        <td className={'border border-gray-500'}>{billData?.order_id}</td>
                        <td className={'border border-gray-500'}>{billData?.payment}</td>
                        <td className={'border border-gray-500'}>{billData?.payment_status}</td>
                        <td className={'border border-gray-500'}>{billData?.reason ?? 'Không có'}</td>
                    </tr>
                    </tbody>
                </table>
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
                    <button type={'button'} disabled={data.status === 'CANCELED'}
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