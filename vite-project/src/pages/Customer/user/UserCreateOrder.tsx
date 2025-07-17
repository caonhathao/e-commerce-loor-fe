import React, {SetStateAction, useEffect, useState} from "react";
import apiClient from "../../../services/apiClient.tsx";
import endpoints from "../../../services/endpoints.tsx";
import JWTDecode from "../../../security/JWTDecode.tsx";
import {getAccessToken} from "../../../services/tokenStore.tsx";
import {io} from "socket.io-client";
import Loading from "../../../components/loading/Loading.tsx";
import {toast, ToastContainer} from "react-toastify";
import {addressType, listVariantsType} from "../../../utils/data-types.tsx";
import {BsCaretRightFill, BsHouse, BsX} from "react-icons/bs";
import {fetchData, formatedNumber} from "../../../utils/functions.utils.tsx";
import {useUser} from "../../../context/UserContext.tsx";
import CreateAddress from "../../../components/forms/CreateAddress.tsx";
import CreatePhone from "../../../components/forms/CreatePhone.tsx";
import ChangeAddress from "../../../components/forms/ChangeAddress.tsx";

const socket = io(endpoints.system.socketConnection, {
    withCredentials: true,
    transports: ['websocket', 'polling'],
});

interface Props {
    listVariant: listVariantsType | undefined,
    setOpenCreate: React.Dispatch<SetStateAction<boolean>>,
}

