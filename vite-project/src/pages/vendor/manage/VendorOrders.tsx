import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import apiClient from "../../../services/apiClient.tsx";
import endpoints from "../../../services/endpoints.tsx";
import {useNavigate} from "react-router-dom";
import {orderStatusOptions} from "../../../utils/attributes.tsx";
import {fetchDataWithQuery, formatedDate} from "../../../utils/functions.utils.tsx";
import Loading from "../../../components/loading/Loading.tsx";
import {BsBookmarkFill, BsCalendar2DayFill, BsCheckCircleFill, BsUpc} from "react-icons/bs";
import SearchingBar from "../../../components/modules/SearchingBar.tsx";
import {orderListType} from "../../../utils/vendor.data-types.tsx";
import {Pagination, Stack} from "@mui/material";

type OrderStatus = keyof typeof orderStatusOptions;

const VendorOrders = () => {
    const [data, setData] = useState<orderListType>();
    const [reload, setReload] = useState<boolean>(false);
    const navigate = useNavigate();
    const [currentTab, setCurrentTab] = useState<number>(-1)
    const [activeTab, setActiveTab] = useState(new Array(9).fill(false));

    const handleFilterByType = (type: string, index: number) => {
        setActiveTab((prevState) => {
            const newContent = [...prevState];
            if (currentTab !== index) {
                setCurrentTab(index);
                newContent[currentTab] = !newContent[currentTab];
                newContent[index] = true;
            }
            return newContent;
        })
        fetchDataWithQuery(endpoints.user.getOrdersByStatus, setData, {status: type})
    }

    const handleOpenDetail = (order_id: string) => {
        navigate(`/vendor/orders/order-detail/${order_id}`)
    }

    const handleRenderStatus = (_status: keyof typeof orderStatusOptions) => {
        if (_status === 'PENDING') {
            return <p className={'text-[rgb(var(--main-color))]'}>
                {orderStatusOptions[_status as keyof typeof orderStatusOptions]}
            </p>
        }
        if (_status === 'CONFIRMED') {
            return <p className={'text-[rgb(var(--secondary-color))]'}>
                {orderStatusOptions[_status as keyof typeof orderStatusOptions]}
            </p>
        }
        if (_status === 'PACKING') {
            return <p className={'text-cyan-700'}>
                {orderStatusOptions[_status as keyof typeof orderStatusOptions]}
            </p>
        }
        if (_status === 'DELIVERING') {
            return <p className={'text-gray-600'}>
                {orderStatusOptions[_status as keyof typeof orderStatusOptions]}
            </p>
        }
        if (_status === 'CANCELED') {
            return <p className={'text-red-500'}>
                {orderStatusOptions[_status as keyof typeof orderStatusOptions]}
            </p>
        }
        if (_status === 'ABORTED') {
            return <p className={'text-amber-900'}>
                {orderStatusOptions[_status as keyof typeof orderStatusOptions]}
            </p>
        }
        if (_status === 'POSTPONED') {
            return <p className={'text-blue-500'}>
                {orderStatusOptions[_status as keyof typeof orderStatusOptions]}
            </p>
        }
        if (_status === 'COMPLETED') {
            return <p className={'text-green-700'}>
                {orderStatusOptions[_status as keyof typeof orderStatusOptions]}
            </p>
        }
        if (_status === 'REFUNDED') {
            return <p className={'text-black'}>
                {orderStatusOptions[_status as keyof typeof orderStatusOptions]}
            </p>
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get(endpoints.brand.getOrders);
                if (response && response.status === 200) {
                    setData(response.data)
                } else toast.error('Lỗi khi truy vấn dữ liệu!')
            } catch (e) {
                console.error(e)
                toast.error('Lỗi khi truy vấn dữ liệu!')
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (reload) {
            const fetchData = async () => {
                try {
                    const response = await apiClient.get(endpoints.brand.getOrders);
                    if (response && response.status === 200) {
                        setData(response.data)
                        setReload(false)
                        setCurrentTab(-1)
                        setActiveTab(new Array(9).fill(false))
                    } else toast.error('Lỗi khi truy vấn dữ liệu!')
                } catch (e) {
                    console.error(e)
                    toast.error('Lỗi khi truy vấn dữ liệu!')
                }
            }
            fetchData();
        }
    }, [reload])

    if (!data) return (<Loading/>)

    return (
        <div className={'w-full h-screen flex flex-col justify-start items-center'}>
            <div
                className={'w-[90%] fit h-fit flex flex-row justify-center items-center gap-4 text-black my-4'}>
                <SearchingBar url={endpoints.brand.searchOrders} minLength={10} errorText={'Hãy nhập từ khóa'}
                              setData={setData} setReload={setReload} placeholderText={'Tối thiểu 10 kí tự...'}/>
            </div>
            <div
                className={`w-full min-w-0 h-fit bg-white flex flex-row justify-start items-center gap-2 py-2 mb-5 overflow-x-auto`}>
                <button
                    className={`border-2  whitespace-nowrap border-[rgb(var(--btn-primary-bg))] p-2 rounded-lg ${activeTab[0] ? `text-white bg-[rgb(var(--btn-primary-bg))]` : `text-black bg-white`}`}
                    onClick={() => handleFilterByType('PENDING', 0)}>
                    Đang chờ
                </button>
                <button
                    className={`border-2  whitespace-nowrap  border-[rgb(var(--btn-primary-bg))] p-2 rounded-lg ${activeTab[1] ? `text-white bg-[rgb(var(--btn-primary-bg))]` : `text-black bg-white`}`}
                    onClick={() => handleFilterByType('CONFIRMED', 1)}>Đã xác nhận
                </button>
                <button
                    className={`border-2  border-[rgb(var(--btn-primary-bg))] whitespace-nowrap p-2 rounded-lg ${activeTab[2] ? `text-white bg-[rgb(var(--btn-primary-bg))]` : `text-black bg-white`}`}
                    onClick={() => handleFilterByType('PREPARING', 2)}>Đang chuẩn bị
                </button>
                <button
                    className={`border-2  border-[rgb(var(--btn-primary-bg))] whitespace-nowrap p-2 rounded-lg ${activeTab[3] ? `text-white bg-[rgb(var(--btn-primary-bg))]` : `text-black bg-white`}`}
                    onClick={() => handleFilterByType('DELIVERING', 3)}>Đang vận chuyển
                </button>
                <button
                    className={`border-2  border-[rgb(var(--btn-primary-bg))] whitespace-nowrap p-2 rounded-lg ${activeTab[4] ? `text-white bg-[rgb(var(--btn-primary-bg))]` : `text-black bg-white`}`}
                    onClick={() => handleFilterByType('CANCELED', 4)}>Hủy bỏ
                </button>
                <button
                    className={`border-2  border-[rgb(var(--btn-primary-bg))] whitespace-nowrap p-2 rounded-lg ${activeTab[5] ? `text-white bg-[rgb(var(--btn-primary-bg))]` : `text-black bg-white`}`}
                    onClick={() => handleFilterByType('ABORTED', 5)}>Từ chối
                </button>
                <button
                    className={`border-2 border-[rgb(var(--btn-primary-bg))] whitespace-nowrap p-2 rounded-lg ${activeTab[6] ? `text-white bg-[rgb(var(--btn-primary-bg))]` : `text-black bg-white`}`}
                    onClick={() => handleFilterByType('POSTPONED', 6)}>Hoãn lại
                </button>
                <button
                    className={`border-2 border-[rgb(var(--btn-primary-bg))] whitespace-nowrap p-2 rounded-lg ${activeTab[6] ? `text-white bg-[rgb(var(--btn-primary-bg))]` : `text-black bg-white`}`}
                    onClick={() => handleFilterByType('REFUNDED', 7)}>Hoàn trả
                </button>
                <button
                    className={`border-2 border-[rgb(var(--btn-primary-bg))] whitespace-nowrap p-2 rounded-lg ${activeTab[6] ? `text-white bg-[rgb(var(--btn-primary-bg))]` : `text-black bg-white`}`}
                    onClick={() => handleFilterByType('COMPLETE', 8)}>Hoàn thành
                </button>
            </div>
            <div className={'mt-3 mb-5'}>
                {data !== null && data !== undefined ? (
                    <Stack spacing={2} alignItems={'center'}>
                        <Pagination count={data?.total_pages}
                                    page={data?.current_page}
                                    onChange={(_e, value) => fetchDataWithQuery(endpoints.brand.getOrders, setData, value, 10)}/>
                    </Stack>
                ) : null}
            </div>
            <div className={'w-[90%] grid grid-cols-1 gap-3'}>
                {data && data.data.length > 0 ? data.data.map((value, index) => (
                    <div key={index}
                         className={'w-full h-fit border-2 border-[rgb(var(--border-color))] p-2 rounded-lg bg-amber-100 mb-2 shadow-lg shadow-gray-300'}
                         onClick={() => handleOpenDetail(value.id)} style={{cursor: 'pointer'}}>
                        <p className={'text-lg border-b-[1px] border-[rgb(var(--border-color))] mb-2 w-full flex justify-start items-center gap-2'}>
                            <strong
                                className={'w-fit flex justify-center items-center gap-1 text-[rgb(var(--main-color))]'}>
                                <BsBookmarkFill/>Bạn có một đơn đặt hàng mới
                            </strong>
                        </p>
                        <p className={'text-sm w-full flex justify-start items-center gap-2'}>
                            <strong className={'w-fit flex justify-center items-center gap-1'}>
                                <BsCheckCircleFill/>Tình trạng:
                            </strong>
                            {handleRenderStatus(value.status as OrderStatus)}</p>
                        <p className={'text-sm w-full flex justify-start items-center gap-2'}>
                            <strong className={'w-fit flex justify-center items-center gap-1'}>
                                <BsUpc/>Mã đặt hàng:
                            </strong>
                            {value.id}
                        </p>
                        <p className={'text-sm w-full flex justify-start items-center gap-2'}>
                            <strong className={'w-fit flex justify-center items-center gap-1'}>
                                <BsCalendar2DayFill/>
                                Thời gian:
                            </strong>
                            {formatedDate(value.createdAt)}
                        </p>
                    </div>
                )) : <p className={'text-center'}>Chưa có đơn hàng đang ở trạng thái này</p>}
            </div>
        </div>
    )
}
export default VendorOrders