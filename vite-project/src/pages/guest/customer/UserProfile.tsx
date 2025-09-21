import {useUser} from "../../../context/UserContext.tsx";
import {fetchData, formatedDate} from "../../../utils/functions.utils.tsx";
import {BsCheck2Circle, BsPencilFill} from "react-icons/bs";
import {useEffect, useState} from "react";
import endpoints from "../../../services/endpoints.tsx";
import UpdateAddress from "../../../components/forms/user/Address/UpdateAddress.tsx";
import Loading from "../../../components/loading/Loading.tsx";
import UpdateProfile from "../../../components/forms/user/UpdateProfile.tsx";
import UpdateImage from "../../../components/forms/user/UpdateImage.tsx";

const UserProfile = () => {
    const {user, setUser} = useUser()
    const [openCreateAddress, setOpenCreateAddress] = useState<boolean>(false)
    const [openUpdateInfo, setOpenUpdateInfo] = useState<boolean>(false)
    const [openUpdateImg, setOpenUpdateImg] = useState<boolean>(false)

    const [success, setSuccess] = useState<boolean>(false)

    const handleRenderGender = (gender: "" | undefined) => {
        if (gender && gender === 'MALE') return "Nam"
        if (gender && gender === 'FEMALE') return 'Nữ'
        return 'Không rõ'
    }

    useEffect(() => {
        if (success) {
            fetchData(endpoints.user.getUserInfo, false, setUser);
            setSuccess(false)
        }
    }, [success]);

    if (user === null) return <Loading/>

    return (<div className={'w-full h-full flex flex-col justify-start items-center'}>
        <div className={'w-full h-full p-2 flex flex-col justify-between items-center gap-4'}>
            <div className={'w-full text-center flex flex-col justify-between items-center gap-2 mb-5'}>
                <div
                    className={'w-full h-fit p-2 flex flex-row justify-center items-center gap-2 border-2 border-[rgb(var(--main-color))] rounded-lg mb-3 relative'}>
                    <button type={'button'}
                            className={'absolute -top-1 -right-1 bg-[rgb(var(--main-color))] p-1 text-white rounded-lg'}
                            onClick={() => setOpenUpdateInfo(true)}>
                        <BsPencilFill size={20}/>
                    </button>
                    <div
                        className={'w-[30%] h-full p-2 flex flex-col justify-center items-center gap-2 border-r-2 border-[rgb(var(--border-color))]'}>
                        <img src={user?.image_link} alt={'avatar'} className={'rounded-lg'}/>
                        <button type={'button'} className={'border-2 border-[rgb(var(--border-color))] rounded-lg p-2'}
                                onClick={() => setOpenUpdateImg(true)}>
                            Đổi ảnh
                        </button>
                    </div>
                    <div className={'w-[70%] flex flex-col justify-start items-start'}>
                        <p className={'leading-8'}><strong>Tên tài khoản: </strong>{user?.account_name}</p>
                        <p className={'leading-8'}><strong>Tên người dùng: </strong>{user?.full_name ?? 'Không có'}</p>
                        <p className={'leading-8'}><strong>Ngày
                            sinh: </strong>{formatedDate(user?.birthday) ?? 'Không có'}
                        </p>
                        <p className={'leading-8'}><strong>Giới tính: </strong>{handleRenderGender(user?.gender)}</p>
                    </div>
                </div>
                <div
                    className={'w-full h-fit p-2 flex flex-col justify-center items-start gap-2 border-2 border-[rgb(var(--main-color))] rounded-lg mb-3 relative'}>
                    <p className={'w-full h-fit text-center border-b-2 border-[rgb(var(--border-color))]'}><strong>
                        Phương thức liên lạc</strong></p>
                    <p><strong>Số điện thoại:</strong> {user?.numberphone ?? 'Không có'}</p>
                    <p><strong>Địa chỉ email:</strong> {user?.email}</p>
                </div>
                <div
                    className={'w-full h-fit p-2 flex flex-col justify-center items-start gap-2 border-2 border-[rgb(var(--main-color))] rounded-lg mb-3 relative'}>
                    <button type={'button'}
                            className={'absolute -top-1 -right-1 bg-[rgb(var(--main-color))] p-1 text-white rounded-lg'}
                            onClick={() => setOpenCreateAddress(true)}>
                        <BsPencilFill size={20}/>
                    </button>
                    <p className={'w-full h-fit text-center border-b-2 border-[rgb(var(--border-color))]'}>
                        <strong>Địa chỉ giao hàng</strong>
                    </p>
                    <div className={'w-full h-fit'}>
                        {user?.ShippingAddress && user?.ShippingAddress.map((item, index) => (
                            <div className={' grid grid-cols-8 gap-1 items-center my-1'}>
                                <p className={'col-span-7'}>
                                    <strong>{index + 1}.</strong> {item.address}, {item.ward}, {item.city}</p>
                                <p>{item.is_default ? <BsCheck2Circle size={20} color={'green'}/> : null}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={'w-[80%] grid grid-cols-2 items-center p-2 gap-4 mb-5'}>
                    <button type={'button'} className={'border-2 border-red-500 p-2 rounded-lg'}>Xóa tài khoản</button>
                    <button type={'button'} className={'border-2 border-green-600 rounded-lg p-2'}>Đổi mật khẩu</button>
                </div>
            </div>
            <div className={'w-[80%] grid grid-cols-2 items-center p-2 gap-4 mt-5'}>
                <button type={'button'} className={'border-2 border-amber-400 rounded-lg p-2'}>Hỗ trợ</button>
                <button type={'button'} className={'border-2 border-blue-500 p-2 rounded-lg'}>Góp ý</button>
            </div>
        </div>
        {openCreateAddress ?
            <div className={` w-full h-full absolute top-0 left-0`}>
                <UpdateAddress setOpen={setOpenCreateAddress} setSuccess={setSuccess}/>
            </div> : null}
        {openUpdateInfo ?
            <div className={` w-full h-full absolute top-0 left-0`}>
                <UpdateProfile setOpen={setOpenUpdateInfo} setSuccess={setSuccess}/>
            </div> : null}
        {openUpdateImg ?
            <div>
                <UpdateImage setOpen={setOpenUpdateImg} setSuccess={setSuccess}/>
            </div> : null
        }
    </div>)
}
export default UserProfile