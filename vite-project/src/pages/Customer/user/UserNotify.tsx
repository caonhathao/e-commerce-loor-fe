import {fetchData, fetchDataWithQuery, formatedDate, postData, putData} from "../../../utils/functions.utils.tsx";
import endpoints from "../../../services/endpoints.tsx";
import {useEffect, useState} from "react";
import {Pagination, Stack} from "@mui/material";
import {notificationType} from "../../../utils/user.data-types.tsx";
import {
    BsAppIndicator,
    BsBan,
    BsBell,
    BsCheckCircle,
    BsEnvelopeOpen,
    BsExclamationCircleFill,
    BsSlash
} from "react-icons/bs";
import Loading from "../../../components/loading/Loading.tsx";
import UserNotifyDetail from "../../../components/user/UserNotifyDetail.tsx";
import {useUser} from "../../../context/UserContext.tsx";
import {toast} from "react-toastify";

const UserNotify = () => {
    const [data, setData] = useState<notificationType | null | undefined>();
    const [openDetail, setOpenDetail] = useState<boolean>(false);
    const [choose, setChoose] = useState<string>('');

    const [currentTab, setCurrentTab] = useState<number>(0)
    const [activeTab, setActiveTab] = useState(new Array(7).fill(false));

    const {setUser} = useUser();

    const handleRenderType = (type: string) => {
        if (type === 'SUCCESS') {
            return <BsCheckCircle size={30} color={'green'}/>
        }
        if (type === 'WARNING') {
            return <BsExclamationCircleFill size={30} color={'yellow'}/>
        }
        if (type === 'ERROR') {
            return <BsSlash size={30} color={'red'}/>
        }
        if (type === 'BAN') {
            return <BsBan size={30} color={'red'}/>
        }
        if (type === 'ADS') {
            return <BsBell size={30} color={'red'}/>
        }
        if (type === 'NOTICE') {
            return <BsAppIndicator size={30} color={'blue'}/>
        }
    }

    const handleOpenDetail = (id: string) => {
        setChoose(id)
        setOpenDetail(true)
    }

    const handleFilterByType = (type: string[], index: number) => {
        setActiveTab((prevState) => {
            const newContent = [...prevState];
            if (currentTab !== index) {
                setCurrentTab(index);
                newContent[currentTab] = !newContent[currentTab];
                newContent[index] = true;
            }
            return newContent;
        })
        postData(endpoints.user.getNotificationByType, true, {type}, setData).then((data) => setData(data))
    }

    const markAllRead = () => {
        putData(endpoints.user.markAsRead, true).then(async (data) => {
            if (data && data.status === 200) {
                toast.success(data.data.message, {autoClose: 1500})
                setTimeout(async () => {
                    await fetchDataWithQuery(endpoints.user.getAllNotifications, setData, 1, 10,)
                    await fetchData(endpoints.user.getUserInfo, false, setUser)
                }, 1500)
            }
        })
    }

    useEffect(() => {
        const fetch = async () => {
            await fetchDataWithQuery(endpoints.user.getAllNotifications, setData, 1, 10,)
            await fetchData(endpoints.user.getUserInfo, false, setUser)
        }
        fetch()
    }, [openDetail])

    useEffect(() => {
        setActiveTab((prev) => {
            const copy = [...prev]
            copy[0] = true
            return copy
        })
    }, [])

    if (data === null) return (<Loading/>)

    return (
        <>
            <div className={'w-full h-full p-2 flex flex-col justify-center items-center'}>
                <div className={'w-full flex flex-col justify-center items-center my-2'}>
                    <div className={'w-full h-fit flex flex-row justify-start items-center gap-2 p-2'}
                         onClick={markAllRead} style={{cursor: 'pointer'}}>
                        <BsEnvelopeOpen size={20}/>
                        <p>Đánh dấu đọc hết</p>
                    </div>
                    <div
                        className={`w-full min-w-0 h-fit bg-white flex flex-row justify-start items-center gap-2 py-2 mb-5 overflow-x-auto`}>
                        <button
                            className={`border-2  whitespace-nowrap border-[rgb(var(--btn-primary-bg))] p-2 rounded-lg ${activeTab[0] ? `text-white bg-[rgb(var(--btn-primary-bg))]` : `text-black bg-white`}`}
                            onClick={() => handleFilterByType(['NOTICE', 'WARNING', 'SUCCESS', 'ADS', 'ERROR', 'BAN'], 0)}>
                            Xem tất cả
                        </button>
                        <button
                            className={`border-2  whitespace-nowrap  border-[rgb(var(--btn-primary-bg))] p-2 rounded-lg ${activeTab[1] ? `text-white bg-[rgb(var(--btn-primary-bg))]` : `text-black bg-white`}`}
                            onClick={() => handleFilterByType(['NOTICE', 'SUCCESS'], 1)}>Thông báo
                        </button>
                        <button
                            className={`border-2  border-[rgb(var(--btn-primary-bg))] whitespace-nowrap p-2 rounded-lg ${activeTab[2] ? `text-white bg-[rgb(var(--btn-primary-bg))]` : `text-black bg-white`}`}
                            onClick={() => handleFilterByType(['ADS'], 2)}>Quáng cáo
                        </button>
                        <button
                            className={`border-2  border-[rgb(var(--btn-primary-bg))] whitespace-nowrap p-2 rounded-lg ${activeTab[3] ? `text-white bg-[rgb(var(--btn-primary-bg))]` : `text-black bg-white`}`}
                            onClick={() => handleFilterByType(['WARNING'], 3)}>Cảnh báo
                        </button>
                        <button
                            className={`border-2  border-[rgb(var(--btn-primary-bg))] whitespace-nowrap p-2 rounded-lg ${activeTab[4] ? `text-white bg-[rgb(var(--btn-primary-bg))]` : `text-black bg-white`}`}
                            onClick={() => handleFilterByType(['ERROR'], 4)}>Lỗi
                        </button>
                        <button
                            className={`border-2  border-[rgb(var(--btn-primary-bg))] whitespace-nowrap p-2 rounded-lg ${activeTab[5] ? `text-white bg-[rgb(var(--btn-primary-bg))]` : `text-black bg-white`}`}
                            onClick={() => handleFilterByType(['BAN'], 5)}>Lệnh cấm
                        </button>
                        <button
                            className={`border-2 border-[rgb(var(--btn-primary-bg))] whitespace-nowrap p-2 rounded-lg ${activeTab[6] ? `text-white bg-[rgb(var(--btn-primary-bg))]` : `text-black bg-white`}`}
                            onClick={() => handleFilterByType(['OTHERS'], 6)}>Khác
                        </button>
                    </div>
                    {data !== null && data !== undefined ? (
                        <Stack spacing={2} alignItems={'center'}>
                            <Pagination count={data?.total_pages}
                                        page={data?.current_page}
                                        onChange={(_e, value) => fetchDataWithQuery(endpoints.user.getOrders, setData, value, 10)}/>
                        </Stack>
                    ) : null}
                </div>
                <div className={'w-[90%] h-full mt-4 flex flex-col justify-start item-center'}>
                    {data?.data ? (
                        data?.data.map((item, i: number) => (
                            <div key={i}
                                 className={`w-full h-fit flex flex-row justify-center items-start border-2 ${item.status === 'READ' ? `border-[rgb(var(--main-color))]` : `border-green-600`} p-2 rounded-lg my-2 shadow-sm ${item.status === 'READ' ? `shadow-gray-500` : `shadow-green-600`} relative`}
                            >
                                {item.status === 'READ' ? null : (
                                    <div className={'absolute -top-2 -right-2 bg-red-600 h-5 w-5 rounded-full'}></div>
                                )}
                                <div className={'w-[15%] flex flex-col justify-center items-start gap-2'}>
                                    {handleRenderType(item.type)}
                                </div>
                                <div className={'w-[85%] flex flex-col justify-center items-start gap-2'}
                                     onClick={() => handleOpenDetail(item.id)} style={{cursor: 'pointer'}}>
                                    <p><strong className={'text-[rgb(var(--main-color))]'}>{item.title}</strong>
                                    </p>
                                    <p className={'text-[rgb(var(--main-color))] text-sm italic'}>
                                        {formatedDate(item.createdAt, true)}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (<p className={'w-full text-center'}>Thông báo trống!</p>)}
                </div>
            </div>
            {openDetail && choose !== '' ? (
                <div className={'w-full h-full relative'}>
                    <UserNotifyDetail setOpen={setOpenDetail} id={choose}/>
                </div>
            ) : null}
        </>
    )
}

export default UserNotify