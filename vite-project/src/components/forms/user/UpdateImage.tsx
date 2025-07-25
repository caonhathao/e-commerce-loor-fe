import {Form, Formik} from "formik";
import {toast} from "react-toastify";
import React, {useRef, useState} from "react";
import endpoints from "../../../services/endpoints.tsx";
import apiClient from "../../../services/apiClient.tsx";
import {useUser} from "../../../context/UserContext.tsx";
import Loading from "../../loading/Loading.tsx";
import * as Yup from "yup";
import {BsXCircle} from "react-icons/bs";

interface CreateAddressProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>
}

const UpdateImage: React.FC<CreateAddressProps> = ({setOpen, setSuccess}) => {
    const {user} = useUser();
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    if (!user) return <Loading/>

    if (isSubmit) {
        return <Loading/>
    }

    return (
        <div className={'w-full h-full fixed top-0 left-0 z-[999] flex flex-col justify-center items-center bg-white'}>
            <Formik initialValues={{
                images: null
            }}
                    enableReinitialize={true}
                    validateOnBlur={true}
                    validationSchema={Yup.object({
                        images: Yup.mixed()
                            .required('Vui lòng chọn ảnh')
                            .test('fileType', 'Chỉ chấp nhận ảnh JPEG hoặc PNG', (value: unknown) => {
                                const file = value as File;
                                return file && ['image/jpeg', 'image/png'].includes(file.type);
                            })
                            .test('fileSize', 'Ảnh quá lớn, tối đa 2MB', (value: unknown) => {
                                const file = value as File;
                                return file && ['image/jpeg', 'image/png'].includes(file.type);
                            })
                    })}
                    onSubmit={async (values) => {
                        try {
                            setIsSubmit(true);
                            const formData = new FormData();
                            formData.append('images', values.images);

                            const response = await apiClient.put(endpoints.user.updateUserInfo, formData);
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
                      setFieldValue,
                      errors,
                      touched,
                      handleBlur,
                      handleSubmit,
                  }) => {
                    return (
                        <Form className={'w-full h-full p-2 flex flex-col justify-start items-center'}
                              onSubmit={handleSubmit}>
                            <p className={'w-full h-fit text-center font-bold text-2xl p-2 border-b-2 border-[rgb(var(--border-color))] mb-3 text-[rgb(var(--main-color))]'}>
                                Cập nhật ảnh đại diện</p>

                            <fieldset
                                className="w-full my-2 border-2 border-[rgb(var(--border-color))] rounded-lg p-2">
                                <legend>Ảnh đại diện</legend>
                                <div className={' flex flex-row justify-between items-center gap-2'}>
                                    <div className={'w-[30%]'}>
                                        <label htmlFor="images"
                                               className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
                                            Chọn ảnh
                                        </label>
                                        <input
                                            id="images"
                                            name="images"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            ref={fileInputRef}
                                            onChange={(event) => {
                                                const file = event.currentTarget.files?.[0] || null;

                                                // Reset input để onChange luôn được gọi (ngay cả khi chọn lại cùng 1 ảnh)
                                                if (fileInputRef.current) {
                                                    fileInputRef.current.value = '';
                                                }

                                                if (file) {
                                                    setPreviewUrl(URL.createObjectURL(file));
                                                }
                                                setFieldValue('images', file);
                                            }}
                                            onBlur={handleBlur}
                                        />
                                    </div>

                                    {previewUrl && (
                                        <div className="w-[70%] mt-2 flex justify-center">
                                            <div className="w-fit relative">
                                                <img src={previewUrl} alt="Preview"
                                                     className="max-h-40 rounded-lg border"/>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setFieldValue('images', null);
                                                        setPreviewUrl(null);
                                                    }}
                                                    className="0 absolute top-0 right-0 bg-red-600 rounded-lg p-1"
                                                >
                                                    <BsXCircle size={20} color={'white'}/>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {touched.images && errors.images && (
                                    <p className="text-red-600 text-sm italic mt-1 ml-2">
                                        {errors.images}
                                    </p>
                                )}
                            </fieldset>

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
export default UpdateImage