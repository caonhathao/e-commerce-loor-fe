import {fetchData, fetchDataWithQuery, formatedDate} from "../../../utils/functions.utils.tsx";
import endpoints from "../../../services/endpoints.tsx";
import {useEffect, useState} from "react";
import {Pagination, Stack} from "@mui/material";
import {orderDataType, orderStatus, orderType} from "../../../utils/data-types.tsx";
import UserOrderDetail from "./UserOrderDetail.tsx";

const UserOrders = () => {
    const [data, setData] = useState<orderDataType>();
    const [openDetail, setOpenDetail] = useState<boolean>(false);
    const [choose, setChoose] = useState<string>('');
    const handleOrderStatusMean = (_status: keyof typeof orderStatus) => {
        if (_status === 'PENDING') {
            return <p>Tình trạng: <strong className={'text-yellow-500'}>
                {orderStatus[_status]}
            </strong>
            </p>
        }
        if (_status === 'CONFIRMED') {
            return <p>Tình trạng: <strong className={'text-green-400'}>
                {orderStatus[_status]}
            </strong>
            </p>
        }
        if (_status === 'PREPARING') {
            return <p>Tình trạng: <strong className={'text-green-700'}>
                {orderStatus[_status]}
            </strong>
            </p>
        }
        if (_status === 'DELIVERING') {
            return <p>Tình trạng: <strong className={'text-blue-800'}>
                {orderStatus[_status]}
            </strong>
            </p>
        }
        if (_status === 'CANCELED') {
            return <p>Tình trạng: <strong className={'text-amber-900'}>
                {orderStatus[_status]}
            </strong>
            </p>
        }
    };

    useEffect(() => {
        fetchData(endpoints.user.getOrders, true, setData, 'Lấy dữ liệu thất bại')
    }, [])

    useEffect(() => {
        console.log(data)
    }, [data]);

    const handleOpenDetail = (order_id: string) => {
        setChoose(order_id);
        setOpenDetail(true);
    }

    return (
        <div className={'w-full h-full p-2'}>
            {data !== null && data !== undefined ? (
                <Stack spacing={2} alignItems={'center'}>
                    <Pagination count={data?.total_pages}
                                page={data?.current_page}
                                onChange={(_e, value) => fetchDataWithQuery(endpoints.user.getOrders, setData, value, 10)}/>
                </Stack>
            ) : null}
            <div className={'w-full h-full mt-5'}>
                {data?.data ? (
                    data?.data.map((item: orderType, i: number) => (
                        <div key={i}
                             className={'w-full h-full flex flex-col justify-center items-start border-2 border-[rgb(var(--main-color))] p-2 rounded-lg my-3 shadow-lg shadow-gray-500'}
                             onClick={() => handleOpenDetail(item.id)} style={{cursor: 'pointer'}}>
                            <div className={'w-full flex flex-row justify-between items-center'}>
                                <p>Mã đơn: <strong className={'text-[rgb(var(--main-color))]'}>{item.id}</strong></p>
                                {handleOrderStatusMean(item.status as keyof typeof orderStatus)}
                            </div>
                            <p>Ngày tạo <strong
                                className={'text-[rgb(var(--main-color))]'}>{formatedDate(item.createdAt)}</strong>
                            </p>
                            <div>Địa chỉ giao hàng: <strong
                                className={'text-[rgb(var(--main-color))]'}>{item.address}</strong></div>
                        </div>
                    ))
                ) : (<p>Bạn chưa có đơn hàng nào!</p>)}
            </div>
            {openDetail ? (<UserOrderDetail order_id={choose} setOpen={setOpenDetail}/>) : null}
        </div>
    )
}

export default UserOrders