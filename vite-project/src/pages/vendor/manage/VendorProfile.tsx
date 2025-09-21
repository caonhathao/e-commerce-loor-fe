import {useEffect, useState} from "react";
import endpoints from "../../../services/endpoints.tsx";
import {fetchData, formatedDate} from "../../../utils/functions.utils.tsx";
import {BsListCheck, BsPencilSquare, BsQuestionCircle} from "react-icons/bs";
import UpdateProfile from "../../../components/forms/vendor/UpdateProfile.tsx";
import {useVendor} from "../../../context/VendorContext.tsx";
import UpdateImage from "../../../components/forms/vendor/UpdateImage.tsx";
import ChangePassword from "../../../components/forms/vendor/ChangePassword.tsx";

const VendorProfile = () => {
    const {vendor, setVendor} = useVendor()

    const [openUpdate, setOpenUpdate] = useState<boolean>(false)
    const [updateAvatar, setUpdateAvatar] = useState<boolean>(false)
    const [changePassword, setChangePassword] = useState<boolean>(false)
    const [updateSuccess, setUpdateSuccess] = useState<boolean>(false)

    useEffect(() => {
        if (updateSuccess) {
            fetchData(endpoints.brand.getBrandInfo, false, setVendor, 'Lấy dữ liệu thất bại!')
            setUpdateSuccess(false)
        }
    }, [updateSuccess])

    return (
        <div className={'w-full h-full flex flex-col justify-between items-center relative'}>
            <div className={'w-full flex flex-col justify-center items-center gap-4'}>
                <div className={'w-[90%] text-center flex flex-col justify-center items-center gap-2 mb-5'}>
                    <p className={'text-xl text-[rgb(var(--main-color))] font-bold border-b-2 border-[rgb(var(--border-color))]'}>
                        Thông tin nhà bán hàng
                    </p>
                    <p className={'italic text-sm'}><strong>Ngày
                        tạo: </strong>{vendor?.createdAt ? formatedDate(vendor?.createdAt) : `Không rõ`}</p>
                </div>

                <div
                    className={'w-[90%] flex flex-col justify-center items-start gap-2 my-5 border-2 border-[rgb(var(--border-color))] p-2 rounded-lg'}>
                    <div
                        className={'w-full flex flex-row justify-between items-center gap-2 border-b-2 border-[rgb(var(--border-color))] p-1'}>
                        <p className={'w-full text-lg text-[rgb(var(--main-color))] font-bold'}>
                            Thông tin chung
                        </p>
                        <button className={'bg-[rgb(var(--btn-primary-bg))] p-1 rounded-lg'}
                                onClick={() => setOpenUpdate(true)}>
                            <BsPencilSquare size={20} color={'white'}/>
                        </button>
                    </div>
                    <div>
                        <p><strong>Tên cửa hàng: </strong>{vendor?.name}</p>
                        <p>
                            <strong>Mô tả cửa
                                hàng: </strong>{vendor?.description === 'none' ? 'Chưa có mô tả' : vendor?.description}
                        </p>
                    </div>
                </div>

                <div
                    className={'w-[90%] flex flex-col justify-center items-start gap-2 my-5 border-2 border-[rgb(var(--border-color))] p-2 rounded-lg'}>
                    <div
                        className={'w-full flex flex-row justify-between items-center gap-2 border-b-2 border-[rgb(var(--border-color))] p-1'}>
                        <p className={'w-full text-lg text-[rgb(var(--main-color))] font-bold'}>
                            Thông tin liên hệ
                        </p>
                        <button className={'bg-[rgb(var(--btn-primary-bg))] p-1 rounded-lg'}
                                onClick={() => setOpenUpdate(true)}>
                            <BsPencilSquare size={20} color={'white'}/>
                        </button>
                    </div>
                    <div>
                        <p><strong>Email: </strong>{vendor?.email}</p>
                        <p><strong>SDT: </strong> {vendor?.numberphone}</p>
                    </div>
                </div>

                <div
                    className={'w-[90%] flex flex-col justify-center items-start gap-2 my-5 border-2 border-[rgb(var(--border-color))] p-2 rounded-lg'}>
                    <p className={'w-full text-lg text-[rgb(var(--main-color))] font-bold border-b-2 border-[rgb(var(--border-color))]'}>
                        Tình trạng tài khoản:
                    </p>
                    <div className={'w-full flex flex-row justify-between items-center gap-2'}>
                        <p><strong>Bị khóa: </strong></p>
                        <BsQuestionCircle size={20} color={'red'}/>
                    </div>
                    <div className={'w-full flex flex-row justify-between items-center gap-2'}>
                        <p><strong>Số cảnh báo: </strong>{0}</p>
                        <BsListCheck size={20} color={'red'}/>
                    </div>
                </div>

                <div className={'w-[90%] grid grid-cols-2 grid-rows-2 items-center gap-4 mt-3'}>
                    <button className={'border-2 border-[rgb(var(--main-color))] rounded-lg'}
                            onClick={() => setUpdateAvatar(true)}>Đổi ảnh đại diện
                    </button>
                    <button className={'border-2 border-green-600 rounded-lg'}
                            onClick={() => setChangePassword(true)}>Đổi mật khẩu
                    </button>
                </div>
            </div>
            <div className={'w-full h-fit grid grid-cols-3 grid-rows-1 items-center gap-4 my-10'}>
                <button className={'border-2 border-green-600 rounded-lg'}>Hỗ trợ</button>
                <button className={'border-2 border-amber-600 rounded-lg'}>Báo lỗi</button>
                <button className={'border-2 border-red-500 rounded-lg'}>Khiếu nại</button>
            </div>
            {openUpdate ? (
                <UpdateProfile setOpen={setOpenUpdate} setSuccess={setUpdateSuccess}/>
            ) : null}

            {updateAvatar ? (
                <UpdateImage setOpen={setUpdateAvatar} setSuccess={setUpdateSuccess}/>
            ) : null}

            {changePassword ? (
                <ChangePassword setOpen={setChangePassword} setSuccess={setUpdateSuccess}/>
            ) : null}
        </div>
    )
}
export default VendorProfile