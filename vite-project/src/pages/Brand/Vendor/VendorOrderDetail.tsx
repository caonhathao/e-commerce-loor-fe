import {BsBoxArrowInLeft} from "react-icons/bs";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import apiClient from "../../../services/apiClient.tsx";
import endpoints from "../../../services/endpoints.tsx";
import {formatedNumber} from "../../../utils/functions.utils.tsx";
import {orderStatusOptions} from "../../../utils/attributes.tsx";

interface dataDetailType {
    amount: number;
    cost: number;
    createdAt: string;
    variant_id: string;
    product_variants: {
        name: string,
        sku: string,
        price: number,
    }
}

interface dataType {
    cost: number;
    fee: number;
    user_id: string;
    createdAt: string;
    status: string;
    OrderDetail: dataDetailType[]
}



const VendorOrderDetail = () => {
    const [data, setData] = useState<dataType>();
    const [status, setStatus] = useState<string>('');
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
                <option value={'PREPARING'} disabled={arr[2]}>Đang chuẩn bị</option>
                <option value={'DELIVERING'} disabled={arr[3]}>Đang vận chuyển</option>
                <option value={'CANCELED'} disabled={arr[4]}>Hủy bỏ</option>
                <option value={'ABORTED'} disabled={arr[5]}>Từ chối</option>
                <option value={'POSTPONED'} disabled={arr[6]}>Hoãn lại</option>
                <option value={'REFUNDED'} disabled={arr[7]}>Hoàn trả</option>
                <option value={'COMPLETE'} disabled={arr[8]}>Hoàn thành</option>
            </select>
        )
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log('click')
        e.preventDefault();
        try {
            if (data !== null || data !== undefined) {
                const payload = { id: param.id, status };
                console.log(payload)
                const response = await apiClient.put(endpoints.brand.updateOrder, payload);
                if (response.status === 200) toast.success('Cập nhật trạng thái thành công')
                else toast.error('Cập nhật trạng thái thất bại')
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
    }, [])

    return (
        <div className={'w-full h-full flex flex-col justify-center items-center'}>'
            <div
                className={'absolute top-5 left-5 bg-gradient-to-b from-indigo-500 from-20% via-purple-500 to-pink-500 p-2.5 rounded-lg shadow-lg shadow-gray-500'}
                onClick={() => navigate(-1)}><BsBoxArrowInLeft size={20} color={'white'}/>
            </div>
            <p className={'font-bold text-lg border-b-2 border-[var(--border-color)] mb-3'}>Thông tin đơn hàng</p>
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
                                <td className={'text-center w-3/10 h-30 p-1 border-r-2 border-b-2 border-[var(--border-color)] rounded-lg'}>{value.product_variants["sku"]}</td>
                                <td className={'text-center w-2/5 h-30 p-1 border-r-2 border-b-2 border-[var(--border-color)] rounded-lg'}>{value.product_variants["name"]}</td>
                                <td className={'text-center w-2/5 h-30 p-1 border-r-2 border-b-2 border-[var(--border-color)] rounded-lg'}></td>
                                <td className={'text-center w-1/5 h-30 p-1 border-r-2 border-b-2 border-[var(--border-color)] rounded-lg'}>{formatedNumber(value.product_variants["price"])}đ</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
            <p className={'font-bold text-lg border-b-2 border-[var(--border-color)] my-3'}>Tổng giá trị đơn hàng</p>
            <div className={'w-[95%] h-full border-l-2 border-t-2 border-[var(--border-color)] rounded-lg'}>
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
                                <td className={'text-center w-3/5 h-30 p-1 border-b-2 border-[var(--border-color)] rounded-lg'}>{value.product_variants["name"]}</td>
                                <td className={'text-center w-1/5 h-30 p-1 border-b-2 border-[var(--border-color)] rounded-lg'}>{value.amount}</td>
                                <td className={'text-center w-1/5 h-30 p-1 border-r-2  border-b-2 border-[var(--border-color)] rounded-lg'}>{formatedNumber(value.amount * value.product_variants["price"])}đ</td>
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
            <p className={'font-bold text-lg border-b-2 border-[var(--border-color)] my-3'}>
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
    )
}
export default VendorOrderDetail;