import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import apiClient from "../../../services/apiClient.tsx";
import endpoints from "../../../services/endpoints.tsx";
import {useNavigate} from "react-router-dom";
import {orderStatusOptions} from "../../../utils/attributes.tsx";
import {formateDate} from "../../../utils/functions.utils.tsx";
import Loading from "../../../components/loading/Loading.tsx";
import {BsBookFill, BsBookmarkFill, BsCalendar2DayFill, BsCheckCircleFill, BsUpc} from "react-icons/bs";

interface dataNotices {
    id: string;
    status: string;
    createdAt: string;
    cost: number;
    user_id: string;
}

const VendorOrders = () => {
    const [data, setData] = useState<dataNotices[]>([]);
    const [choose, setChoose] = useState(new Array(6).fill(false))
    const [chooseValue, setChooseValue] = useState<string>('')
    const [currentTab, setCurrentTab] = useState(-1);

    const navigate = useNavigate();

    const handleChoose = (index: number, value: string) => {
        setChoose((prevState) => {
            if (currentTab === index) {
                prevState[index] = !prevState[index]
                setChooseValue('')
            } else {
                prevState[index] = !prevState[index]
                prevState[currentTab] = false
                setCurrentTab(index)
                setChooseValue(value)
            }
            return [...prevState]
        })
    }

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const payload = {status: chooseValue}
                const response = await apiClient.post(endpoints.brand.getOrdersByStatus, payload);
                if (response.status === 200) setData(response.data)
                else toast.error(response.data.message)
            } catch (e) {
                console.error(e)
                toast.error('Lỗi khi truy vấn dữ liệu')
            }
        }
        fetchData();
    }, [chooseValue]);

    if (!data) return (<Loading/>)

    return (
        <div className={'w-full h-screen flex flex-col justify-start items-center'}>
            <div
                className={'w-[90%] fit h-fit grid grid-cols-3 grid-rows-2 gap-4 text-black my-4'}>
                <div
                    className={`border border-[var(--border-color)] rounded-4xl text-center p-1 ${choose[0] ? 'bg-[var(--btn-accent-bg)] text-[var(--btn-accent-text)]' : 'bg-white text-black'}`}
                    onClick={() => handleChoose(0, 'COMPLETE')}>Hoàn thành
                </div>
                <div
                    className={`border border-[var(--border-color)] rounded-4xl text-center p-1 ${choose[1] ? 'bg-[var(--btn-accent-bg)] text-[var(--btn-accent-text)]' : 'bg-white text-black'}`}
                    onClick={() => handleChoose(1, 'PENDING')}>Chờ duyệt
                </div>
                <div
                    className={`border border-[var(--border-color)] rounded-4xl text-center p-1 ${choose[2] ? 'bg-[var(--btn-accent-bg)] text-[var(--btn-accent-text)]' : 'bg-white text-black'}`}
                    onClick={() => handleChoose(2, 'CONFIRMED')}>Đã duyệt
                </div>
                <div
                    className={`border border-[var(--border-color)] rounded-4xl text-center p-1 ${choose[3] ? 'bg-[var(--btn-accent-bg)] text-[var(--btn-accent-text)]' : 'bg-white text-black'}`}
                    onClick={() => handleChoose(3, 'CANCELED')}>Đã hủy
                </div>
                <div
                    className={`border border-[var(--border-color)] rounded-4xl text-center p-1 ${choose[4] ? 'bg-[var(--btn-accent-bg)] text-[var(--btn-accent-text)]' : 'bg-white text-black'}`}
                    onClick={() => handleChoose(4, 'DELIVERING')}>Đang chuyển
                </div>
                <div
                    className={`border border-[var(--border-color)] rounded-4xl text-center p-1 ${choose[5] ? 'bg-[var(--btn-accent-bg)] text-[var(--btn-accent-text)]' : 'bg-white text-black'}`}
                    onClick={() => handleChoose(5, 'OTHER')}>Khác
                </div>
            </div>
            <div className={'w-[90%] grid grid-cols-1 gap-3'}>
                {data && data.length > 0 ? data.map((value, index) => (
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
                                <BsUpc/>Mã khách hàng:
                            </strong>
                            {value.user_id}
                        </p>
                        <p className={'text-sm w-full flex justify-start items-center gap-2'}>
                            <strong className={'w-fit flex justify-center items-center gap-1'}>
                                <BsCalendar2DayFill/>
                                Thời gian:
                            </strong>
                            {formateDate(value.createdAt)}
                        </p>
                    </div>
                )) : <p className={'text-center'}>Chưa có đơn hàng đang ở trạng thái này</p>}
            </div>
        </div>
    )
}
export default VendorOrders