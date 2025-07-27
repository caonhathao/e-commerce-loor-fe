import {deleteData, fetchData, fetchDataWithQuery, formatedDate, postData} from "../../../utils/functions.utils.tsx";
import endpoints from "../../../services/endpoints.tsx";
import React, {useEffect, useState} from "react";
import {Pagination, Stack} from "@mui/material";
import {notificationType} from "../../../utils/user.data-types.tsx";
import {BsAppIndicator, BsBan, BsBell, BsCheckCircle, BsExclamationCircleFill, BsFunnel, BsSlash} from "react-icons/bs";
import Loading from "../../../components/loading/Loading.tsx";
import UserNotifyDetail from "../../../components/user/UserNotifyDetail.tsx";
import {toast} from "react-toastify";
import {useUser} from "../../../context/UserContext.tsx";

const UserNotify = () => {
    const [data, setData] = useState<notificationType | null | undefined>();
    const [openDetail, setOpenDetail] = useState<boolean>(false);
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [removeList, setRemoveList] = useState<string[]>([]);
    const [choose, setChoose] = useState<string>('');
    const {user, setUser} = useUser();

    useEffect(() => {
        const fetch = async () => {
            await fetchDataWithQuery(endpoints.user.getAllNotifications, setData, 1, 10,)
            await fetchData(endpoints.user.getUserInfo, false, setUser)
        }
        fetch()
    }, [])

    const handleRenderType = (type: string) => {
        if (type === 'SUCCESS') {
            return <BsCheckCircle size={20} color={'green'}/>
        }
        if (type === 'WARNING') {
            return <BsExclamationCircleFill size={20} color={'yellow'}/>
        }
        if (type === 'ERROR') {
            return <BsSlash size={20} color={'red'}/>
        }
        if (type === 'BAN') {
            return <BsBan size={20} color={'red'}/>
        }
        if (type === 'ADS') {
            return <BsBell size={20} color={'red'}/>
        }
        if (type === 'NOTICE') {
            return <BsAppIndicator size={20} color={'blue'}/>
        }
    }

    const handleOpenDetail = (id: string) => {
        setChoose(id)
        setOpenDetail(true)
    }

    const handleFilterByType = (type: string[]) => {
        postData(endpoints.user.getNotificationByType, true, {type}, setData).then((data) => setData(data))
        setOpenMenu(false)
    }

    const handleChoose = (id: string) => {
        setRemoveList((prevState) => {
            if (prevState.includes(id)) {
                return prevState.filter((item) => item !== id)
            } else {
                return [...prevState, id]
            }
        })
    }

    const handleRemove = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (removeList.length === 0) {
            return;
        }

        try {
            if (removeList.length === 1) {
                await deleteData(endpoints.user.deleteNotification, removeList);
                await fetchData(endpoints.user.getUserInfo, false, setUser)
            } else {
                await deleteData(endpoints.user.deleteNotifications, removeList);
                await fetchData(endpoints.user.getUserInfo, false, setUser)
            }

            setRemoveList([]);
        } catch (error) {
            console.error(error);
            toast.error("Xóa thất bại!");
        }
    };

    const handleRemoveAll = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (user?.notify_count === 0) {
            return;
        }

        await deleteData(endpoints.user.deleteAllNotifications)
        await fetchData(endpoints.user.getUserInfo, false, setUser)
        setData(undefined)
    }

    if (data === null) return (<Loading/>)

    return (
        <>
            <div className={'w-full h-full p-2 absolute top-75'}>
                <div className={'w-full grid grid-cols-3 grid-rows-1 items-center gap-4'}>
                    <div className={'w-full h-fit'}>
                        <button className={'p-2 border-2 border-[rgb(var(--main-color))] rounded-lg'}
                                onClick={() => setOpenMenu(!openMenu)}>
                            <BsFunnel size={20}/>
                        </button>
                        <div
                            className={`w-full absolute left-0 z-50 bg-white p-2 border-b-2 border-[rgb(var(--border-color))] rounded-b-lg shadow shadow-gray-500 grid-cols-3 grid-rows-2 gap-4 items-center mb-5 ${openMenu ? `grid` : `hidden`}`}>
                            <button className={'border-2 border-green-500 p-2 rounded-lg text-green-500'}
                                    onClick={() => handleFilterByType(['NOTICE', 'SUCCESS'])}>Thông báo
                            </button>
                            <button className={'border-2 border-amber-500 p-2 rounded-lg text-amber-500'}
                                    onClick={() => handleFilterByType(['WARNING', 'BAN'])}>Cảnh báo
                            </button>
                            <button className={'border-2 border-red-500 p-2 rounded-lg text-red-500'}
                                    onClick={() => handleFilterByType(['ERROR'])}>Lỗi
                            </button>
                            <button className={'border-2 border-amber-900 p-2 rounded-lg text-amber-900'}
                                    onClick={() => handleFilterByType(['ADS'])}>Khác
                            </button>
                            <button className={'border-2 border-gray-500 p-2 rounded-lg text-gray-500'}
                                    onClick={(event) => handleRemove(event)}>Xóa
                            </button>
                            <button className={'border-2 border-gray-500 p-2 rounded-lg text-gray-500'}
                                    onClick={(event) => handleRemoveAll(event)}>Xóa tất cả
                            </button>
                        </div>
                    </div>
                    {data !== null && data !== undefined ? (
                        <Stack spacing={2} alignItems={'center'}>
                            <Pagination count={data?.total_pages}
                                        page={data?.current_page}
                                        onChange={(_e, value) => fetchDataWithQuery(endpoints.user.getOrders, setData, value, 10)}/>
                        </Stack>
                    ) : null}
                </div>
                <div className={'w-full h-full mt-4 flex flex-col justify-start item-center'}>
                    {data?.data ? (
                        data?.data.map((item, i: number) => (
                            <div key={i}
                                 className={`w-full h-fit flex flex-row justify-center items-start border-2 ${item.status === 'READ' ? `border-[rgb(var(--main-color))]` : `border-green-600`} p-2 rounded-lg my-2 shadow-lg ${item.status === 'READ' ? `shadow-gray-500` : `shadow-green-600`}`}
                            >
                                <div className={'w-[85%] flex flex-col justify-center items-start gap-2'}
                                     onClick={() => handleOpenDetail(item.id)} style={{cursor: 'pointer'}}>
                                    <p><strong className={'text-[rgb(var(--secondary-color))]'}>{item.title}</strong>
                                    </p>
                                    <p className={'text-[rgb(var(--main-color))] text-sm italic'}>
                                        {formatedDate(item.createdAt, true)}
                                    </p>
                                </div>
                                <div className={'w-[15%] flex flex-col justify-center items-end gap-2'}>
                                    {handleRenderType(item.type)}
                                    <input type={'checkbox'} className={'w-5 h-5'}
                                           onChange={() => handleChoose(item.id)}/>
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