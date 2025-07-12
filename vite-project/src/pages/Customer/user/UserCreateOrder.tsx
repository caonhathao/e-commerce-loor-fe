import React, {SetStateAction, useEffect, useState} from "react";
import apiClient from "../../../services/apiClient.tsx";
import endpoints from "../../../services/endpoints.tsx";
import JWTDecode from "../../../security/JWTDecode.tsx";
import {getAccessToken} from "../../../services/tokenStore.tsx";
import {io} from "socket.io-client";
import Loading from "../../../components/loading/Loading.tsx";
import {toast} from "react-toastify";
import {addressType, listVariantsType} from "../../../utils/data-types.tsx";
import {BsCaretRightFill, BsHouse, BsX} from "react-icons/bs";
import {fetchData, formatedNumber} from "../../../utils/functions.utils.tsx";
import {useUser} from "../../../context/UserContext.tsx";
import CreateAddress from "../../../components/forms/CreateAddress.tsx";

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
    const {user} = useUser();

    const [dataAddress, setDataAddress] = useState<addressType[]>([])
    const [addressSuccess, setAddressSuccess] = useState<boolean>(false)

    const [openUpdateAddress, setOpenUpdateAddress] = useState<boolean>(false)

    const handleSubmit = async () => {
        try {
            setIsSubmitted(true)
            const response = await apiClient.post(endpoints.user.createOrder, listVariant);
            if (response && response.status === 200) {
                setIsSubmitted(false)
                toast.success(response.data.message)
            }
        } catch (err) {
            console.error(err)
            toast.error('Khởi tạo thât bại.')
        }
    }

    useEffect(() => {
        const decoded = JWTDecode(getAccessToken())
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        if (decoded && decoded.id !== null) {
            socket.on('connect', () => {
                console.log("Connected to server", socket.id);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                socket.emit('register_user', decoded.id)
            })
        }
    }, []);

    useEffect(() => {
        if (addressSuccess)
            fetchData(endpoints.user.getAllAddress, true, setDataAddress, 'Có lỗi xảy ra!', 'Lấy dữ liệu thành công');
    }, [addressSuccess]);

    socket.on("checking order", (data) => {
        console.log("🛒", data.message);
    });

    socket.on("creating new order", (data) => {
        console.log("📦", data.message);
    });

    socket.on("storing order", (data) => {
        console.log("💾", data.message);
    });

    socket.on("order status", (data) => {
        console.log("✅", data.message);
    });

    useEffect(() => {
        console.log(listVariant)
    }, [listVariant]);

    if (isSubmitted) {
        return <Loading/>
    }

    if (listVariant === undefined) return <Loading/>

    return (
        <div
            className={'w-screen h-screen absolute top-0 right-0 bg-[rgb(var(--secondary-background))] flex justify-center items-center'}>
            <div className={'w-full h-full flex flex-col justify-start items-center gap-2'}>
                <div className={'w-full h-fit grid grid-cols-7 grid-rows-1 gap-2 items-center p-2 bg-white'}>
                    <p className={'col-span-1 text-center'}>Tất cả (2)</p>
                    <p className={'col-span-5 text-center'}><strong className={'text-2xl'}>Thông tin đơn hàng</strong>
                    </p>
                    <button type={'button'}
                            className={'w-10 h-10 rounded-lg flex justify-center items-center text-white text-lg bg-red-500 col-span-1'}
                            onClick={() => setOpenCreate(false)}><BsX size={40}/>
                    </button>
                </div>
                <div className={'w-full h-fit my-2 p-2 bg-white'}>
                    <div
                        className={'border-2 border-[rgb(var(--border-color))] rounded-lg flex flex-col justify-center items-start'}>
                        <p className={'text-lg font-bold text-[rgb(var(--main-color))] px-2 py-1'}>Địa chỉ giao hàng</p>
                        <div className={'w-full h-fit flex flex-row justify-between items-center gap-2 p-2'}>
                            {user?.shipping_address.length !== 0 ? (
                                <div className="w-full h-fit flex flex-row justify-between items-center gap-4 py-1">
                                    <p className="text-lg">
                                        {user?.shipping_address[0].address}, {user?.shipping_address[0].ward}, {user?.shipping_address[0].city} <strong className="text-[rgb(var(--secondary-color))]">Mặc định</strong>
                                    </p>
                                </div>
                            ) : (
                                dataAddress.length !== 0 ? (
                                    <div className="w-full h-fit flex flex-row justify-between items-center px-2 py-1">
                                        <p className="text-lg">
                                            {dataAddress[0].address}, {dataAddress[0].ward}, {dataAddress[0].city}
                                        </p>
                                        <p className="text-[rgb(var(--secondary-color))]">(Mặc định)</p>
                                    </div>
                                ) : (
                                    <div className="w-full h-fit flex flex-row justify-between items-center px-2 py-1">
                                        <p className="italic">Bạn chưa có địa chỉ giao hàng nào</p>
                                        <p className="text-[rgb(var(--main-color))]" onClick={() => setOpenUpdateAddress(true)}>
                                            Thêm địa chỉ
                                        </p>
                                    </div>
                                )
                            )}
                            <div className={'w-fit h-fit p-2 text-[rgb(var(--main-color))]'}>Đổi</div>
                        </div>
                    </div>
                    <div
                        className={'border-2 border-[rgb(var(--border-color))] rounded-lg flex flex-col justify-center items-start'}>
                        <p className={'text-lg font-bold text-[rgb(var(--main-color))] px-2 py-1'}>Số liên lạc</p>
                        {user?.numberphone !== '' && user?.numberphone !== null ? (
                            <div></div>
                        ) : (
                            <div className={'w-full h-fit flex flex-row justify-between items-center px-2 py-1'}>
                                <p className={'italic'}>Bạn chưa có số điện thoại</p>
                                <p className={'text-[rgb(var(--main-color))]'}
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
                                    className={'w-full h-fit flex flex-row justify-start items-center items-center gap-2 my-5 px-2'}>
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
                                                    <p>{variant.variant_name}</p>
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
                                <div className={'w-full h-fit flex flex-row justify-between items-center my-5 px-2'}>
                                    <p>Tùy chọn giao hàng</p>
                                    <div className={'w-fit h-fit flex flex-row justify-center items-center gap-2'}>
                                        <p className={'text-[rgb(var(--secondary-color))]'}>Xem tất cả tùy chọn </p>
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
            {openUpdateAddress ? (
                <CreateAddress setOpen={setOpenUpdateAddress} setSuccess={setAddressSuccess}/>
            ) : null}
        </div>
    )
}

export default UserCreateOrder