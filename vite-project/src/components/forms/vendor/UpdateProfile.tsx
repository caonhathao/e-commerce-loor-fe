import React, {SetStateAction} from "react";
import {Field, Form, Formik} from "formik";
import {useVendor} from "../../../context/VendorContext.tsx";
import * as Yup from "yup";
import {BsXSquare} from "react-icons/bs";
import Loading from "../../loading/Loading.tsx";
import endpoints from "../../../services/endpoints.tsx";
import {toast} from "react-toastify";
import apiClient from "../../../services/apiClient.tsx";

interface UpdateProfileProps {
    setOpen: React.Dispatch<SetStateAction<boolean>>
    setSuccess: React.Dispatch<SetStateAction<boolean>>
}

const UpdateProfile: React.FC<UpdateProfileProps> = ({setOpen, setSuccess}) => {
    const {vendor,} = useVendor();

    if (!vendor) return <Loading/>

    return (
        <div className={'w-full h-full absolute bg-white p-2 m-2'}>
            <button className={'absolute top-0 right-0 bg-red-600 p-2 rounded-lg'} onClick={() => setOpen(false)}>
                <BsXSquare size={20} color={'white'}/></button>
            <p className={'w-full text-center text-[rgb(var(--main-color))] font-bold text-xl p-2 my-3 border-b-2 border-[rgb(var(--border-color))]'}>
                Cập nhật thông tin cửa hàng
            </p>
            <Formik initialValues={{
                name: vendor?.name ?? '',
                description: vendor?.description ?? '',
                email: vendor?.email ?? '',
                numberphone: vendor?.numberphone ?? '',
            }}
                    enableReinitialize={true}
                    validateOnBlur={true}
                    validationSchema={Yup.object({
                        name: Yup.string().required('Tên không được bỏ trống!').trim().min(6, 'Ít nhất 6 kí tự'),
                        description: Yup.string().required('Mô tả không được bỏ trống!').trim(),
                        email: Yup.string().required('Email không được bỏ trống!').trim(),
                        numberphone: Yup.string()
                            .required('Không để trống số điện thoại')
                            .matches(/^[0-9]+$/, 'Chỉ được nhập số')
                            .length(10, 'Số điện thoại phải đủ 10 chữ số'),
                    })}
                    onSubmit={async (values) => {
                        try {
                            const response = await apiClient.put(endpoints.brand.updateBrandInfo, values);
                            if (response.status === 200) {
                                toast.success('Cập nhật thành công', {autoClose: 1000})
                                setTimeout(() => {
                                    setOpen(false);
                                    setSuccess(true);
                                }, 1200)
                            } else {
                                console.error(response.data.message);
                            }
                        } catch (e) {
                            console.error('Failed to create address', e);
                            toast.error('Cập nhật thất bại');
                        }
                    }
                    }>
                {({
                      values,
                      errors,
                      touched,
                      resetForm,
                      handleChange,
                      handleBlur,
                      handleSubmit
                  }) => {
                    return (
                        <Form
                            className={'p-2 border-2 border-[rgb(var(--border-color))] rounded-lg'}
                            onSubmit={handleSubmit}>
                            <fieldset
                                className="w-full my-2 h-fit border-2 border-[rgb(var(--border-color))] rounded-lg">
                                <legend><strong>Tên cửa hàng</strong></legend>
                                <Field type="text"
                                       name="name"
                                       className="w-full h-fit rounded-lg p-2"
                                       values={values.name}
                                       onChange={handleChange}
                                       onBlur={handleBlur}>
                                </Field>
                            </fieldset>
                            <div className={'w-full flex flex-row items-center justify-center'}>
                                {errors.name && touched.name && (
                                    <p className={'text-red-600'}>
                                        <small
                                            className={'text-red-600 italic'}>{errors.name}</small>
                                    </p>
                                )}
                            </div>

                            <fieldset
                                className="w-full my-2 h-fit border-2 border-[rgb(var(--border-color))] rounded-lg">
                                <legend><strong>Mô tả cửa hàng</strong></legend>
                                <Field type="text"
                                       name="description"
                                       className="w-full h-fit rounded-lg p-2"
                                       values={values.description}
                                       onChange={handleChange}
                                       onBlur={handleBlur}>
                                </Field>
                            </fieldset>
                            <div className={'w-full flex flex-row items-center justify-center'}>
                                {errors.description && touched.description && (
                                    <p className={'text-red-600'}>
                                        <small
                                            className={'text-red-600 italic'}>{errors.description}</small>
                                    </p>
                                )}
                            </div>

                            <fieldset
                                className="w-full my-2 h-fit border-2 border-[rgb(var(--border-color))] rounded-lg">
                                <legend><strong>Email</strong></legend>
                                <Field type="text"
                                       name="email"
                                       className="w-full h-fit rounded-lg p-2"
                                       values={values.email}
                                       onChange={handleChange}
                                       onBlur={handleBlur}>
                                </Field>
                            </fieldset>
                            <div className={'w-full flex flex-row items-center justify-center'}>
                                {errors.email && touched.email && (
                                    <p className={'text-red-600'}>
                                        <small
                                            className={'text-red-600 italic'}>{errors.email}</small>
                                    </p>
                                )}
                            </div>

                            <fieldset
                                className="w-full my-2 h-fit border-2 border-[rgb(var(--border-color))] rounded-lg">
                                <legend><strong>Số điện thoại</strong></legend>
                                <Field type="text"
                                       name="numberphone"
                                       className="w-full h-fit rounded-lg p-2"
                                       values={values.numberphone}
                                       onChange={handleChange}
                                       onBlur={handleBlur}>
                                </Field>
                            </fieldset>
                            <div className={'w-full flex flex-row items-center justify-center'}>
                                {errors.numberphone && touched.numberphone && (
                                    <p className={'text-red-600'}>
                                        <small
                                            className={'text-red-600 italic'}>{errors.numberphone}</small>
                                    </p>
                                )}
                            </div>

                            <div
                                className={'w-full grid grid-cols-2 grid-rows-1 gap-4 my-3 items-center justify-items-center'}>
                                <button type={'button'}
                                        className={'p-2 border-2 border-[rgb(var(--border-color))] rounded-lg'}
                                        onClick={() => resetForm()}>
                                    Đặt lại
                                </button>
                                <button type={'submit'}
                                        className={'p-2 border-2 border-[rgb(var(--main-color))] rounded-lg'}>Xác nhận
                                </button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}
export default UpdateProfile