const UserCreateOrder: React.FC<Props> = ({listVariant, setOpenCreate}) => {
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

    const {user, setUser} = useUser();

    const [dataAddress, setDataAddress] = useState<addressType[]>([])
    const [addressSuccess, setAddressSuccess] = useState<boolean>(false)
    const [phoneSuccess, setPhoneSuccess] = useState<boolean>(false)

    const [openUpdateAddress, setOpenUpdateAddress] = useState<boolean>(false)
    const [openChangeAddress, setOpenChangeAddress] = useState<boolean>(false)
    const [openUpdatePhone, setOpenUpdatePhone] = useState<boolean>(false)

    const [currentAddress, setCurrentAddress] = useState<{
        address: string,
        default: boolean
    }>({
        address: '',
        default: false,
    })

    const handleSubmit = async () => {
        if (user?.numberphone === null) {
            toast.error('Vui lòng thêm số điện thoại!');
            return;
        }
        if (user?.shipping_address === null) {
            toast.error('Vui lòng thêm địa chỉ giao hàng!');
            return;
        }

        try {
            setIsSubmitted(true)

            const payload = {
                address: currentAddress.address === '' ? user?.shipping_address[0].address + ', ' + user?.shipping_address[0].ward + ' ,' + user?.shipping_address[0].city : currentAddress.address,
                method: 'COD',
                shipping_type: 'GIAO_HANG_NHANH'
            }

            console.log(payload)
            const fullPayload = {
                ...payload,
                list: listVariant.list
            }

            const response = await apiClient.post(endpoints.user.createOrder, fullPayload);
            if (response && response.status === 200) {
                setIsSubmitted(false)
                toast.success(response.data.message, {
                    autoClose: 1000,
                    onClose: () => {
                        fetchData(endpoints.user.getUserInfo, true, setUser, 'Cập nhật thất bại')
                        setOpenCreate(false)
                    }
                });
            }
        } catch (err) {
            console.error(err)
            toast.error('Khởi tạo thât bại.')
        }
    }

    //socket messages
    useEffect(() => {
        const decoded = JWTDecode(getAccessToken());
        if (decoded?.id) {
            socket.emit('register_user', decoded.id);
        }

        // Đăng ký 1 lần duy nhất
        const handleCheck = (data: any) => console.log("🛒", data.message);
        const handleCreate = (data: any) => console.log("📦", data.message);
        const handleStore = (data: any) => console.log("💾", data.message);

        socket.off('checking_order').on('checking_order', handleCheck);
        socket.off('creating_new_order').on('creating_new_order', handleCreate);
        socket.off('storing_order').on('storing_order', handleStore);

        return () => {
            socket.off('checking_order', handleCheck);
            socket.off('creating_new_order', handleCreate);
            socket.off('storing_order', handleStore);
        };
    }, []);

    //get address data on first load
    useEffect(() => {
        fetchData(endpoints.user.getAllAddress, true, setDataAddress, 'Có lỗi xảy ra!');
    }, []);

    useEffect(() => {
        console.log(listVariant)
    }, [listVariant]);

    //update address data
    useEffect(() => {
            if (addressSuccess) {
                try {
                    fetchData(endpoints.user.getUserInfo, true, setUser, 'Lấy địa chỉ thất bại')
                    setCurrentAddress({
                        address: user?.shipping_address[0].address + ', ' + user?.shipping_address[0].ward + ' ,' + user?.shipping_address[0].city,
                        default: user?.shipping_address[0].is_default ?? false
                    })
                } catch
                    (e) {
                    console.error(e)
                    toast.error('Có lỗi xảy ra')
                }
            }
        }
        ,
        [addressSuccess]
    )

    if (isSubmitted) {
        return <Loading/>
    }

    if (listVariant === undefined) return <Loading/>

    return (
        <>
            <div
                className={'w-screen h-screen absolute top-0 right-0 bg-[rgb(var(--secondary-background))] flex flex-col justify-center items-center'}>
                <div className={'w-full h-full flex flex-col justify-start items-center gap-2'}>
                    <div className={'w-full h-fit grid grid-cols-7 grid-rows-1 gap-2 items-center p-2 bg-white'}>
                        <p className={'col-span-1 text-center'}>Tất cả (2)</p>
                        <p className={'col-span-5 text-center'}><strong className={'text-2xl'}>Thông tin đơn
                            hàng</strong>
                        </p>
                        <button type={'button'}
                                className={'w-10 h-10 rounded-lg flex justify-center items-center text-white text-lg bg-red-500 col-span-1'}
                                onClick={() => setOpenCreate(false)}><BsX size={40}/>
                        </button>
                    </div>
                    <div className={'w-full h-fit my-2 p-2 bg-white'}>
                        <div
                            className={'border-2 border-[rgb(var(--border-color))] rounded-lg flex flex-col justify-center items-start mb-5'}>
                            <p className={'text-lg font-bold text-[rgb(var(--main-color))] px-2 py-1'}>Địa chỉ giao
                                hàng</p>
                            <div className={'w-full h-fit flex flex-row justify-between items-center gap-2 p-2'}>
                                {user?.shipping_address.length !== 0 ? (
                                    <div
                                        className={'w-full h-fit flex flex-row justify-between items-center gap-4 py-1'}>
                                        <div
                                            className="w-full h-fit flex flex-row justify-between items-center gap-4 py-1">
                                            <p className="text-lg">
                                                {currentAddress.address === '' ? user?.shipping_address[0].address + ', ' + user?.shipping_address[0].ward + ' ,' + user?.shipping_address[0].city : currentAddress.address}
                                                {currentAddress.default || (currentAddress.address === '' && user?.shipping_address[0].is_default) ?
                                                    <strong className="text-[rgb(var(--secondary-color))]">
                                                        (Mặc định)
                                                    </strong> : null}
                                            </p>
                                        </div>
                                        <div className={'w-fit h-fit p-2 text-[rgb(var(--main-color))]'}
                                             onClick={() => setOpenChangeAddress(true)}>Đổi
                                        </div>
                                    </div>
                                ) : (
                                    dataAddress.length !== 0 ? (
                                        <div
                                            className="w-full h-fit flex flex-row justify-between items-center px-2 py-1">
                                            <p className="text-lg">
                                                {dataAddress[0].address}, {dataAddress[0].ward}, {dataAddress[0].city}
                                                <strong className="text-[rgb(var(--secondary-color))]">(Mặc
                                                    định)</strong>
                                            </p>
                                            <div className={'w-fit h-fit p-2 text-[rgb(var(--main-color))]'}
                                            >Đổi
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            className="w-full h-fit flex flex-row justify-between items-center px-2 py-1">
                                            <p className="italic">Bạn chưa có địa chỉ giao hàng nào</p>
                                            <p className="text-[rgb(var(--main-color))]"
                                               onClick={() => setOpenUpdateAddress(true)}>
                                                Thêm địa chỉ
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                        <div
                            className={'border-2 border-[rgb(var(--border-color))] rounded-lg flex flex-col justify-center items-start'}>
                            <p className={'text-lg font-bold text-[rgb(var(--main-color))] px-2 py-1'}>Số liên
                                lạc</p>
                            {user?.numberphone !== '' && user?.numberphone !== null ? (
                                <div
                                    className="w-full h-fit flex flex-row justify-between items-center px-2 py-1">
                                    <p className="text-lg">
                                        {user?.numberphone}
                                    </p>
                                    <p className="text-[rgb(var(--secondary-color))]">(Mặc định)</p>
                                </div>
                            ) : (
                                <div
                                    className={'w-full h-fit flex flex-row justify-between items-center px-2 py-1'}>
                                    <p className={'italic'}>Bạn chưa có số điện thoại</p>
                                    <p className={'text-[rgb(var(--main-color))]'}
                                       onClick={() => setOpenUpdatePhone(true)}
                                    >
                                        Thêm số điện thoại
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={'w-full h-full flex flex-col justify-start items-center my-2'}>
                        {listVariant.list.map((item, index) => {
                            return (
                                <div key={index}
                                     className={'w-full h-fit bg-white flex flex-col justify-center items-center'}>
                                    <div
                                        className={'w-full h-fit flex flex-row justify-start items-center gap-2 my-5 px-2'}>
                                        <p className={'col-span-1 text-center'}>
                                            <BsHouse size={20} className={'text-[rgb(var(--text-color))]'}/>
                                        </p>
                                        <p className={'col-span-5 text-center'}><strong
                                            className={'text-lg'}>{item.brand_name}</strong></p>
                                        <div className={'w-full border-1 border-[rgb(var(--border-color))]'}></div>
                                    </div>
                                    {item.list.map((variant, index) => {
                                        return (
                                            <div key={index}
                                                 className={'w-full h-fit p-4'}>
                                                <div
                                                    className={'w-full h-fit flex flex-row justify-center items-start gap-2'}>
                                                    <img src={variant.image_link} alt={'thumbnail'}
                                                         className={'w-30 rounded-lg'}/>
                                                    <div
                                                        className={'w-full h-full flex flex-col justify-between items-start gap-2'}>
                                                        <p><strong>{variant.variant_name}</strong></p>
                                                        <div
                                                            className={'w-full h-fit flex flex-row justify-between items-center'}>
                                                            <p>{formatedNumber(variant.cost / variant.amount)} đ</p>
                                                            <p>Số lượng: {variant.amount}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    <div
                                        className={'w-full h-fit flex flex-row justify-between items-center my-5 px-2'}>
                                        <p>Tùy chọn thanh toán</p>
                                        <div
                                            className={'w-fit h-fit flex flex-row justify-center items-center gap-2'}>
                                            <p className={'text-[rgb(var(--secondary-color))]'}>Xem tất cả tùy
                                                chọn </p>
                                            <BsCaretRightFill/>
                                        </div>
                                    </div>
                                    <div
                                        className={'w-full h-fit flex flex-row justify-between items-center my-5 px-2'}>
                                        <p>Tùy chọn giao hàng</p>
                                        <div
                                            className={'w-fit h-fit flex flex-row justify-center items-center gap-2'}>
                                            <p className={'text-[rgb(var(--secondary-color))]'}>Xem tất cả tùy
                                                chọn </p>
                                            <BsCaretRightFill/>
                                        </div>
                                    </div>
                                    <div
                                        className={'w-[90%] h-fit p-2 m-2 rounded-lg border-2 border-[rgb(var(--border-color))]'}>
                                        <div className={'w-full h-fit flex flex-row justify-between items-center'}>
                                            <p>Giao tiêu chuẩn</p>
                                            <p>{formatedNumber(item.fee)} đ</p>
                                        </div>
                                        <div>
                                            <p><strong>Lưu ý:</strong> Có thể nhận hàng vào cuối tuần</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div
                    className={'w-full h-fit absolute bottom-0 flex flex-col justify-center items-center bg-white p-2 rounded-t-lg border-t-2 border-[rgb(var(--main-color))]'}>
                    <p className={'text-sm italic text-[rgb(var(--text-error))]'}>{user?.numberphone === null ? 'Ban chưa có số điện thoại' : null}</p>
                    <p className={'text-sm italic text-[rgb(var(--text-error))]'}>{user?.shipping_address && user.shipping_address.length === 0 ? 'Bạn chưa có địa chỉ giao hàng' : null}</p>
                    <div className={'w-full h-fit flex flex-row justify-between items-center gap-2 p-2'}>
                        <div>
                            Tổng hóa đơn: <strong className={'text-[rgb(var(--main-color))]'}>{1}</strong>
                        </div>
                        <div>
                            <button type={'button'}
                                    className={'border-none bg-[rgb(var(--main-color))] px-3 py-2 text-white  rounded-lg'}
                                    onClick={() => handleSubmit()}>
                                Đặt hàng
                            </button>
                        </div>
                    </div>
                </div>
                {openUpdateAddress ? (
                    <CreateAddress setOpen={setOpenUpdateAddress} setSuccess={setAddressSuccess}/>
                ) : null}
                {openUpdatePhone ? (
                    <CreatePhone setOpen={setOpenUpdatePhone} setSuccess={setPhoneSuccess}/>
                ) : null}
                {openChangeAddress ? (
                    <ChangeAddress setOpen={setOpenChangeAddress} setCurrent={setCurrentAddress}/>
                ) : null}
            </div>
            <ToastContainer/>
        </>
    )
}

export default UserCreateOrder