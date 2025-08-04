import {Formik} from "formik";
import * as Yup from "yup";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Loading from "../../loading/Loading.tsx";
import * as Bs from "react-icons/bs";
import apiClient from "../../../services/apiClient.tsx";
import endpoints from "../../../services/endpoints.tsx";
import {BsBoxArrowInLeft} from "react-icons/bs";
import {imageType, imgStored, productDataType} from "../../../utils/vendor.data-types.tsx";
import {fetchData} from "../../../utils/functions.utils.tsx";

interface FormValues {
    id: string;
    category_id: string;
    subcategory_id: string;
    name: string;
    origin: string;
    status: number | string;
    description: string;
    average_price: number;
    promotion: number | string;
    tags: string;
    images: imageType[];
    deletedImages: string[];
}

const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [data, setData] = useState<productDataType>();
    const [isResponse, setIsResponse] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [imageData, setImageData] = useState<imgStored[]>([]);//store image in previous
    const [delImage, setDelImage] = useState<string[]>([]); //store image's id that will be deleted
    const [imgUpload, setImgUpload] = useState<imageType[]>([]);//store image to upload

    const handleGetImage = ({e, setFieldValue, values}: {
        e: React.ChangeEvent<HTMLInputElement>;
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
        values: FormValues;
    }) => {

        e.preventDefault();
        const files = Array.from(e.target.files ?? []);
        const images = files.map((item) => ({
            file: item,
            url: URL.createObjectURL(item as File)
        }))
        setImgUpload((prevImgUpload) => [...prevImgUpload, ...images]);
        setFieldValue('images', [...values.images, ...images]);
    }

    //Remove image:
    //1. Remove image from db or
    //2. Remove the image when it is added (while editing info)
    const handleRemoveImage = (obj: imgStored | imageType, type: string) => {
        if (type === 'db') {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setImageData((prev) => prev.filter(item => item["image_id"] !== obj["image_id"]));
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setDelImage(prev => [...prev, obj["image_id"]]);
        } else if (type === 'upload') {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setImgUpload((prev) => prev.filter(item => item["file"] !== obj["file"]));
        }
    }

    const handleGetSubCategory = async (id: string) => {
        try {
            if (id !== '0') {
                fetchData(endpoints.public.getAllSubCategories(id), false, setSubCategory, 'Lấy danh mục thất bại!')
            } else setSubCategory([]);
        } catch (err) {
            console.log(err);
            toast.error('Failed to get sub category!');
        }
    }

    //fetch data of the current product
    useEffect(() => {
        try {
            if (params.id !== undefined) {
                const id = params.id;
                fetchData(endpoints.brand.getProductByIdFromBrand(id), false, setData, 'Lấy thông tin thất bại!')
            }
        } catch (e) {
            console.log(e);
        }
    }, [params.id, isSubmitted, isResponse]);

    //fetch data of categories
    useEffect(() => {
        fetchData(endpoints.public.getAllCategories, false, setCategory, 'Có lỗi xảy ra!')
    }, []);

    useEffect(() => {
        if (category !== null && data !== null)
            if (data) {
                const id = data.category_id
                fetchData(endpoints.public.getAllSubCategories(id), false, setSubCategory, 'Có lỗi xảy ra')
            }
    }, [category, data])

    useEffect(() => {
        if (data) {
            setImageData(data.ImageProducts ?? []);
        }
    }, [data]);

    if (category.length === 0 || subCategory.length === 0 || data === null) return <Loading/>

    if (isSubmitted && !isResponse) {
        return <Loading/>
    }

    return (
        <div className={'min-w-full max-w-full h-full m-2 p-2 my-2 flex flex-col justify-start items-center'}>
            <div
                className={'absolute top-5 left-5 bg-gradient-to-b from-indigo-500 from-20% via-purple-500 to-pink-500 p-2.5 rounded-lg shadow-lg shadow-gray-500'}
                onClick={() => navigate(-1)}><BsBoxArrowInLeft size={20} color={'white'}/>
            </div>
            <Formik
                initialValues={{
                    id: data ? data["id"] : '',
                    category_id: data ? data['category_id'] : '',
                    subcategory_id: data ? data['subcategory_id'] : '',
                    name: data ? data['name'] : '',
                    origin: data ? data['origin'] : '',
                    status: data ? data['status'] : '',
                    average_price: data ? data['average_price'] : 0,
                    description: data ? data['description'] : '',
                    promotion: data ? data['promotion'] : '',
                    tags: data ? data['tags'] : '',
                    images: [],         // new image to upload
                    deletedImages: []   // store image ids to delete
                }}
                enableReinitialize={true}
                validationSchema={Yup.object({
                    category_id: Yup.string().required('Please choose a category'),
                    subcategory_id: Yup.string().required('Please choose a sub category'),
                    name: Yup.string().required('Please enter a name'),
                    origin: Yup.string().required('Please enter origin'),
                    description: Yup.string().required('Please enter description'),
                    average_price: Yup.number().required('Please enter price'),
                })}
                validateOnBlur={true}
                onSubmit={async (values) => {
                    setIsSubmitted(true);
                    setIsResponse(false)
                    try {
                        const data = new FormData();

                        data.append('id', values.id);
                        data.append('category_id', values.category_id);
                        data.append('subcategory_id', values.subcategory_id);
                        data.append('name', values.name);
                        data.append('origin', values.origin);
                        data.append('status', values.status.toString());
                        data.append('average_price', values.average_price.toString());
                        data.append('description', values.description);
                        data.append('promotion', values.promotion?.toString() || '0');
                        data.append('tags', values.tags);
                        data.append('deletedImages', JSON.stringify(delImage));

                        if (values.images.length > 0) {
                            values.images.forEach((image: { file: string | Blob; }) => {
                                data.append('images', image.file);
                            });
                        }

                        const response = await apiClient.put(endpoints.brand.updateProduct(values.id), data);

                        if (response) {
                            setIsSubmitted(false);
                            setIsResponse(true);
                            if (response.status === 200) {
                                toast.success('Sản phẩm đã được cập nhật thành công!', {autoClose: 1000});
                            } else {
                                toast.error('Cập nhật thất bại! Vui lòng kiểm tra các trường nhập!');
                            }
                        }
                    } catch (error) {
                        toast.error('Failed');
                        console.log(error);
                    }
                }}
            >
                {({
                      values,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      setFieldValue,
                      errors,
                      touched,
                      resetForm,
                  }) => {
                    return (
                        <form
                            className={'w-full h-fit flex flex-col items-center justify-center'}
                            onSubmit={handleSubmit}>
                            <h3 className={'font-bold text-lg w-fit m-2 text-[var(--text-color)] border-b-2 border-[var(--text-color)] p-1'}>THÔNG
                                TIN SẢN PHẨM</h3>

                            {/*selection for category and subcategory*/}
                            <fieldset
                                className={'w-full border border-gray-700 rounded-lg p-2 m-2 flex flex-col items-center justify-around'}>
                                <legend>Phân loại</legend>
                                <div className={'w-full flex flex-row items-center justify-center'}>
                                    <fieldset className={'w-1/2'}>
                                        <legend>Nhóm 1</legend>
                                        <select name={'category_id'}
                                                className={'w-full'}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    handleGetSubCategory(e.target.value)
                                                }}
                                                value={values.category_id}
                                                onBlur={handleBlur}>
                                            <option value={'0'}>None</option>
                                            {category && category.map((item, i) => (
                                                <option key={i} value={item["id"]}
                                                >{item["name"]}</option>
                                            ))}
                                        </select>
                                    </fieldset>

                                    <fieldset className={'w-1/2'}>
                                        <legend>Nhóm 2</legend>
                                        <select name={'subCategory_id'}
                                                className={'w-full'}
                                                onChange={handleChange}
                                                value={values.subcategory_id ? values.subcategory_id : data?.subcategory_id}
                                                onBlur={handleBlur}>
                                            <option value={'0'}>None</option>
                                            {subCategory && subCategory.map((item, i) => (
                                                <option key={i} value={item["id"]}
                                                >{item["name"]}</option>
                                            ))}
                                        </select>
                                    </fieldset>
                                </div>

                                <div className={'w-full flex flex-row items-center justify-center'}>
                                    {errors.category_id && touched.category_id && (
                                        <p className={'text-red-600'}>
                                            <small
                                                className={'text-red-600 italic'}>{errors.category_id}</small>
                                        </p>
                                    )}
                                    {errors.subcategory_id && touched.subcategory_id && (
                                        <p className={'text-red-600'}>
                                            <small
                                                className={'text-red-600 italic'}>{errors.subcategory_id}</small>
                                        </p>
                                    )}
                                </div>
                            </fieldset>

                            {/*Base information*/}
                            <fieldset
                                className={'w-full p-0 leading-8 border border-gray-700 rounded-lg m-2 flex flex-row items-center justify-between'}>
                                <legend>ID</legend>
                                <textarea className={'w-full h-full pl-2'}
                                          readOnly={true}
                                          value={values.id}></textarea>
                            </fieldset>
                            {errors.id && touched.id && (
                                <p className={'text-red-600'}>
                                    <small className={'text-red-600 italic'}>{errors.id}</small>
                                </p>
                            )}

                            <fieldset
                                className={'w-full p-0 leading-8 border border-gray-700 rounded-lg m-2 flex flex-row items-center justify-between'}>
                                <legend>Tên</legend>
                                <textarea className={'w-full pl-2'} name={'name'}
                                          placeholder={'Tên sản phẩm'}
                                          value={values.name}
                                          onChange={handleChange}
                                          onBlur={handleBlur}></textarea>
                            </fieldset>
                            {errors.name && touched.name && (
                                <p className={'text-red-600'}>
                                    <small className={'text-red-600 italic'}>{errors.name}</small>
                                </p>
                            )}

                            <fieldset
                                className={'w-full border border-gray-700 rounded-lg leading-8 m-2 flex flex-row items-center justify-between'}>
                                <legend>Xuất xứ</legend>
                                <input className={'w-full pl-2'} type={'text'} name={'origin'}
                                       placeholder={'Nguồn gốc sản phẩm'}
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       value={values.origin}/>
                            </fieldset>
                            {errors.origin && touched.origin && (
                                <p className={'text-red-600'}>
                                    <small className={'text-red-600 italic'}>{errors.origin}</small>
                                </p>
                            )}

                            <fieldset
                                className={'w-full border border-gray-700 rounded-lg leading-8 m-2 flex flex-row items-center justify-between'}>
                                <legend>Mô tả</legend>
                                <textarea className={'w-full pl-2'} name={'description'} placeholder={'Mô tả sản phẩm'}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.description}></textarea>
                            </fieldset>
                            {errors.description && touched.description && (
                                <p className={'text-red-600'}>
                                    <small className={'text-red-600 italic'}>{errors.description}</small>
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
                                                    onClick={() => handleRemoveImage(item, 'db')}><Bs.BsXCircleFill
                                                color={'red'}/>
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
                                    <input type={'file'} hidden={true} accept={'image/*'} id={'imageInput'}
                                           multiple={true}
                                           onChange={(e) => {
                                               handleGetImage({e, setFieldValue, values})
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
                                {typeof errors.images === 'string' && touched.images && (
                                    <p className={'text-red-600'}>
                                        <small className={'text-red-600 italic'}>{errors.images}</small>
                                    </p>
                                )}
                            </fieldset>

                            {/*The status of data*/}
                            <fieldset
                                className={'w-full border border-gray-700 rounded-lg p-2 m-2 flex flex-row items-center justify-between'}>
                                <legend>Tình trạng hàng hóa</legend>
                                <div className={'w-1/2'}>
                                    <fieldset>
                                        <legend>Tình trạng</legend>
                                        <select name={'status'}
                                                className={'w-full'}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.status}>
                                            <option value={'CLOSED'}>Tạm ngưng</option>
                                            <option value={'OPENED'}>Mở bán</option>
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
                                        <input className={'w-full pl-2'} type={'number'} name={'stock'} disabled={true}
                                               value={data ? data['stock'] : '0'}/>
                                    </fieldset>
                                </div>
                            </fieldset>

                            <fieldset
                                className={'w-full border border-gray-700 rounded-lg leading-8 m-2 flex flex-row items-center justify-between'}>
                                <legend>Giá chung</legend>
                                <input className={'w-full pl-2'} type={'text'} name={'average_price'}
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       value={values.average_price}/>
                            </fieldset>
                            {errors.average_price && touched.average_price && (
                                <p className={'text-red-600'}>
                                    <small className={'text-red-600 italic'}>{errors.average_price}</small>
                                </p>
                            )}

                            <fieldset
                                className={'w-full border border-gray-700 rounded-lg leading-8 m-2 flex flex-row items-center justify-between'}>
                                <legend>Khuyến mãi</legend>
                                <input className={'w-full pl-2'} type={'number'} name={'promotion'}
                                       placeholder={'Phần trăm khuyến mãi - để trống = 0'}
                                       onChange={handleChange}/>
                            </fieldset>

                            <fieldset
                                className={'w-full border border-gray-700 rounded-lg leading-8 m-2 flex flex-col items-start justify-between'}>
                                <legend>Từ khóa</legend>
                                <small className={'pl-2 text-red-600'}>Tối đa 200 từ, cách nhau bởi dấu ','</small>
                                <input className={'w-full pl-2'} type={'text'} name={'tags'}
                                       placeholder={'Nhập các từ khóa gợi ý tìm kiếm'}
                                       onChange={handleChange}
                                       value={values.tags}
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
                                        onClick={() => {
                                            setImageData(data ? data['ImageProducts'] : [])
                                            setDelImage([]);
                                            resetForm()
                                        }}
                                >
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