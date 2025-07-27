import React, {useEffect, useState} from "react";
import {notificationDetailData} from "../../utils/user.data-types.tsx";
import Loading from "../loading/Loading.tsx";
import {fetchDataWithPayload, formatedDate} from "../../utils/functions.utils.tsx";
import endpoints from "../../services/endpoints.tsx";
import {BsX} from "react-icons/bs";
import {Link} from "react-router-dom";

interface UserNotifyDetailProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    id: string;
}

const UserNotifyDetail: React.FC<UserNotifyDetailProps> = ({setOpen, id}) => {
    const [notifyData, setNotifyData] = useState<notificationDetailData | null>(null)

    const handleRenderType = (type: string) => {
        if (type === 'SUCCESS') {
            return 'Thành công'
        }
        if (type === 'WARNING') {
            return 'Cảnh báo'
        }
        if (type === 'ERROR') {
            return "Lỗi"
        }
        if (type === 'BAN') {
            return 'Cấm'
        }
        if (type === 'ADS') {
            return 'Quảng cáo'
        }
        if (type === 'NOTICE') {
            return 'Thông báo'
        }
    }

    const handleRenderColorTYpe = (type: string) => {
        if (type === 'SUCCESS') {
            return <p>Loại: <strong className={'text-green-500'}>{handleRenderType(type)}</strong></p>
        }
        if (type === 'WARNING') {
            return <p>Loại: <strong className={'text-amber-500'}>{handleRenderType(type)}</strong></p>
        }
        if (type === 'ERROR') {
            return <p>Loại: <strong className={'text-red-500'}>{handleRenderType(type)}</strong></p>
        }
        if (type === 'BAN') {
            return <p>Loại: <strong className={'text-amber-900'}>{handleRenderType(type)}</strong></p>
        }
        if (type === 'ADS') {
            return <p>Loại: <strong className={'text-blue-500'}>{handleRenderType(type)}</strong></p>
        }
        if (type === 'NOTICE') {
            return <p>Loại: <strong className={'text-emerald-500'}>{handleRenderType(type)}</strong></p>
        }
    }

    const handleGetID = (url: string) => {
        const id = url.split('/').pop()
        return id;
    }

    useEffect(() => {
        if (id)
            fetchDataWithPayload(endpoints.user.getNotificationDetail, setNotifyData, {id})
    }, [id])

    if (notifyData === null) return (<Loading/>)

    return (
        <div className={'w-full h-screen absolute top-0 left-0 z-[200] bg-white'}>
            <div
                className={'w-full h-fit flex flex-row justify-between items-center p-2 border-b-2 border-[rgb(var(--border-color))]'}>
                <p className={'w-full text-center text-[rgb(var(--main-color))] font-bold text-lg'}>{notifyData?.title}</p>
                <button type={'button'}
                        className={'absolute top-0.5 right-1 w-10 h-10 bg-red-500 rounded-lg flex justify-center items-center text-white'}
                        onClick={() => setOpen(false)}>
                    <BsX size={30}/>
                </button>
            </div>
            <div>
                <div
                    className={'w-full h-fit flex flex-row justify-between items-center p-2 text-sm italic border-b-2 border-[rgb(var(--main-color))]'}>
                    <p>Thời gian: {formatedDate(notifyData?.createdAt, true)}</p>
                    {handleRenderColorTYpe(notifyData?.type)}
                </div>
                <div className={'w-full h-fit p-3'}>
                    <p>{notifyData?.content}</p>
                    <p>
                        Xem chi tiết <Link to={`/user/show-orders/${handleGetID(notifyData?.redirect_url)}`}
                                           className={'text-[rgb(var(--secondary-color))]'}>tại đây</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default UserNotifyDetail