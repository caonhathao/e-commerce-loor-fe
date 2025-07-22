import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import apiClient from "../../../services/apiClient.tsx";
import endpoints from "../../../services/endpoints.tsx";
import {useNavigate} from "react-router-dom";
import {orderStatusOptions} from "../../../utils/attributes.tsx";
import {formatedDate} from "../../../utils/functions.utils.tsx";
import Loading from "../../../components/loading/Loading.tsx";
import {BsBookmarkFill, BsCalendar2DayFill, BsCheckCircleFill, BsFunnel, BsUpc} from "react-icons/bs";
import SearchingBar from "../../../components/modules/SearchingBar.tsx";
import {orderDataType} from "../../../utils/user.data-types.tsx";

const VendorOrders = () => {
    const [data, setData] = useState<orderDataType>();
    const navigate = useNavigate();

    const handleOpenDetail = (order_id: string) => {
        navigate(`/vendor/orders/order-detail/${order_id}`)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get(endpoints.brand.getOrders);
                if (response && response.status === 200) {
                    setData(response.data)
                    console.log(response.data)
                } else toast.error('Lỗi khi truy vấn dữ liệu!')
            } catch (e) {
                console.error(e)
                toast.error('Lỗi khi truy vấn dữ liệu!')
            }
        }
        fetchData();
    }, []);

    if (!data) return (<Loading/>)

    return (
        <div className={'w-full h-screen flex flex-col justify-start items-center'}>
            <div
                className={'w-[90%] fit h-fit flex flex-row justify-center items-center gap-4 text-black my-4'}>
                <p>Lọc: <BsFunnel/></p>
                <SearchingBar url={endpoints.brand.searchOrders} setData={setData} placeholderText={'Tối thiểu 10 kí tự...'} />
            </div>
            <div className={'w-[90%] grid grid-cols-1 gap-3'}>
                {data && data.data.length > 0 ? data.data.map((value, index) => (
                    <div key={index}
                         className={'w-full h-fit border-2 border-[var(--border-color)] p-2 rounded-lg bg-amber-200 mb-2'}
                         onClick={() => handleOpenDetail(value.id)} style={{cursor: 'pointer'}}>
                        <p className={'text-lg w-full border-b-[1px] border-[var(--border-color)] mb-2 w-full flex justify-start items-center gap-2'}>
                            <strong className={'w-fit flex justify-center items-center gap-1'}>
                                <BsBookmarkFill/>Bạn có một đơn đặt hàng mới
                            </strong>
                        </p>
                        <p className={'text-sm w-full flex justify-start items-center gap-2'}>
                            <strong className={'w-fit flex justify-center items-center gap-1'}>
                                <BsCheckCircleFill/>Tình trạng:
                            </strong>
                            {orderStatusOptions[value.status as keyof typeof orderStatusOptions]}</p>
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