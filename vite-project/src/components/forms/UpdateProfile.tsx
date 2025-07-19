import {Field, Form, Formik} from "formik";
import {toast} from "react-toastify";
import React from "react";
import endpoints from "../../services/endpoints.tsx";
import apiClient from "../../services/apiClient.tsx";
import {useUser} from "../../context/UserContext.tsx";
import Loading from "../loading/Loading.tsx";
import * as Yup from "yup";

interface CreateAddressProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>
}

const UpdateProfile: React.FC<CreateAddressProps> = ({setOpen, setSuccess}) => {
    const {user} = useUser();

    if (!user) return <Loading/>

    return (
        <div className={'w-full h-full fixed top-0 left-0 z-[999] flex flex-col justify-center items-center bg-white'}>
            <Formik initialValues={{
                account_name: user.account_name ?? '',
                full_name: user.full_name ?? '',
                birthday: user.birthday ?? '',
                gender: user.gender ?? 'OTHER',
                numberphone: user?.numberphone ?? '',
                email: user?.email ?? '',
            }}
                    enableReinitialize={true}
                    validateOnBlur={true}
                    validationSchema={Yup.object({
                        account_name: Yup.string().required('Không để trống tên tài khoản').min(6, 'Tối thiểu 6 kí tự'),
                        numberphone: Yup.string()
                            .required('Không để trống số điện thoại')
                            .matches(/^[0-9]+$/, 'Chỉ được nhập số')
                            .length(10, 'Số điện thoại phải đủ 10 chữ số'),

                    })}
                    onSubmit={async (values) => {
                        try {
                            const response = await apiClient.put(endpoints.user.updateUserInfo, values);
                            if (response.status === 200) {
                                toast.success('Cập nhật thành công', {autoClose: 1000});
                                setTimeout(() => {
                                    setOpen(false);
                                    setSuccess(true);
                                }, 1200)
                            } else {
                                toast.error(response.data.message);
                            }
                        } catch (e) {
                            console.error('Failed to create address', e);
                            toast.error('Error!');
                        }
                    }
                    }>
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                  }) => {
                    return (
                        <Form className={'w-full h-full p-2 flex flex-col justify-start items-center'}
                              onSubmit={handleSubmit}>
                            <p className={'w-full h-fit text-center font-bold text-2xl p-2 border-b-2 border-[rgb(var(--border-color))] mb-3 text-[rgb(var(--main-color))]'}>
                                Cập nhật thông tin cá nhân</p>

                            <fieldset
                                className="w-full my-2 h-fit border-2 border-[rgb(var(--border-color))] rounded-lg">
                                <legend>Tên tài khoản</legend>
                                <Field type="text" name="account_name"
                                       value={values.account_name}
                                       className="w-full h-fit rounded-lg p-2 "
                                       onChange={handleChange}
                                       onBlur={handleBlur}>
                                </Field>
                            </fieldset>
                            <div className={'w-full flex flex-row items-center justify-center'}>
                                {errors.account_name && touched.account_name && (
                                    <p className={'text-red-600'}>
                                        <small
                                            className={'text-red-600 italic'}>{errors.account_name}</small>
                                    </p>
                                )}
                            </div>

                            <fieldset
                                className="w-full my-2 h-fit border-2 border-[rgb(var(--border-color))] rounded-lg">
                                <legend>Tên người dùng</legend>
                                <Field type="text" name="full_name"
                                       value={values.full_name}
                                       className="w-full h-fit rounded-lg p-2 "
                                       onChange={handleChange}></Field>
                            </fieldset>

                            <fieldset
                                className="w-full my-2 h-fit border-2 border-[rgb(var(--border-color))] rounded-lg">
                                <legend>Ngày sinh</legend>
                                <Field type="date" name="account_name"
                                       value={values.birthday?.substring(0, 10)}
                                       className="w-full h-fit rounded-lg p-2 "
                                       onChange={handleChange}></Field>
                            </fieldset>

                            <fieldset
                                className="w-full my-2 h-fit border-2 border-[rgb(var(--border-color))] rounded-lg">
                                <legend>Giới tính</legend>
                                <Field as={'select'} name="gender"
                                       value={values.gender}
                                       className="w-full h-fit rounded-lg p-2 "
                                       onChange={handleChange}>
                                    <option value={'MALE'}>Nam</option>
                                    <option value={'FEMALE'}>Nữ</option>
                                    <option value={'OTHER'}>Tôi không muốn nhắc đến</option>
                                </Field>
                            </fieldset>

                            <fieldset
                                className="w-full my-2 h-fit border-2 border-[rgb(var(--border-color))] rounded-lg">
                                <legend>Địa chỉ email</legend>
                                <Field type="text" name="email"
                                       value={values.email}
                                       className="w-full h-fit rounded-lg p-2 "
                                       onChange={handleChange}></Field>
                            </fieldset>

                            <fieldset
                                className="w-full my-2 h-fit border-2 border-[rgb(var(--border-color))] rounded-lg">
                                <legend>Số điện thoại</legend>
                                <Field type="text" name="numberphone"
                                       value={values.numberphone}
                                       className="w-full h-fit rounded-lg p-2 "
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

                            <div className="w-[80%] h-fit grid grid-cols-3 grid-rows-1 gap-4 my-3">
                                <button type="button"
                                        className="col-start-1 border-2 border-[rgb(var(--border-color))] p-2 rounded-lg"
                                        onClick={() => setOpen(false)}>
                                    Hủy
                                </button>
                                <button type="submit"
                                        className="col-start-3 border-[rgb(var(--border-color))] p-2 rounded-lg bg-[rgb(var(--btn-primary-bg))] text-[rgb(var(--btn-primary-text))]"
                                >
                                    Cập nhật
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