import {useFormik} from "formik";
import * as Yup from "yup";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import * as Bs from 'react-icons/bs'
import Loading from "../../loading/Loading.tsx";
import apiClient from "../../../services/apiClient.tsx";
import endpoints from "../../../services/endpoints.tsx";

interface img {
    file: File,
    url: string,
}

const NewProduct = () => {
    const navigate = useNavigate();

    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [images, setImages] = useState<img[]>([]);

    const [isFetching, setIsFetching] = useState(false);

    const formData = useFormik({
        initialValues: {
            id: '',
            category_id: '',
            subCategory_id: '',
            name: '',
            origin: '',
            price: 0,
            status: 0,
            description: '',
            stock: 0,
            promotion: 0,
            tags: '',
            images: [] //store images as array
        },
        onSubmit: async (values) => {
            setIsFetching(true);
            try {
                const dataSend = new FormData()

                dataSend.append('id', values.id)
                dataSend.append('category_id', values.category_id)
                dataSend.append('subCategory_id', values.subCategory_id)
                dataSend.append('name', values.name)
                dataSend.append('origin', values.origin)
                dataSend.append('price', values.price.toString())
                dataSend.append('status', values.status.toString())
                dataSend.append('description', values.description)
                dataSend.append('stock', values.stock.toString())
                dataSend.append('promotion', values.promotion.toString())
                dataSend.append('tags', values.tags)

                values.images.forEach(image => {
                    dataSend.append('images', image["file"])
                })

                const response = await apiClient.post(endpoints.brand.createProduct, dataSend)

                if (response) {
                    setIsFetching(false);
                    toast.success('Sản phẩm đã dược tạo thành công!', {autoClose: 1000});
                    setTimeout(() => {
                        navigate(-1);
                    }, 1500)
                } else toast.error("Khởi tạo thất bại! Vui lòng kiểm tra các trường nhập!");
            } catch (error) {
                toast.error('Failed');
                console.log(error);
            }
        },
        validationSchema: Yup.object({
            id: Yup.string().required('Please enter the id of product'),
            category_id: Yup.string().required('Please choose a category'),
            subCategory_id: Yup.string().required('Please choose a sub category'),
            name: Yup.string().required('Please enter a name'),
            origin: Yup.string().required('Please enter origin'),
            price: Yup.number().required('Please enter price').min(0, 'Wrong input'),
            status: Yup.number().required('Please enter status'),
            description: Yup.string().required('Please enter description'),
            stock: Yup.number().required('Please enter stock').min(0, 'Wrong input'),
            images: Yup.array().min(1).required(' Please choose at least one picture'),
        }),
        validateOnBlur: true,
    })

    const handleGetImage = (e) => {
        e.preventDefault();
        const files = Array.from(e.target.files);
        const images = files.map((item) => ({
            file: item,
            url: URL.createObjectURL(item as File)
        }))
        setImages((prevImages) => [...prevImages, ...images]);
        formData.setFieldValue('images', [...formData.values.images, ...images]);
    }

    const handleRemoveImage = (obj: img) => {
        setImages((prev) => prev.filter(item => item["file"] !== obj.file));
    }

    //get all categories
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get(endpoints.public.getAllCategories);
                if (response) setCategory(response.data);
                else toast.error('Failed to get categories!');
            } catch (err) {
                console.log(err);
                toast.error('Failed to fetch data!');
            }
        }
        fetchData()
    }, []);

    //get all subcategories from any category
    useEffect(() => {
        if (formData.values.category_id !== '') {
            const fetchData = async () => {
                try {
                    const id = formData.values.category_id;
                    const response = await apiClient(endpoints.public.getSubCategory(id));
                    if (response) setSubCategory(response.data);
                    else toast.error('Failed to get sub categories!');
                } catch (err) {
                    console.log(err);
                }
            }
            fetchData()
        }
    }, [formData.values.category_id]);

    if (isFetching) {
        return <Loading/>
    }

    return (
        <div className={'w-full h-full p-2 my-2 flex flex-col justify-start items-center'}>
            <form
                className={'w-full h-fit flex flex-col items-center justify-center'}
                onSubmit={(e) => {
                    e.preventDefault();
                    formData.handleSubmit(e);
                }}>
                <p className={'font-bold text-xl w-fit m-2 text-yellow-600 border-b-2 border-[rgb(var(--border-color))]'}>Tạo sản phẩm mới</p>

                {/*selection for category and subcategory*/}
                <fieldset
                    className={'w-full border border-gray-700 rounded-lg p-2 m-2 flex flex-col items-center justify-around'}>
                    <legend>Phân loại</legend>
                    <div className={'w-full flex flex-row items-center justify-center'}>
                        <fieldset className={'w-1/2'}>
                            <legend>Nhóm 1</legend>
                            <select name={'category_id'}
                                    className={'w-full'}
                                    onChange={formData.handleChange}
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
                           onChange={formData.handleChange}
                           onBlur={formData.handleBlur}/>
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
                           onBlur={formData.handleBlur}/>
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
                           onBlur={formData.handleBlur}/>
                </fieldset>
                {formData.errors.price && formData.touched.price && (
                    <p className={'text-red-600'}>
                        <small className={'text-red-600 italic'}>{formData.errors.price}</small>
                    </p>
                )}

                <fieldset
                    className={'w-full border border-gray-700 rounded-lg leading-8 m-2 flex flex-row items-center justify-between'}>
                    <legend>Mô tả</legend>
                    <textarea className={'w-full h-40 pl-2'} name={'description'} placeholder={'Mô tả sản phẩm'}
                              onChange={formData.handleChange}
                              onBlur={formData.handleBlur}></textarea>
                </fieldset>
                {formData.errors.description && formData.touched.description && (
                    <p className={'text-red-600'}>
                        <small className={'text-red-600 italic'}>{formData.errors.description}</small>
                    </p>
                )}

                {/*Choose any image here*/}
                <fieldset
                    className={'w-full border border-gray-700 rounded-lg leading-8 m-2 flex flex-row items-center justify-between'}>
                    <legend>Hình ảnh</legend>
                    <div className={'flex flex-row  flex-wrap items-center justify-start'}>
                        {images && images.map((item, i) => (
                            <div
                                className={'w-15 h-15 relative mx-1 border-indigo-500 border-2 rounded-lg flex item-center justify-center'}
                                key={i}>
                                {/*delete button here (remove image*/}
                                <button className={'absolute -top-2 -right-2'} type={'button'}
                                        onClick={() => handleRemoveImage(item)}><Bs.BsXCircleFill color={'red'}/>
                                </button>
                                <img className={'object-contain'} src={item.url} alt={'image'}/>
                            </div>
                        ))}
                        <input type={'file'} hidden={true} accept={'image/*'} id={'imageInput'} multiple={true}
                               onChange={(e) => {
                                   handleGetImage(e)
                               }}/>
                        <button type={'button'}
                                className={'w-15 h-15 m-1 rounded-lg flex justify-center items-center focus:outline-indigo-400 focus:outline-2 '}
                                onClick={() => {
                                    const input = document.getElementById("imageInput") as HTMLInputElement;
                                    if (input) {
                                        input.click();
                                    }
                                }}>
                            <Bs.BsPlusSquare className={'w-20 h-20'} color={'gray'}/>
                        </button>
                    </div>
                    {formData.errors.images && formData.touched.images && (
                        <p className={'text-red-600'}>
                            <small className={'text-red-600 italic'}>{formData.errors.images}</small>
                        </p>
                    )}
                </fieldset>

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
                                    onBlur={formData.handleBlur}>
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
                                   onBlur={formData.handleBlur}/>
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