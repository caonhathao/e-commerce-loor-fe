import {useFormik} from "formik";
import * as Yup from "yup";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import Loading from "../../loading/Loading.tsx";
import * as Bs from "react-icons/bs";

interface img {
    file: File,
    url: string,
}

const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [data, setData] = useState(null);
    const [isResponse, setIsResponse] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [imageData, setImageData] = useState([]);//store image in previous
    const [imgUpload, setImgUpload] = useState<img[]>([]);//store image to upload

    const formattedTags = (str: string) => {
        return str.replace(/[{}"]/g, '')
    }

    const formData = useFormik({
        initialValues: {
            id: '',
            category_id: '',
            subCategory_id: '',
            name: '',
            origin: '',
            price: '',
            status: '',
            description: '',
            stock: '',
            promotion: '',
            tags: '',
            images: [],//new image to upload
            deletedImages: [] //store image'id that will be deleted
        },
        onSubmit: async (values) => {
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
                dataSend.append('promotion', values.promotion)
                dataSend.append('tags', values.tags)
                dataSend.append('deletedImages', JSON.stringify(values.deletedImages))

                values.images.forEach(image => {
                    dataSend.append('images', image["file"])
                })

                const id = formData.values.id;
                const url = import.meta.env.VITE_API_HOST + import.meta.env.VITE_SERVER_PORT + import.meta.env.VITE_API_U_PRODUCT + id;
                const response = await axios.put(url, dataSend, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
                    }
                });
                if (response.status === 200) {
                    setIsResponse(true);
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

    const handleGetImage = (e) => {
        e.preventDefault();
        const files = Array.from(e.target.files);
        const images = files.map((item) => ({
            file: item,
            url: URL.createObjectURL(item as File)
        }))
        setImgUpload((prevImgUpload) => [...prevImgUpload, ...images]);
        formData.setFieldValue('images', [...formData.values.images, ...images]);
    }

    //remove image:
    //1. Remove image from db or
    //2. Remove image when it added (while edit info)
    const handleRemoveImage = (obj: never, type: string) => {
        console.log(type);
        if (type === 'db')
            setImageData((prev) => prev.filter(item => item["image_id"] !== obj["image_id"]));
        else if (type === 'upload') {
            console.log(imgUpload);
            setImgUpload((prev) => prev.filter(item => item["file"] !== obj["file"]));
        }
    }

    const handleResetForm = () => {
        console.log('reset form');
        formData.setValues({
            id: data ? data["id"] : "",
            category_id: data ? data['category_id'] : '',
            subCategory_id: data ? data['subcategory_id'] : '',
            name: data ? data['name'] : '',
            origin: data ? data['origin'] : '',
            price: data ? data['price'] : '',
            status: data ? data['status'] : '',
            description: data ? data['description'] : '',
            stock: data ? data['stock'] : '',
            promotion: data ? data['promotion'] : '',
            tags: data ? formattedTags(data['tags']) : '',
            images: [],
            deletedImages: []
        })
        setImageData(data['imageProducts'])
    }

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
        if (category !== null) {
            const fetchData = async () => {
                try {
                    const id = data['category_id'];
                    const url = import.meta.env.VITE_API_HOST + import.meta.env.VITE_SERVER_PORT + import.meta.env.VITE_API_G_SUBCATEGORY + id;
                    const response = await axios.get(url);
                    if (response) setSubCategory(response.data);
                    else toast.error('Failed to get sub categories!');
                } catch (err) {
                    console.log(err);
                    toast.error('Failed to get sub categories!');
                }
            }
            fetchData()
        }
    }, [category]);

    useEffect(() => {
        if (data !== null) {
            formData.setFieldValue('id', data["id"]);
            formData.setFieldValue('category_id', data["category_id"]);
            formData.setFieldValue('subCategory_id', data["subcategory_id"]);
            formData.setFieldValue('name', data["name"]);
            formData.setFieldValue('origin', data["origin"]);
            formData.setFieldValue('price', data["price"]);
            formData.setFieldValue('status', data["status"]);
            formData.setFieldValue('description', data["description"]);
            formData.setFieldValue('stock', data["stock"]);
            formData.setFieldValue('promotion', data["promotion"]);
            formData.setFieldValue('tags', formattedTags(data["tags"]));
            setImageData(data['imageProducts'])
        }
    }, [data]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = params.id;
                const url = import.meta.env.VITE_API_HOST + import.meta.env.VITE_SERVER_PORT + import.meta.env.VITE_API_G_A_PRODUCT + id;
                const response = await axios.get(url);
                if (response) setData(response.data);
                else toast.error('Failed to get sub categories!');
            } catch (e) {
                console.log(e);
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        // console.log('data:', data);
        // console.log('formData:', formData.values);
        // console.log('subCategory_id:', subCategory);
        console.log('Image upload:', imgUpload);
    }, [imgUpload]);

    if (category.length === 0 || subCategory.length === 0 || data === null) return (
        <>
            <Loading/>
        </>
    )

    if (isSubmitted && !isResponse) {
        return <Loading/>
    }

    return (
        <div className={'w-auto h-full m-2 p-2 my-2 flex flex-col justify-start items-center'}>
            <form
                className={'w-full h-fit flex flex-col items-center justify-center'}
                onSubmit={(e) => {
                    e.preventDefault();
                    setIsSubmitted(true);
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
                                    value={formData.values.subCategory_id ? formData.values.subCategory_id : data['subcategory_id']}
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


                {/*Choose any image here*/}
                <fieldset
                    className={'w-full border border-gray-700 rounded-lg leading-8 m-2 flex flex-row items-center justify-between'}>
                    <legend>Hình ảnh</legend>
                    <div className={'flex flex-row  flex-wrap items-center justify-start'}>
                        {imageData && imageData.map((item, i) => (
                            <div
                                className={'w-15 h-15 relative mx-1 border-indigo-500 border-2 rounded-lg flex item-center justify-center'}
                                key={i}>
                                {/*delete button here (remove image*/}
                                <button className={'absolute -top-2 -right-2'} type={'button'}
                                        onClick={() => handleRemoveImage(item, 'db')}><Bs.BsXCircleFill color={'red'}/>
                                </button>
                                <img className={'object-contain'} src={item["image_link"]} alt={'image'}/>
                            </div>
                        ))}
                        {imgUpload && imgUpload.map((item, i) => (
                            <div
                                className={'w-15 h-15 relative mx-1 border-indigo-500 border-2 rounded-lg flex item-center justify-center'}
                                key={i}>
                                {/*delete button here (remove image*/}
                                <button className={'absolute -top-2 -right-2'} type={'button'}
                                        onClick={() => handleRemoveImage(item, 'upload')}><Bs.BsXCircleFill
                                    color={'red'}/>
                                </button>
                                <img className={'object-contain'} src={item["url"]} alt={'image'}/>
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

                {/*The status of data*/}
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

                <div className={'flex flex-row justify-around items-center'}>
                    <button type={'button'}
                            className={'bg-purple-500 p-2 rounded-4xl text-white font-bold flex justify-center items-center'}
                            onClick={() => navigate(-1)}>
                        Cancel
                    </button>
                    <button type={'button'}
                            className={'bg-purple-500 p-2 rounded-4xl text-white font-bold mx-5 flex justify-center items-center'}
                            onClick={handleResetForm}>
                        Reset
                    </button>
                    <button type={'submit'}
                            className={'bg-purple-500 p-2 rounded-4xl text-white font-bold flex justify-center items-center'}>
                        Submit
                    </button>
                </div>
            </form>
            <ToastContainer/>
        </div>
    )
}
export default UpdateProduct;