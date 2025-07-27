import React, {useState} from "react";
import {BsEye, BsEyeSlash, BsXSquare} from "react-icons/bs";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {encrypt, putData} from "../../../utils/functions.utils.tsx";
import endpoints from "../../../services/endpoints.tsx";
import {toast} from "react-toastify";

interface ChangePasswordProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>
}

const ChangePassword: React.FC<ChangePasswordProps> = ({setOpen, setSuccess}) => {
    const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

    return (
        <div className={'w-full h-full absolute top-0 left-0 bg-white p-2'}>
            <button className={'absolute top-0 right-0 bg-red-600 p-2 rounded-lg'} onClick={() => setOpen(false)}>
                <BsXSquare size={20} color={'white'}/></button>
            <p className={'w-full text-center text-[rgb(var(--main-color))] font-bold text-xl p-2 my-3 border-b-2 border-[rgb(var(--border-color))]'}>
                Thay đổi mật khẩu
            </p>
            <Formik initialValues={{
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
            }}
                    enableReinitialize={true}
                    validateOnBlur={true}
                    validationSchema={Yup.object({
                        oldPassword: Yup.string().required('Yêu cầu mật khẩu cũ').min(6, 'Tối thiểu 6 kí tự').trim('Không bao gồm kí tự trống'),
                        newPassword: Yup.string().required('Yêu cầu mật khẩu cũ').min(6, 'Tối thiểu 6 kí tự').trim("Không bao gồm kí tự trống"),
                        confirmPassword: Yup.string()
                            .required('Vui lòng nhập lại mật khẩu')
                            .oneOf([Yup.ref('newPassword')], 'Mật khẩu không khớp'),
                    })}
                    onSubmit={async (values) => {
                        try {

                            const payload = {
                                oldPassword: encrypt(values.oldPassword),
                                newPassword: encrypt(values.newPassword),
                            }

                            console.log(payload);

                            const data = await putData(endpoints.brand.changePassword, true, payload);
                            if (data && data.status === 200) {
                                toast.success('Cập nhật thành công', {autoClose: 1000})
                                setTimeout(() => {
                                    setOpen(false);
                                    setSuccess(true);
                                }, 1200)
                            } else toast.error('Cập nhật thất bại')
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
                                className="w-full my-2 h-fit border-2 border-[rgb(var(--border-color))] rounded-lg flex flex-row items-center justify-between">
                                <legend><strong>Mật khẩu cũ</strong></legend>
                                <Field type={showOldPassword ? 'text' : 'password'}
                                       name='oldPassword'
                                       className="w-full h-fit rounded-lg p-2"
                                       values={values.oldPassword ?? ''}
                                       onChange={handleChange}
                                       onBlur={handleBlur}>
                                </Field>
                                <div className={'w-fit h-fit p-2 border-l-2 border-[rgb(var(--border-color))]'}
                                     onClick={() => setShowOldPassword(!showOldPassword)}>
                                    {showOldPassword ?
                                        <BsEye size={20} color={'rgb(var(--main-color))'}/> :
                                        <BsEyeSlash size={20} color={'rgb(var(--main-color))'}/>
                                    }
                                </div>
                            </fieldset>
                            <div className={'w-full flex flex-row items-center justify-center'}>
                                {errors.oldPassword && touched.oldPassword && (
                                    <p className={'text-red-600'}>
                                        <small
                                            className={'text-red-600 italic'}>{errors.oldPassword}</small>
                                    </p>
                                )}
                            </div>

                            <fieldset
                                className="w-full my-2 h-fit border-2 border-[rgb(var(--border-color))] rounded-lg flex flex-row items-center justify-between">
                                <legend><strong>Mật khẩu mới</strong></legend>
                                <Field type={showNewPassword ? 'text' : 'password'}
                                       name="newPassword"
                                       className="w-full h-fit rounded-lg p-2"
                                       values={values.newPassword ?? ''}
                                       onChange={handleChange}
                                       onBlur={handleBlur}>
                                </Field>
                                <div className={'w-fit h-fit p-2 border-l-2 border-[rgb(var(--border-color))]'}
                                     onClick={() => setShowNewPassword(!showNewPassword)}>
                                    {showNewPassword ?
                                        <BsEye size={20} color={'rgb(var(--main-color))'}/> :
                                        <BsEyeSlash size={20} color={'rgb(var(--main-color))'}/>
                                    }
                                </div>
                            </fieldset>
                            <div className={'w-full flex flex-row items-center justify-center'}>
                                {errors.newPassword && touched.newPassword && (
                                    <p className={'text-red-600'}>
                                        <small
                                            className={'text-red-600 italic'}>{errors.newPassword}</small>
                                    </p>
                                )}
                            </div>

                            <fieldset
                                className="w-full my-2 h-fit border-2 border-[rgb(var(--border-color))] rounded-lg flex flex-row items-center justify-between">
                                <legend><strong>Xác nhận lại mật khẩu</strong></legend>
                                <Field type={showNewPassword ? 'text' : 'password'}
                                       name="confirmPassword"
                                       className="w-full h-fit rounded-lg p-2"
                                       values={values.confirmPassword ?? ''}
                                       onChange={handleChange}
                                       onBlur={handleBlur}>
                                </Field>
                                <div className={'w-fit h-fit p-2 border-l-2 border-[rgb(var(--border-color))]'}
                                     onClick={() => setShowNewPassword(!showNewPassword)}>
                                    {showNewPassword ?
                                        <BsEye size={20} color={'rgb(var(--main-color))'}/> :
                                        <BsEyeSlash size={20} color={'rgb(var(--main-color))'}/>
                                    }
                                </div>
                            </fieldset>
                            <div className={'w-full flex flex-row items-center justify-center'}>
                                {errors.confirmPassword && touched.confirmPassword && (
                                    <p className={'text-red-600'}>
                                        <small
                                            className={'text-red-600 italic'}>{errors.confirmPassword}</small>
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
export default ChangePassword