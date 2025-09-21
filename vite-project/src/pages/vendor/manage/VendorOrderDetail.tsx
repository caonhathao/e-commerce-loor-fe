import {BsBoxArrowInLeft, BsChatDotsFill, BsQuestionCircleFill} from "react-icons/bs";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import apiClient from "../../../services/apiClient.tsx";
import endpoints from "../../../services/endpoints.tsx";
import {formatedNumber} from "../../../utils/functions.utils.tsx";
import {orderStatusOptions} from "../../../utils/attributes.tsx";
import {orderDetailType} from "../../../utils/user.data-types.tsx";

const VendorOrderDetail = () => {
    const [data, setData] = useState<orderDetailType>();
    const [status, setStatus] = useState<string>('');
    const [reload, setReload] = useState<boolean>(false);
    const navigate = useNavigate();
    const param = useParams();

    const handleRenderSelect = (value: string | undefined) => {
        if (value === undefined) return <select defaultValue={'PENDING'}></select>

        let counter = 0;
        const arr = new Array(9).fill(false);

        for (const item in orderStatusOptions) {
            if (item === value) {
                break;
            } else if (item !== value) {
                arr[counter] = true;
            }
            counter++;
        }
        return (
            <select onChange={(e) => setStatus(e.target.value)}
                    defaultValue={value}>
                <option value={'PENDING'} disabled={arr[0]}>Đang chờ</option>
                <option value={'CONFIRMED'} disabled={arr[1]}>Đã xác nhận</option>
                <option value={'PACKING'} disabled={arr[2]}>Đang chuẩn bị</option>
                <option value={'DELIVERING'} disabled={arr[3]}>Đang vận chuyển</option>
                <option value={'CANCELED'} disabled={arr[4]}>Hủy bỏ</option>
                <option value={'ABORTED'} disabled={arr[5]}>Từ chối</option>
                <option value={'POSTPONED'} disabled={arr[6]}>Hoãn lại</option>
                <option value={'REFUNDED'} disabled={arr[7]}>Hoàn trả</option>
                <option value={'COMPLETED'} disabled={arr[8]}>Hoàn thành</option>
            </select>
        )
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try {
            if (data !== null || data !== undefined) {
                const payload = {id: param.id, status};
                const response = await apiClient.put(endpoints.brand.updateOrder, payload);
                if (response.status === 200) {
                    toast.success('Cập nhật trạng thái thành công', {autoClose: 1500})
                    setTimeout(() => {
                        setReload(!reload)
                    }, 1600)
                } else toast.error('Cập nhật trạng thái thất bại')
            } else toast.error('Cập nhật trang thái thất bại')
        } catch (e) {
            console.error(e)
            toast.error('Không thể cập nhật trạng thái')
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (param.id !== undefined) {
                    const response = await apiClient.get(endpoints.user.getOrderDetail(param.id))
                    if (response && response.status === 200) {
                        setData(response.data)
                    } else
                        toast.error('Failed to get order detail!')
                }
            } catch (err) {
                console.log(err)
                toast.error('Failed to get order detail!')
            }
        }
        fetchData();
    }, [reload])

    return (
        <div className={'w-full h-full flex flex-col justify-between items-center'}>
            <div
                className={'absolute top-5 left-5 bg-gradient-to-b from-indigo-500 from-20% via-purple-500 to-pink-500 p-2.5 rounded-lg shadow-lg shadow-gray-500'}
                onClick={() => navigate(-1)}><BsBoxArrowInLeft size={20} color={'white'}/>
            </div>
            <div className={'w-full h-fit flex flex-col justify-start items-center gap-4'}>
                <p className={'font-bold text-xl text-[rgb(var(--main-color))] border-b-2 border-[rgb(var(--border-color))] mb-3'}>
                    Thông tin đơn hàng</p>
                <p className={'text-sm mb-3'}><strong>Mã đơn hàng:</strong> {param.id}</p>
                <div className={'w-[95%] h-full border-l-2 border-t-2 border-[var(--border-color)] rounded-lg'}>
                    <table>
                        <thead>
                        <tr>
                            <th className={'border-r-2 border-b-2 border-[var(--border-color)] rounded-lg'}>SKU</th>
                            <th className={'border-r-2 border-b-2 border-[var(--border-color)] rounded-lg'}>Tên</th>
                            <th className={'border-r-2 border-b-2 border-[var(--border-color)] rounded-lg'}>SL</th>
                            <th className={'border-r-2 border-b-2 border-[var(--border-color)] rounded-lg'}>Đơn giá</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data && Object.entries(data?.OrderDetail).map(([key, value]) => (
                                <tr key={key}>
                                    <td className={'text-center w-3/10 h-30 p-1 border-r-2 border-b-2 border-[var(--border-color)] rounded-lg'}>{value.ProductVariants["sku"]}</td>
                                    <td className={'text-center w-2/5 h-30 p-1 border-r-2 border-b-2 border-[var(--border-color)] rounded-lg'}>{value.ProductVariants["name"]}</td>
                                    <td className={'text-center w-2/5 h-30 p-1 border-r-2 border-b-2 border-[var(--border-color)] rounded-lg'}></td>
                                    <td className={'text-center w-1/5 h-30 p-1 border-r-2 border-b-2 border-[var(--border-color)] rounded-lg'}>{formatedNumber(value.ProductVariants["price"])}đ</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
                <p className={'font-bold text-xl text-[rgb(var(--main-color))] border-b-2 border-[rgb(var(--border-color))] mt-5 mb-3'}>Tổng
                    giá trị đơn hàng</p>
                <div className={'w-[95%] h-full border-l-2 border-t-2 rounded-lg'}>
                    <table>
                        <thead>
                        <tr>
                            <th className={'border-r-2 border-b-2 border-[var(--border-color)] rounded-lg'}>Tên</th>
                            <th className={'border-r-2 border-b-2 border-[var(--border-color)] rounded-lg'}>SL</th>
                            <th className={'border-r-2 border-b-2 border-[var(--border-color)] rounded-lg'}>Tổng</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data && Object.entries(data?.OrderDetail).map(([key, value]) => (
                                <tr key={key}>
                                    <td className={'text-center w-3/5 h-30 p-1 border-b-2 border-[var(--border-color)] rounded-lg'}>{value.ProductVariants["name"]}</td>
                                    <td className={'text-center w-1/5 h-30 p-1 border-b-2 border-[var(--border-color)] rounded-lg'}>{value.amount}</td>
                                    <td className={'text-center w-1/5 h-30 p-1 border-r-2  border-b-2 border-[var(--border-color)] rounded-lg'}>{formatedNumber(value.amount * value.ProductVariants["price"])}đ</td>
                                </tr>
                            ))
                        }
                        <tr>
                            <td colSpan={2}
                                className={'font-bold text-center w-3/5 p-1 border-b-2 border-[var(--border-color)] rounded-lg'}>
                                Tổng giá trị
                            </td>
                            <td className={'text-center w-1/5 p-1 border-r-2  border-b-2 border-[var(--border-color)] rounded-lg'}>{formatedNumber(data?.cost)}đ</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <p className={'font-bold text-xl text-[rgb(var(--main-color))] border-b-2 border-[rgb(var(--border-color))] mt-5 mb-3'}>
                    Trạng thái hiện tại của đơn hàng
                </p>
                <div
                    className={'border-2 border-[var(--border-color)] p-1 rounded-lg flex justify-center items-center gap-2'}>
                    {handleRenderSelect(data?.status)}
                    <button type={"button"} className={'bg-[var(--btn-primary-bg)] py-1 px-2 rounded-full'}
                            onClick={(e) => handleSubmit(e)}>
                        Xác nhận
                    </button>
                </div>
            </div>
            <div className={'w-fit h-fit grid grid-cols-2 grid-rows-1 mt-15 gap-4'}>
                <button
                    className={'p-2 rounded-lg border-2 border-[rgb(var(--main-color))] flex justify-center items-center gap-2'}>
                    <BsChatDotsFill size={20} color={"rgb(var(--main-color))"}/>Chat với người mua
                </button>

                <button
                    className={'p-2 rounded-lg border-2 border-[rgb(var(--main-color))] flex justify-center items-center gap-2'}>
                    <BsQuestionCircleFill size={20} color={"rgb(var(--main-color))"}/>Hỗ trợ đơn hàng
                </button>
            </div>
        </div>
    )
}
export default VendorOrderDetail;