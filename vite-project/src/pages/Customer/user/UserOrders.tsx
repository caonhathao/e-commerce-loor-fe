import {fetchData, fetchDataWithQuery, formatedDate} from "../../../utils/functions.utils.tsx";
import endpoints from "../../../services/endpoints.tsx";
import {useEffect, useState} from "react";
import {Pagination, Stack} from "@mui/material";
import {orderDataType, orderStatus, orderType} from "../../../utils/user.data-types.tsx";
import UserOrderDetail from "../../../components/user/UserOrderDetail.tsx";
import {useParams} from "react-router-dom";
import SearchingBar from "../../../components/modules/SearchingBar.tsx";

const UserOrders = () => {
    const [data, setData] = useState<orderDataType>();
    const [openDetail, setOpenDetail] = useState<boolean>(false);
    const [reload, setReload] = useState<boolean>(false);
    const [choose, setChoose] = useState<string>('');

    const [currentTab, setCurrentTab] = useState<number>(0)
    const [activeTab, setActiveTab] = useState(new Array(6).fill(false));

    const {order_id} = useParams<{ order_id?: string }>();

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

    const handleGetOrderByStatus = (status: string, index: number) => {
        setActiveTab((prevState) => {
            const newContent = [...prevState];
            newContent[currentTab] = !newContent[currentTab];
            newContent[index] = true;
            return newContent;
        })
        setCurrentTab(index)

        if (status === '') {
            fetchDataWithQuery(endpoints.user.getOrders, setData, undefined, 1, 10)
        } else
            fetchDataWithQuery(endpoints.user.getOrdersByStatus, setData, {status: status}, 1, 10)
    }

    const handleReview = (index: number) => {
        setActiveTab((prevState) => {
            const newContent = [...prevState];
            newContent[currentTab] = !newContent[currentTab];
            newContent[index] = true;
            return newContent;
        })
        setCurrentTab(index)

        fetchDataWithQuery(endpoints.user.getEmptyOrderReview, setData, undefined, 1, 10)
        return null;
    }

    const handleOpenDetail = (order_id: string) => {
        setChoose(order_id);
        setOpenDetail(true);
    }

    useEffect(() => {
        if (order_id) handleOpenDetail(order_id)
    }, [order_id])

    useEffect(() => {
        fetchData(endpoints.user.getOrders, false, setData, 'Lấy dữ liệu thất bại')
        setActiveTab((prevState) => {
            const newContent = [...prevState];
            newContent[currentTab] = true;
            return newContent;
        })
        setReload(false)
    }, [openDetail, reload])

    return (
        <>
            <div className={'w-full h-full p-2'}>
                {/*searching bar here*/}
                <div className={'w-full h-fit flex flex-row justify-center items-center my-2'}>
                    <SearchingBar url={endpoints.user.searchOrder} minLength={8} errorText={'Thiếu từ khóa'}
                                  setData={setData} setReload={setReload}
                                  placeholderText={"Tìm kiếm đơn hàng,.."}/>
                </div>
                <div className={'w-full min-w-0 h-fit grid grid-flow-col auto-cols-max my-2 overflow-x-auto gap-2'}>
                    <button
                        className={`border-2 border-[rgb(var(--main-color))]  rounded-lg p-2 min-w-30 ${activeTab[0] ? `bg-[rgb(var(--main-color))] text-white` : ``}`}
                        onClick={() => handleGetOrderByStatus('', 0)}>Tất cả
                    </button>
                    <button
                        className={`border-2 border-[rgb(var(--main-color))] rounded-lg p-2 min-w-30  ${activeTab[1] ? `bg-[rgb(var(--main-color))] text-white` : ``}`}
                        onClick={() => handleGetOrderByStatus('POSTPONED', 1)}>
                        Chờ thanh toán
                    </button>
                    <button
                        className={`border-2 border-[rgb(var(--main-color))] rounded-lg p-2 min-w-30  ${activeTab[2] ? `bg-[rgb(var(--main-color))] text-white` : ``}`}
                        onClick={() => handleGetOrderByStatus('DELIVERING', 2)}>Chờ vân chuyển
                    </button>
                    <button
                        className={`border-2 border-[rgb(var(--main-color))] rounded-lg p-2 min-w-30  ${activeTab[3] ? `bg-[rgb(var(--main-color))] text-white` : ``}`}
                        onClick={() => handleGetOrderByStatus('DELIVERING', 3)}>Chờ giao hàng
                    </button>
                    <button
                        className={`border-2 border-[rgb(var(--main-color))] rounded-lg p-2 min-w-30  ${activeTab[4] ? `bg-[rgb(var(--main-color))] text-white` : ``}`}
                        onClick={() => handleReview(4)}>Chờ đánh giá
                    </button>
                    <button
                        className={`border-2 border-[rgb(var(--main-color))] rounded-lg p-2 min-w-30  ${activeTab[5] ? `bg-[rgb(var(--main-color))] text-white` : ``}`}
                        onClick={() => handleGetOrderByStatus('REFUNDED', 5)}>Trả hàng & Hủy
                    </button>
                </div>
                <div className={'w-full h-fit flex flex-row justify-center items-center my-2'}>
                    {data !== null && data !== undefined ? (
                        <Stack spacing={2} alignItems={'center'}>
                            <Pagination count={data?.total_pages}
                                        page={data?.current_page}
                                        onChange={(_e, value) => fetchDataWithQuery(endpoints.user.getOrders, setData, undefined, value, 10)}/>
                        </Stack>
                    ) : null}
                </div>
                <div className={'w-full h-full mt-5 flex flex-col justify-start item-center'}>
                    {data?.data ? (
                        data?.data.map((item: orderType, i: number) => (
                            <div key={i}
                                 className={'w-full h-fit flex flex-col justify-center items-start border-2 border-[rgb(var(--main-color))] p-2 rounded-lg my-3 shadow-lg shadow-gray-500'}
                                 onClick={() => handleOpenDetail(item.id)} style={{cursor: 'pointer'}}>
                                <div className={'w-full flex flex-row justify-between items-center'}>
                                    <p>Mã đơn: <strong className={'text-[rgb(var(--main-color))]'}>{item.id}</strong>
                                    </p>
                                    {handleOrderStatusMean(item.status as keyof typeof orderStatus)}
                                </div>
                                <p>Ngày tạo <strong
                                    className={'text-[rgb(var(--main-color))]'}>{formatedDate(item.createdAt, true)}</strong>
                                </p>
                                <div>Địa chỉ giao hàng: <strong
                                    className={'text-[rgb(var(--main-color))]'}>{item.address}</strong></div>
                            </div>
                        ))
                    ) : (<p className={'w-full text-center'}>Bạn chưa có đơn hàng nào!</p>)}
                </div>
            </div>
            {openDetail ? (<UserOrderDetail order_id={choose} setOpen={setOpenDetail}/>) : null}

        </>
    )
}

export default UserOrders