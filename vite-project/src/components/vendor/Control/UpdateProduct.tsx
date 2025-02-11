import {useFormik} from "formik";
import * as Yup from "yup";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import {useProduct} from "../../../context/ProductContext.tsx";
import Loading from "../../loading/Loading.tsx";

const NewProduct = () => {
    const navigate = useNavigate();

    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);

    const {product} = useProduct();

    const formData = useFormik({
        initialValues: {
            id: product.id,
            category_id: product.category_id,
            subCategory_id: product.subcategory_id,
            name: product.name,
            origin: product.origin,
            price: product.price,
            status: product.status,
            description: product.description,
            stock: product.stock,
            promotion: product.promotion,
            tags: product.tags,
        },
        onSubmit: async (values) => {
            try {
                const id = formData.values.id;
                const url = import.meta.env.VITE_API_HOST + import.meta.env.VITE_SERVER_PORT + import.meta.env.VITE_API_U_PRODUCT + id;
                const response = await axios.put(url, values, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
                    }
                });
                if (response) {
                    toast.success('Sản phẩm đã dược cập nhật thành công!', {autoClose: 1000});
                    setTimeout(() => {
                        navigate(-1);
                    }, 1200)
                } else toast.error("Cập nhật thất bại! Vui lòng kiểm tra các trường nhập!");
            } catch (error) {
                toast.error('Failed');
                console.log(error);
            }
        },
        validationSchema: Yup.object({
            category_id: Yup.string().required('Please choose a category'),
            subCategory_id: Yup.string().required('Please choose a sub category'),
            name: Yup.string().required('Please enter a name'),
            origin: Yup.string().required('Please enter origin'),
            price: Yup.number().required('Please enter price').min(0, 'Wrong input'),
            status: Yup.number().required('Please enter status'),
            description: Yup.string().required('Please enter description'),
            stock: Yup.number().required('Please enter stock').min(0, 'Wrong input'),
        }),
        validateOnBlur: true,
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = import.meta.env.VITE_API_HOST + import.meta.env.VITE_SERVER_PORT + import.meta.env.VITE_API_G_CATEGORY;
                const response = await axios.get(url);
                if (response) setCategory(response.data);
                else toast.error('Failed to get categories!');
            } catch (err) {
                console.log(err);
                toast.error('Failed to fetch data!');
            }
        }
        fetchData()
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = formData.values.category_id;
                const url = import.meta.env.VITE_API_HOST + import.meta.env.VITE_SERVER_PORT + import.meta.env.VITE_API_G_SUBCATEGORY + id;
                const response = await axios.get(url);
                if (response) setSubCategory(response.data);
                else toast.error('Failed to get sub categories!');
            } catch (err) {
                console.log(err);
            }
        }
        fetchData()
    }, []);

    if (category.length === 0 || subCategory.length === null) return (
        <>
            <Loading/>
        </>
    )

    return (
        <div className={'w-auto h-full ml-8 p-2 my-2 flex flex-col justify-start items-center'}>
            <form
                className={'w-full h-fit flex flex-col items-center justify-center'}
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log("Form submitted!");
                    formData.handleSubmit(e);
                }}>
                <h3 className={'font-bold text-lg w-fit m-2 text-yellow-600'}>Tạo sản phẩm mới</h3>

                {/*selection for category and sub category*/}
                <fieldset
                    className={'w-full border border-gray-700 rounded-lg p-2 m-2 flex flex-col items-center justify-around'}>
                    <legend>Phân loại</legend>
                    <div className={'w-full flex flex-row items-center justify-center'}>
                        <fieldset className={'w-1/2'}>
                            <legend>Nhóm 1</legend>
                            <select name={'category_id'}
                                    className={'w-full'}
                                    onChange={formData.handleChange}
                                    value={formData.values.category_id}
                                    onBlur={formData.handleBlur}>
                                <option value={'0'}>none</option>
                                {category && category.map((item, i) => (
                                    <option key={i} value={item["id"]}>{item["name"]}</option>
                                ))}
                            </select>
                        </fieldset>

                        <fieldset className={'w-1/2'}>
                            <legend>Nhóm 2</legend>
                            <select name={'subCategory_id'}
                                    className={'w-full'}
                                    onChange={formData.handleChange}
                                    value={formData.values.subCategory_id}
                                    onBlur={formData.handleBlur}>
                                <option value={'0'}>none</option>
                                {subCategory && subCategory.map((item, i) => (
                                    <option key={i} value={item["id"]}>{item["name"]}</option>
                                ))}
                            </select>
                        </fieldset>
                    </div>

                    <div className={'w-full flex flex-row items-center justify-center'}>
                        {formData.errors.category_id && formData.touched.category_id && (
                            <p className={'text-red-600'}>
                                <small className={'text-red-600 italic'}>{formData.errors.category_id}</small>
                            </p>
                        )}
                        {formData.errors.subCategory_id && formData.touched.subCategory_id && (
                            <p className={'text-red-600'}>
                                <small className={'text-red-600 italic'}>{formData.errors.subCategory_id}</small>
                            </p>
                        )}
                    </div>
                </fieldset>

                {/*Base information*/}
                <fieldset
                    className={'w-full p-0 leading-8 border border-gray-700 rounded-lg m-2 flex flex-row items-center justify-between'}>
                    <legend>ID</legend>
                    <input className={'w-full pl-2'} type={'text'} name={'id'} placeholder={'ID sản phẩm'}
                           disabled
                           value={formData.values.id}/>
                </fieldset>
                {formData.errors.id && formData.touched.id && (
                    <p className={'text-red-600'}>
                        <small className={'text-red-600 italic'}>{formData.errors.id}</small>
                    </p>
                )}

                <fieldset
                    className={'w-full p-0 leading-8 border border-gray-700 rounded-lg m-2 flex flex-row items-center justify-between'}>
                    <legend>Tên</legend>
                    <input className={'w-full pl-2'} type={'text'} name={'name'} placeholder={'Tên sản phẩm'}
                           value={formData.values.name}
                           onChange={formData.handleChange}
                           onBlur={formData.handleBlur}/>
                </fieldset>
                {formData.errors.name && formData.touched.name && (
                    <p className={'text-red-600'}>
                        <small className={'text-red-600 italic'}>{formData.errors.name}</small>
                    </p>
                )}

                <fieldset
                    className={'w-full border border-gray-700 rounded-lg leading-8 m-2 flex flex-row items-center justify-between'}>
                    <legend>Xuất xứ</legend>
                    <input className={'w-full pl-2'} type={'text'} name={'origin'} placeholder={'Nguồn gốc sản phẩm'}
                           onChange={formData.handleChange}
                           onBlur={formData.handleBlur}
                           value={formData.values.origin}/>
                </fieldset>
                {formData.errors.origin && formData.touched.origin && (
                    <p className={'text-red-600'}>
                        <small className={'text-red-600 italic'}>{formData.errors.origin}</small>
                    </p>
                )}

                <fieldset
                    className={'w-full border border-gray-700 rounded-lg leading-8 m-2 flex flex-row items-center justify-between'}>
                    <legend>Giá</legend>
                    <input className={'w-full pl-2'} type='number' name={'price'} placeholder={'Giá trị sản phẩm'}
                           onChange={formData.handleChange}
                           onBlur={formData.handleBlur}
                           value={formData.values.price}/>
                </fieldset>
                {formData.errors.price && formData.touched.price && (
                    <p className={'text-red-600'}>
                        <small className={'text-red-600 italic'}>{formData.errors.price}</small>
                    </p>
                )}

                <fieldset
                    className={'w-full border border-gray-700 rounded-lg leading-8 m-2 flex flex-row items-center justify-between'}>
                    <legend>Mô tả</legend>
                    <textarea className={'w-full pl-2'} name={'description'} placeholder={'Mô tả sản phẩm'}
                              onChange={formData.handleChange}
                              onBlur={formData.handleBlur}
                              value={formData.values.description}></textarea>
                </fieldset>
                {formData.errors.description && formData.touched.description && (
                    <p className={'text-red-600'}>
                        <small className={'text-red-600 italic'}>{formData.errors.description}</small>
                    </p>
                )}

                {/*The status of product*/}
                <fieldset
                    className={'w-full border border-gray-700 rounded-lg p-2 m-2 flex flex-row items-center justify-between'}>
                    <legend>Tình trang hàng hóa</legend>
                    <div className={'w-1/2'}>
                        <fieldset>
                            <legend>Tình trạng</legend>
                            <select name={'status'}
                                    className={'w-full'}
                                    onChange={formData.handleChange}
                                    onBlur={formData.handleBlur}
                                    value={formData.values.status}>
                                <option value={0}>Tạm ngưng</option>
                                <option value={1}>Mở bán</option>
                            </select>
                        </fieldset>
                        {formData.errors.status && formData.touched.status && (
                            <p className={'text-red-600'}>
                                <small className={'text-red-600 italic'}>{formData.errors.status}</small>
                            </p>
                        )}
                    </div>
                    <div className={'w-1/2'}>
                        <fieldset>
                            <legend>Tồn kho</legend>
                            <input className={'w-full pl-2'} type={'number'} name={'stock'}
                                   placeholder={'Tối thiểu là 1'}
                                   onChange={formData.handleChange}
                                   onBlur={formData.handleBlur}
                                   value={formData.values.stock}/>
                        </fieldset>
                        {formData.errors.stock && formData.touched.stock && (
                            <p className={'text-red-600'}>
                                <small className={'text-red-600 italic'}>{formData.errors.stock}</small>
                            </p>
                        )}
                    </div>
                </fieldset>

                <fieldset
                    className={'w-full border border-gray-700 rounded-lg leading-8 m-2 flex flex-row items-center justify-between'}>
                    <legend>Khuyến mãi</legend>
                    <input className={'w-full pl-2'} type={'number'} name={'promotion'}
                           placeholder={'Phần trăm khuyến mãi - để trống = 0'}
                           onChange={formData.handleChange}/>
                </fieldset>

                <fieldset
                    className={'w-full border border-gray-700 rounded-lg leading-8 m-2 flex flex-col items-start justify-between'}>
                    <legend>Từ khóa</legend>
                    <small className={'pl-2 text-red-600'}>Tối đa 200 từ, cách nhau bởi dấu ','</small>
                    <input className={'w-full pl-2'} type={'text'} name={'tags'}
                           placeholder={'Nhập các từ khóa gợi ý tìm kiếm'}
                           onChange={formData.handleChange}
                           value={formData.values.tags}
                    />
                </fieldset>

                <div className={'flex flex-row justify-center items-between'}>
                    <button type={'button'} className={'bg-purple-500 p-2 rounded-4xl text-white font-bold mr-5'}
                            onClick={() => navigate(-1)}>Cancel
                    </button>
                    <button type={'submit'} className={'bg-purple-500 p-2 rounded-4xl text-white font-bold ml-5'}>Submit
                    </button>
                </div>
            </form>
            <ToastContainer/>
        </div>
    )
}
export default NewProduct;