import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import apiClient from "../../../services/apiClient.tsx";
import endpoints from "../../../services/endpoints.tsx";
import {useNavigate} from "react-router-dom";
import {orderStatusOptions} from "../../../utils/attributes.tsx";
import {fetchDataWithQuery, formatedDate} from "../../../utils/functions.utils.tsx";
import Loading from "../../../components/loading/Loading.tsx";
import {BsArrowClockwise, BsBookmarkFill, BsCalendar2DayFill, BsCheckCircleFill, BsFunnel, BsUpc} from "react-icons/bs";
import SearchingBar from "../../../components/modules/SearchingBar.tsx";
import {orderListType} from "../../../utils/vendor.data-types.tsx";
import {Pagination, Stack} from "@mui/material";

const VendorOrders = () => {
    const [data, setData] = useState<orderListType>();
    const [reload, setReload] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleOpenDetail = (order_id: string) => {
        navigate(`/vendor/orders/order-detail/${order_id}`)
    }

    const handleRenderStatus = (status: keyof typeof orderStatusOptions) => {
        if (status === 'PENDING') {
            return <p className={'text-[rgb(var(--main-color))]'}>
                {orderStatusOptions[status as keyof typeof orderStatusOptions]}
            </p>
        }
        if (status === 'CONFIRMED') {
            return <p className={'text-[rgb(var(--secondary-color))]'}>
                {orderStatusOptions[status as keyof typeof orderStatusOptions]}
            </p>
        }
        if (status === 'PREPARING') {
            return <p className={'text-cyan-700'}>
                {orderStatusOptions[status as keyof typeof orderStatusOptions]}
            </p>
        }
        if (status === 'DELIVERING') {
            return <p className={'text-gray-600'}>
                {orderStatusOptions[status as keyof typeof orderStatusOptions]}
            </p>
        }
        if (status === 'CANCELED') {
            return <p className={'text-red-500'}>
                {orderStatusOptions[status as keyof typeof orderStatusOptions]}
            </p>
        }
        if (status === 'ABORTED') {
            return <p className={'text-amber-900'}>
                {orderStatusOptions[status as keyof typeof orderStatusOptions]}
            </p>
        }
        if (status === 'POSTPONED') {
            return <p className={'text-blue-500'}>
                {orderStatusOptions[status as keyof typeof orderStatusOptions]}
            </p>
        }
        if (status === 'COMPLETE') {
            return <p className={'text-green-700'}>
                {orderStatusOptions[status as keyof typeof orderStatusOptions]}
            </p>
        }
        if (status === 'REFUNDED') {
            return <p className={'text-black'}>
                {orderStatusOptions[status as keyof typeof orderStatusOptions]}
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
                <p><BsFunnel size={20} color={"rgb(var(--main-color))"}/></p>
                <SearchingBar url={endpoints.brand.searchOrders} minLength={10} errorText={'Hãy nhập từ khóa'}
                              setData={setData} reload={reload} placeholderText={'Tối thiểu 10 kí tự...'}/>
                <p
                    onClick={() => setReload(true)}><BsArrowClockwise size={20} color={"rgb(var(--main-color))"}/></p>
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
                            <strong className={'w-fit flex justify-center items-center gap-1 text-[rgb(var(--main-color))]'}>
                                <BsBookmarkFill/>Bạn có một đơn đặt hàng mới
                            </strong>
                        </p>
                        <p className={'text-sm w-full flex justify-start items-center gap-2'}>
                            <strong className={'w-fit flex justify-center items-center gap-1'}>
                                <BsCheckCircleFill/>Tình trạng:
                            </strong>
                            {handleRenderStatus(value.status)}</p>
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