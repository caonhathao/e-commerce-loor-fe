import React, {useEffect, useState} from "react";
import {listDistrictType, listProvinceType} from "../../../utils/user.data-types.tsx";
import {fetchData} from "../../../utils/functions.utils.tsx";
import endpoints from "../../../services/endpoints.tsx";
import apiClient from "../../../services/apiClient.tsx";
import {toast} from "react-toastify";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";

interface CreateAddressProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateAddress: React.FC<CreateAddressProps> = ({setOpen, setSuccess}) => {
    const [listProvince, setListProvince] = useState<listProvinceType[]>([]);
    const [listDistrict, setListDistrict] = useState<listDistrictType[]>([]);

    useEffect(() => {
        fetchData(endpoints.public.getAllProvinces, true, setListProvince, 'Có lỗi trong quá trình lấy dữ liệu');
    }, []);

    const handleGetDistricts = async (provinceId: string) => {
        if (!provinceId) return;
        try {
            const response = await apiClient.get(endpoints.public.getAllDistricts(provinceId));
            if (response && response.status === 200) {
                setListDistrict(response.data);
            } else {
                toast.error('Error: ' + response.data.message);
            }
        } catch (e) {
            console.error('Failed to fetch district', e);
            toast.error('Có lỗi trong quá trình lấy dữ liệu');
        }
    };

    useEffect(()=>{
        console.log(listDistrict);
    },[listDistrict])

    return (
        <div
            className="w-full h-full p-2 absolute top-0 left-0 z-[60] rounded-lg  bg-white">
            <Formik
                initialValues={{
                    is_default: false,
                    city: '',
                    ward: '',
                    address: ''
                }}
                enableReinitialize={true}
                validationSchema={Yup.object({
                    city: Yup.string().required('Vui lòng chọn thành phố'),
                    ward: Yup.string().required('Vui lòng chọn phường'),
                    address: Yup.string().required('Số nhà, đường không để trống'),
                })}
                validateOnBlur={true}
                onSubmit={async (values) => {
                    console.log(values);
                    try {
                        const response = await apiClient.post(endpoints.user.createAddress, values);
                        if (response && response.status === 200) {
                            toast.success('Thêm địa chỉ thành công!');
                            setSuccess(true);
                            setOpen(false);
                        } else {
                            toast.error('Lỗi khi tạo địa chỉ');
                        }
                    } catch (e) {
                        console.error('Failed to create address', e);
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
                        <p className="w-full text-center text-xl text-[rgb(var(--main-color))] font-bold mb-4 w-full border-b-2 border-gray-500">
                            Thêm địa chỉ giao hàng
                        </p>

                        <fieldset
                            className="w-full my-2 h-fit border-2 border-[rgb(var(--border-color))] rounded-lg">
                            <legend>Tỉnh/Thành phố</legend>
                            <Field as="select" name="city"
                                   className="w-full h-12 rounded-lg p-2 focus:outline-2 focus:outline-[rgb(var(--secondary-color))]"
                                   onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                       handleGetDistricts(e.target.value);
                                       handleChange(e)
                                   }}>
                                <option value="">---</option>
                                {listProvince.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </Field>
                        </fieldset>
                        <div className={'w-full flex flex-row items-center justify-center'}>
                            {errors.city && touched.city && (
                                <p className={'text-red-600'}>
                                    <small
                                        className={'text-red-600 italic'}>{errors.city}</small>
                                </p>
                            )}
                        </div>

                        <fieldset
                            className="w-full my-2 h-fit border-2 border-[rgb(var(--border-color))] rounded-lg">
                            <legend>Phường</legend>
                            <Field as="select" name="ward"
                                   className="w-full h-12 rounded-lg p-2 focus:outline-2 focus:outline-[rgb(var(--secondary-color))]"
                                   onChange={handleChange}>
                                <option value="">---</option>
                                {listDistrict.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </Field>
                        </fieldset>
                        <div className={'w-full flex flex-row items-center justify-center'}>
                            {errors.ward && touched.ward && (
                                <p className={'text-red-600'}>
                                    <small
                                        className={'text-red-600 italic'}>{errors.ward}</small>
                                </p>
                            )}
                        </div>

                        <fieldset
                            className="w-full my-2 h-fit border-2 border-[rgb(var(--border-color))] rounded-lg">
                            <legend>Số nhà, đường</legend>
                            <Field name="address" type="text"
                                   className="w-full h-fit rounded-lg p-2"/>
                        </fieldset>
                        <div className={'w-full flex flex-row items-center justify-center'}>
                            {errors.address && touched.address && (
                                <p className={'text-red-600'}>
                                    <small
                                        className={'text-red-600 italic'}>{errors.address}</small>
                                </p>
                            )}
                        </div>

                        <fieldset
                            className="w-full my-2 h-fit border-2 border-[rgb(var(--border-color))] rounded-lg">
                            <legend>Quốc gia</legend>
                            <input type="text" name="country" disabled value="Việt Nam"
                                   className="w-full h-fit rounded-lg p-2 bg-gray-100 cursor-not-allowed"/>
                        </fieldset>

                        <div className="w-full h-fit my-2 flex flex-row justify-start items-center gap-2">
                            <Field type="checkbox" name="is_default" className="w-4 h-4" onChange={handleChange}/>
                            <p>Địa chỉ mặc định</p>
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

export default CreateAddress;
