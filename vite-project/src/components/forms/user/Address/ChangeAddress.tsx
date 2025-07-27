import {useUser} from "../../../../context/UserContext.tsx";
import {Field, Form, Formik} from "formik";
import {toast} from "react-toastify";
import React, {useEffect, useState} from "react";
import CreateAddress from "./CreateAddress.tsx";
import {fetchData} from "../../../../utils/functions.utils.tsx";
import endpoints from "../../../../services/endpoints.tsx";

interface CreateAddressProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrent: React.Dispatch<React.SetStateAction<{
        address: string,
        default: boolean
    }>>
}

const ChangeAddress: React.FC<CreateAddressProps> = ({setOpen, setCurrent}) => {
    const {user, setUser} = useUser();
    const [openUpdateAddress, setOpenUpdateAddress] = useState<boolean>(false)
    const [addressSuccess, setAddressSuccess] = useState<boolean>(false)

    useEffect(() => {
        if (addressSuccess) {
            try {
                fetchData(endpoints.user.getUserInfo, false, setUser, 'Lấy địa chỉ thất bại')
            } catch (e) {
                console.error(e)
                toast.error('Có lỗi xảy ra')
            }
        }
    }, [addressSuccess]);

    return (
        <div className={'w-full h-full fixed top-0 left-0 z-[999] flex flex-col justify-center items-center bg-white'}>
            <Formik initialValues={{
                id: '',
                is_default: false,
            }}
                    enableReinitialize={true}
                    validateOnBlur={true}
                    onSubmit={async (values) => {
                        try {
                            console.log(values);
                            if (values.id === '') return
                            const index = user?.shipping_address.findIndex(item => item.id === values.id)
                            if (index === -1) return
                            else {
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-expect-error
                                const payload = user?.shipping_address[index].address + ', ' + user?.shipping_address[index].ward + ', ' + user?.shipping_address[index].city;

                                setCurrent({
                                    address: payload,
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-expect-error
                                    default: values.is_default === false ? user?.shipping_address[index].is_default : values.is_default
                                })
                                setOpen(false);
                            }
                        } catch (e) {
                            console.error('Failed to create address', e);
                            toast.error('Error!');
                        }
                    }}>
                {({
                      handleChange,
                      handleSubmit,
                  }) => {
                    return (
                        <Form className={'w-full h-full p-2 flex flex-col justify-start items-center'}
                              onSubmit={handleSubmit}>
                            <p className={'w-full h-fit text-center font-bold text-2xl p-2 border-b-2 border-[rgb(var(--border-color))] mb-3 text-[rgb(var(--main-color))]'}>Chọn
                                địa chỉ mới</p>
                            {user?.shipping_address.map((value, index) => (
                                <div key={index}
                                     className={'w-full h-fit border-b-2 border-[rgb(var(--border-color))] p-2 flex flex-row justify-between items-center gap-2'}>
                                    <div className={'w-full h-fit flex flex-row justify-start items-center gap-2'}>
                                        <p>{index + 1}.</p>
                                        <p>{value.address}, {value.ward}, {value.city}
                                            {value?.is_default ?
                                                <strong className={'text-[rgb(var(--secondary-color))]'}> (Mặc
                                                    định)</strong> : null}
                                        </p>

                                    </div>
                                    <Field type={'radio'} className={'w-5 h-5'} id={value.id} name={'id'}
                                           value={value.id}
                                           onChange={handleChange}/>
                                </div>
                            ))}
                            <p className={'my-5 text-[rgb(var(--main-color))]'}
                               onClick={() => setOpenUpdateAddress(true)}>Thêm địa chỉ mới</p>
                            <div className={'w-full h-fit flex flex-row justify-start items-center gap-2 mt-3'}>
                                <Field type="checkbox" name={'is_default'} className="w-5 h-5" onChange={handleChange}/>
                                <p>Đặt làm mặc định</p>
                            </div>
                            <div className="w-full h-fit grid grid-cols-5 grid-rows-1 my-3">
                                <button type="button"
                                        className="col-start-2 col-end-3 border-2 border-[rgb(var(--border-color))] p-2 rounded-lg"
                                        onClick={() => setOpen(false)}>
                                    Hủy
                                </button>
                                <button type="submit"
                                        className="col-span-1 col-end-5 border-2 border-[rgb(var(--border-color))] p-2 rounded-lg bg-[rgb(var(--btn-primary-bg))] text-[rgb(var(--btn-primary-text))]"
                                >
                                    Xác nhận
                                </button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
            {openUpdateAddress ? (
                <CreateAddress setOpen={setOpenUpdateAddress} setSuccess={setAddressSuccess}/>
            ) : null}
        </div>
    )
}
export default ChangeAddress