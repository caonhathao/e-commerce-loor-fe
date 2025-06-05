import {Formik} from "formik";

import * as Yup from "yup";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import Loading from "../../loading/Loading.tsx";
import * as Bs from "react-icons/bs";

interface data {
    id: string,
    product_id: string,
    name: string,
    sku: string,
    price: number,
    stock: number,
    status: boolean,
}

const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [data, setData] = useState<data>();
    const [isResponse, setIsResponse] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleResetForm = ({setValues}) => {
        console.log('reset form');
        setValues({
            name: data ? data['name'] :'unknown',
            price: data ? data['price'] :0,
            sku: data ? data['sku'] :'',
            status: data ? data['status'] :false,
            stock: data ? data['stock'] :0,
        })
    }

    //fetch data of current product
    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = params.id;
                const url = import.meta.env.VITE_API_HOST + import.meta.env.VITE_SERVER_PORT + import.meta.env.VITE_API_G_O_VARIANT + id;
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('userToken')}`
                    }
                });
                if (response) setData(response.data);
                else {
                    toast.error('Failed to get product!');
                }
            } catch (e) {
                console.log(e);
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        console.log('data:', data);
        // console.log('subCategory_id:', subCategory);
        // console.log('Image upload:', imgUpload);
    }, [data]);

    if (!data) return <Loading/>;

    if (isSubmitted && !isResponse) {
        return <Loading/>
    }

    return (
        <div className={'w-auto h-full m-2 p-2 my-2 flex flex-col justify-start items-center'}>
            <Formik
                initialValues={{
                    id: data ? data["id"] :'',
                    name: data ? data["name"] :'unknown',
                    sku: data ? data['sku'] :'',
                    price: data ? data['price'] :0,
                    stock: data ? data['stock'] :0,
                    status: data ? data['status'] :false,
                }}
                enableReinitialize={true}
                validationSchema={Yup.object({
                    name: Yup.string().required('Tên sản phẩm là bắt buộc'),
                    sku: Yup.string().required('Yêu cầu phải có mã sku của sản phẩm'),
                    price: Yup.number().required('Bắt buộc phải có giá sản phẩm'),
                    status: Yup.boolean().required('Bắt buộc phải cho biết tình trạng sẵn sàng của sản phẩm'),
                    stock: Yup.number().required('Bắt buộc phải có tồn kho')
                })}
                validateOnBlur={true}
                onSubmit={async (values, {setSubmitting}) => {
                    try {
                        const data = new FormData();

                        data.append('name', values.name);
                        data.append('status', values.status.toString());
                        data.append('sku', values.sku);
                        data.append('price', values.price.toString());
                        data.append('stock', values.stock.toString());


                        const url = import.meta.env.VITE_API_HOST + import.meta.env.VITE_SERVER_PORT + import.meta.env.VITE_API_U_VARIANT + params.id;
                        const response = await axios.put(url, data, {
                            headers: {
                                Authorization: `Bearer ${sessionStorage.getItem('userToken')}`
                            }
                        });

                        if (response.status === 200) {
                            toast.success('Sản phẩm đã được cập nhật thành công!', {autoClose: 1000});
                            setTimeout(() => {
                                navigate(-1);
                            }, 1200);
                        } else {
                            console.log(response);
                            toast.error('Cập nhật thất bại! Vui lòng kiểm tra các trường nhập!');
                        }

                    } catch (error) {
                        toast.error('Failed');
                        console.log(error);
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({
                      values,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      errors,
                      touched,
                      setValues
                  }) => {
                    return (
                        <form
                            className={'w-full h-fit flex flex-col items-center justify-center'}
                            onSubmit={handleSubmit}>
                            <h3 className={'font-bold text-lg w-fit m-2 text-yellow-600'}>Tạo sản phẩm mới</h3>
                            {/*Base information*/}
                            <fieldset
                                className={'w-full p-0 leading-8 border border-gray-700 rounded-lg m-2 flex flex-row items-center justify-between'}>
                                <legend>ID</legend>
                                <textarea className={'w-full p-2 overflow-clip'} type={'text'} name={'id'}
                                          placeholder={'ID sản phẩm'}
                                          disabled
                                          value={values.id}></textarea>
                            </fieldset>

                            <fieldset
                                className={'w-full p-0 leading-8 border border-gray-700 rounded-lg m-2 flex flex-row items-center justify-between'}>
                                <legend>Mã SKU</legend>
                                <input className={'w-full pl-2'} type={'text'} name={'sku'} placeholder={'sku sản phẩm'}
                                       value={values.sku}
                                       onChange={handleChange}
                                       onBlur={handleBlur}/>
                            </fieldset>
                            {errors.sku && touched.sku && (
                                <p className={'text-red-600'}>
                                    <small className={'text-red-600 italic'}>{errors.sku}</small>
                                </p>
                            )}

                            <fieldset
                                className={'w-full p-0 leading-8 border border-gray-700 rounded-lg m-2 flex flex-row items-center justify-between'}>
                                <legend>Tên</legend>
                                <input className={'w-full pl-2'} type={'text'} name={'name'}
                                       placeholder={'Tên sản phẩm'}
                                       value={values.name}
                                       onChange={handleChange}
                                       onBlur={handleBlur}/>
                            </fieldset>
                            {errors.name && touched.name && (
                                <p className={'text-red-600'}>
                                    <small className={'text-red-600 italic'}>{errors.name}</small>
                                </p>
                            )}

                            <fieldset
                                className={'w-full p-0 leading-8 border border-gray-700 rounded-lg m-2 flex flex-row items-center justify-between'}>
                                <legend>Giá</legend>
                                <input className={'w-full pl-2'} type={'text'} name={'name'}
                                       placeholder={'Giá sản phẩm'}
                                       value={values.price}
                                       onChange={handleChange}
                                       onBlur={handleBlur}/>
                            </fieldset>
                            {errors.name && touched.name && (
                                <p className={'text-red-600'}>
                                    <small className={'text-red-600 italic'}>{errors.name}</small>
                                </p>
                            )}

                            {/*The status of data*/}
                            <fieldset
                                className={'w-full border border-gray-700 rounded-lg p-2 m-2 flex flex-row items-center justify-between'}>
                                <legend>Tình trang hàng hóa</legend>
                                <div className={'w-1/2'}>
                                    <fieldset>
                                        <legend>Tình trạng</legend>
                                        <select name={'status'}
                                                className={'w-full'}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                        >
                                            <option value={1} defaultValue={data?.status}>Mở bán</option>
                                            <option value={0} defaultValue={!data?.status}>Tạm ngưng</option>
                                        </select>
                                    </fieldset>
                                    {errors.status && touched.status && (
                                        <p className={'text-red-600'}>
                                            <small className={'text-red-600 italic'}>{errors.status}</small>
                                        </p>
                                    )}
                                </div>
                                <div className={'w-1/2'}>
                                    <fieldset>
                                        <legend>Tổng tồn kho</legend>
                                        <input className={'w-full pl-2'} type={'number'} name={'stock'}
                                               value={values.stock}
                                               onChange={handleChange}
                                               onBlur={handleBlur}/>
                                    </fieldset>
                                </div>
                            </fieldset>
                            <div className={'flex flex-row justify-around items-center'}>
                                <button type={'button'}
                                        className={'bg-purple-500 p-2 rounded-4xl text-white font-bold flex justify-center items-center'}
                                        onClick={() => navigate(-1)}>
                                    Cancel
                                </button>
                                <button type={'button'}
                                        className={'bg-purple-500 p-2 rounded-4xl text-white font-bold mx-5 flex justify-center items-center'}
                                        onClick={() => handleResetForm({setValues: setValues})}>
                                    Reset
                                </button>
                                <button type={'submit'}
                                        className={'bg-purple-500 p-2 rounded-4xl text-white font-bold flex justify-center items-center'}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    );
                }}</Formik>
            <ToastContainer/>
        </div>
    )
}
export default UpdateProduct;