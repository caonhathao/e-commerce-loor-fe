import {Formik} from "formik";
import * as Yup from "yup";
import apiClient from "../../../services/apiClient.tsx";
import endpoints from "../../../services/endpoints.tsx";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import {useProduct} from "../../../context/ProductContext.tsx";
import {useEffect, useState} from "react";
import {BsPlusCircle} from "react-icons/bs";

const NewVariant = () => {
    const navigator = useNavigate();
    const params = useParams();
    const {product} = useProduct();
    const [attrs, setAttrs] = useState<{ [key: string]: string }>({})

    return (
        <div className={'w-full h-full flex justify-center items-center m-2 p-2 my-2'}>
            <Formik
                initialValues={{
                    sku: '',
                    price: '',
                    stock: '',
                    name: '',
                    status: '',
                }}
                enableReinitialize={true}
                validationSchema={Yup.object({
                    sku: Yup.string().required('SKU là bắt buộc'),
                    price: Yup.number().min(1, 'Giá tối thiểu không được nhở hơn 1 đồng').required('Không được để trống giá sản phẩm'),
                    stock: Yup.number().min(0, 'Tồn kho không được nhỏ hơn 0'),
                    name: Yup.string().required('Tên không được để trống'),
                })}
                validateOnBlur={true}
                onSubmit={async (values) => {
                    try {
                        const data = new FormData();
                        data.append('sku', values.sku);
                        data.append('price', values.price.toString());
                        data.append('stock', values.stock.toString());
                        data.append('name', values.name);
                        data.append('status', values.status.toString());
                        const response = await apiClient.post(endpoints.brand.createVariant(params.id))
                        if (response.status === 200) {
                            toast.success('Tạo phiên bản mới thành công');
                        } else {
                            toast.error('Tạo sản phẩm thất bại');
                        }
                    } catch (e) {
                        console.log('Failed to create new variant', e)
                    }
                }
                }
            >{({
                   values,
                   handleChange,
                   handleBlur,
                   handleSubmit,
                   errors,
                   touched,
               }) => {
                return (
                    <form className={'w-[80%] h-fit flex flex-col items-center justify-center'}
                          onSubmit={handleSubmit}>
                        <h3 className={'font-bold text-xl p-1 w-[70%] text-center m-2 text-yellow-600 border-b-2 border-[var(--bg-color)]'}>Tạo
                            phiên bản mới</h3>
                        <div className={'border-[1px] border-[var(--bg-color)] p-2 rounded-lg text-xs italic'}>
                            <p><strong>Mã sản phẩm:</strong> {product.id}</p>
                            <p><strong>Tên sản phẩm:</strong> {product.name}</p>
                        </div>
                        <fieldset
                            className={'w-full p-0 leading-8 border border-gray-700 rounded-lg m-2 flex flex-row items-center justify-between'}>
                            <legend>Mã SKU</legend>
                            <input className={'w-full pl-2'} type={'text'} name={'sku'} placeholder={'Trống'}
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
                            <legend>Tên sản phẩm (phiên bản)</legend>
                            <input className={'w-full pl-2'} type={'text'} name={'name'} placeholder={'Trống'}
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
                            <legend>Giá bán</legend>
                            <input className={'w-full pl-2'} type={'text'} name={'price'} placeholder={'Trống'}
                                   value={values.price}
                                   onChange={handleChange}
                                   onBlur={handleBlur}/>
                        </fieldset>
                        {errors.price && touched.price && (
                            <p className={'text-red-600'}>
                                <small className={'text-red-600 italic'}>{errors.price}</small>
                            </p>
                        )}

                        <div className={'w-full flex flex-row justify-between items-center gap-4'}>
                            <fieldset
                                className={'w-full p-0 leading-8 border border-gray-700 rounded-lg my-2 flex flex-row items-center justify-between'}>
                                <legend>Tồn kho</legend>
                                <input className={'w-full pl-2'} type={'text'} name={'stock'} placeholder={'Trống'}
                                       value={values.stock}
                                       onChange={handleChange}
                                       onBlur={handleBlur}/>
                            </fieldset>
                            {errors.stock && touched.stock && (
                                <p className={'text-red-600'}>
                                    <small className={'text-red-600 italic'}>{errors.stock}</small>
                                </p>
                            )}
                            <fieldset
                                className={'w-full p-0 leading-8 border border-gray-700 rounded-lg my-2 flex flex-row items-center justify-between'}>
                                <legend>Trạng thái</legend>
                                <select name={'status'}
                                        className={'w-full p-1'}
                                        onChange={handleChange}
                                        value={values.status}
                                        onBlur={handleBlur}>
                                    <option value={0}>Mở bán</option>
                                    <option value={1}>Ngừng bán</option>
                                </select>
                            </fieldset>
                            {errors.status && touched.status && (
                                <p className={'text-red-600'}>
                                    <small className={'text-red-600 italic'}>{errors.status}</small>
                                </p>
                            )}
                        </div>
                        {attrs && Object.entries(attrs).map(([key, value]) => (
                            <div key={key}>
                                Key: {key}, Value: {value}
                            </div>
                        ))}
                        <div className={'w-full flex flex-row justify-between items-center gap-4'}>
                            <fieldset
                                className={'w-full p-2 border border-gray-700 rounded-lg my-2 flex flex-row items-center justify-between'}>
                                <legend>Thuộc tính</legend>
                                <select>
                                    <option>Màu sắc</option>
                                    <option>Kích thước</option>
                                    <option>Cân nặng</option>
                                    <option>Chất liệu</option>
                                </select>
                            </fieldset>

                            <fieldset
                                className={'w-full p-2 border border-gray-700 rounded-lg my-2 flex flex-row items-center justify-between'}>
                                <legend>Mô tả</legend>
                                <input type={'text'} className={'w-full'}/>
                            </fieldset>
                            <div className={'w-fit'}><BsPlusCircle size={20}/></div>
                        </div>
                        <div className={'w-full flex flex-row justify-center items-center gap-4 mt-3'}>
                            <button type={'button'}
                                    className={'border-2 border-[var(--bg-color)] p-2 rounded-4xl text-[var(--bg-color)] flex justify-center items-center'}
                                    onClick={() => navigator(-1)}>
                                Cancel
                            </button>
                            <button type={'submit'}
                                    className={'bg-purple-500 p-2 rounded-4xl text-white font-bold flex justify-center items-center'}>
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
export default NewVariant