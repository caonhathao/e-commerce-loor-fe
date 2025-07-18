import {useUser} from "../../../context/UserContext.tsx";
import {formatedDate} from "../../../utils/functions.utils.tsx";
import {BsPencilFill} from "react-icons/bs";
import {useState} from "react";
import CreateAddress from "../../../components/forms/CreateAddress.tsx";

const UserProfile = () => {
    const {user, setUser} = useUser()
    const [openCreateAddress, setOpenCreateAddress] = useState<boolean>(false)

    const handleRenderGender = (gender: string) => {
        if (gender === 'MALE') return "Nam"
        if (gender === 'FEMALE') return 'Nữ'
        return 'Không rõ'
    }
    return (<div className={'w-full h-full flex flex-col justify-start items-center'}>
        <div className={'w-full h-[300px]'}></div>
        <div className={'w-full h-fit p-2'}>
            <div
                className={'w-full h-fit p-2 flex flex-row justify-center items-center gap-2 border-2 border-[rgb(var(--main-color))] rounded-lg mb-3 relative'}>
                <button type={'button'}
                        className={'absolute -top-1 -right-1 bg-[rgb(var(--main-color))] p-1 text-white rounded-lg'}>
                    <BsPencilFill size={20}/>
                </button>
                <div
                    className={'w-[30%] h-full p-2 flex flex-col justify-center items-center gap-2 border-r-2 border-[rgb(var(--border-color))]'}>
                    <img src={user?.image_link} alt={'avatar'} className={'rounded-lg'}/>
                    <button type={'button'} className={'border-2 border-[rgb(var(--border-color))] rounded-lg p-2'}>Đổi
                        ảnh
                    </button>
                </div>
                <div className={'w-[70%] flex flex-col justify-start items-start'}>
                    <p className={'leading-8'}><strong>Tên tài khoản: </strong>{user?.account_name}</p>
                    <p className={'leading-8'}><strong>Tên người dùng: </strong>{user?.full_name ?? 'Không có'}</p>
                    <p className={'leading-8'}><strong>Ngày sinh: </strong>{formatedDate(user?.birthday) ?? 'Không có'}
                    </p>
                    <p className={'leading-8'}><strong>Giới tính: </strong>{handleRenderGender(user?.gender)}</p>
                </div>
            </div>
            <div
                className={'w-full h-fit p-2 flex flex-col justify-center items-start gap-2 border-2 border-[rgb(var(--main-color))] rounded-lg mb-3 relative'}>
                <button type={'button'}
                        className={'absolute -top-1 -right-1 bg-[rgb(var(--main-color))] p-1 text-white rounded-lg'}>
                    <BsPencilFill size={20}/>
                </button>
                <p className={'w-full h-fit text-center border-b-2 border-[rgb(var(--border-color))]'}><strong>Phương
                    thức liên
                    lạc</strong></p>
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
                {user?.shipping_address && user?.shipping_address.map((item, index) => (
                    <p>{index + 1}. {item.address}, {item.ward}, {item.city}</p>
                ))}
            </div>
        </div>
        {openCreateAddress ?
            <div className={` w-full h-full absolute top-0 left-0`}>
                <CreateAddress setOpen={setOpenCreateAddress}/>
            </div> : null}
    </div>)
}
export default UserProfile