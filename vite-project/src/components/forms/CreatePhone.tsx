import React, {useEffect, useState} from "react";
import endpoints from "../../services/endpoints.tsx";
import apiClient from "../../services/apiClient.tsx";
import {toast} from "react-toastify";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import {userType} from "../../utils/data-types.tsx";
import {useUser} from "../../context/UserContext.tsx";

interface CreateAddressProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreatePhone: React.FC<CreateAddressProps> = ({setOpen, setSuccess}) => {
    const [userData, setUserData] = useState<userType>();
    const {setUser} = useUser()

    useEffect(() => {
        console.log(userData);
    }, [userData])

    return (
        <div
            className="w-[80%] h-fit p-2 fixed z-[998] rounded-lg shadow-lg shadow-gray-500 border-2 border-[rgb(var(--main-color))] bg-white">
            <Formik
                initialValues={{
                    numberphone: ''
                }}
                enableReinitialize={true}
                validationSchema={Yup.object({
                    numberphone: Yup.string()
                        .required('Không để trống số điện thoại')
                        .matches(/^[0-9]+$/, 'Chỉ được nhập số')
                        .length(10, 'Số điện thoại phải đủ 10 chữ số')
                })}
                validateOnBlur={true}
                onSubmit={async (values) => {
                    try {
                        const response = await apiClient.put(endpoints.user.updateUserInfo, userData);
                        if (response && response.status === 200) {
                            toast.success('Thêm số điện thoại thành công!');
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error
                            setUser(prev => {
                                if (!prev) return prev;
                                return {
                                    ...prev,
                                    numberphone: values.numberphone
                                };
                            });
                            setSuccess(true);
                            setOpen(false);
                        } else {
                            toast.error('Lỗi khi tạo số điện thaoij');
                        }
                    } catch (e) {
                        console.error('Failed ', e);
                        toast.error('Error!');
                    }
                }}
            >{({
                   handleChange,
                   handleSubmit,
                   errors,
                   touched,
               }) => {
                return (
                    <Form className="w-full p-2" onSubmit={handleSubmit}>
                        <p className="text-xl font-bold mb-4 w-full border-b-2 border-gray-500">Thêm số liên lạc</p>
                        <div className="w-full flex flex-row items-center justify-center gap-2">
                            <fieldset
                                className="w-[20%] my-2 h-fit border-2 border-[rgb(var(--border-color))] rounded-lg">
                                <Field name="country_code"
                                       value={'+84'}
                                       disabled={true}
                                       className="w-full h-fit rounded-lg p-2 focus:outline-2 focus:outline-[rgb(var(--secondary-color))]"
                                />
                            </fieldset>
                            <fieldset
                                className="w-[80%] my-2 h-fit border-2 border-[rgb(var(--border-color))] rounded-lg">
                                <Field name="numberphone" type="text"
                                       className="w-full h-fit rounded-lg p-2"
                                       placeholder={'Sô điện thoại'}
                                       onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                           setUserData(({...userData, numberphone: e.target.value} as userType));
                                           handleChange(e)
                                       }}
                                />
                            </fieldset>
                        </div>
                        <div className={'w-full flex flex-row items-center justify-center'}>
                            {errors.numberphone && touched.numberphone && (
                                <p className={'text-red-600'}>
                                    <small
                                        className={'text-red-600 italic'}>{errors.numberphone}</small>
                                </p>
                            )}
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
                                Thêm
                            </button>
                        </div>
                    </Form>
                );
            }}
            </Formik>
        </div>
    );
};

export default CreatePhone;
