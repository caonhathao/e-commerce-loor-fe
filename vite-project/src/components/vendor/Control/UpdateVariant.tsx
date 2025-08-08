import {Formik} from "formik";

import * as Yup from "yup";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Loading from "../../loading/Loading.tsx";
import endpoints from "../../../services/endpoints.tsx";
import apiClient from "../../../services/apiClient.tsx";
import {BsBoxArrowInLeft, BsGearWideConnected} from "react-icons/bs";
import UpdateAttribute from "./UpdateAttribute.tsx";
import {imageType, productVariantType} from "../../../utils/vendor.data-types.tsx";
import {attributesType} from "../../../utils/vendor.data-types.tsx";
import * as Bs from "react-icons/bs";
import {putData} from "../../../utils/functions.utils.tsx";

const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [data, setData] = useState<productVariantType | null>(null);
    const [isResponse, setIsResponse] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [openUpdateAttribute, setOpenUpdateAttribute] = useState(false);
    const [attribute, setAttribute] = useState<attributesType[]>([])

    const [notify, setNotify] = useState<string | null>(null);

    const [imageData, setImageData] = useState<string | null>(null);//store image in previous
    const [delImage, setDelImage] = useState<string | null>(null); //store image's id that will be deleted
    const [imgUpload, setImgUpload] = useState<imageType | null>(null);//store image to upload

    const handleUpdateAttribute = (id: string | undefined) => {
        if (id !== undefined) {
            setOpenUpdateAttribute(true);
        }else return;
    }

    const handleGetImage = ({e, setFieldValue}: {
        e: React.ChangeEvent<HTMLInputElement>;
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
    }) => {
        e.preventDefault();
        if (e.target.files?.[0] !== undefined) {
            const images = {
                file: e.target.files?.[0],
                url: URL.createObjectURL(e.target.files?.[0])
            }
            setImgUpload(images);
            setFieldValue('images', images);
        }
    }

    //Remove image:
    //1. Remove image from db or
    //2. Remove the image when it is added (while editing info)
    const handleRemoveImage = (obj?: string | undefined, type: string) => {
        if (type === 'db') {
            setImageData(null);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setDelImage(obj);
        } else if (type === 'upload') {
            setImgUpload(null);
        }
    }

    //fetch data of the current product
    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = params.id;
                let response;
                if (id !== undefined) {
                    response = await apiClient.get(endpoints.public.getVariantDetail(id));
                }
                if (response) setData(response.data);
                else {
                    toast.error('Failed to get product!');
                }
            } catch (e) {
                console.log(e);
            }
        }
        fetchData()
    }, [isSubmitted, isResponse]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = params.id
                let response;
                if (id !== undefined) {
                    response = await apiClient.post(endpoints.public.getAllAttributes, {id})
                }

                if (response && (response.status === 200)) {
                    setAttribute(response.data)
                } else toast.error('Failed to get attribute of product!')
            } catch (e) {
                toast.error('Failed to get attribute of product!');
                console.error(e)
            }
        }
        fetchData()
    }, []);

    useEffect(() => {
        if (data) {
            setImageData(data?.image_link);
        }
    }, [data]);

    useEffect(() => {
        if (notify !== null) {
            toast.error(notify, {autoClose: 1500})
            setTimeout(() => {
                setNotify(null)
            }, 2000)
        }
    }, [notify])

    if (!data) return <Loading/>;

    if (isSubmitted === true && isResponse === false) {
        return <Loading/>
    }

    return (
        <>
            <button type={'button'}
                    className={'absolute top-3 left-3 bg-gradient-to-b from-indigo-500 from-20% via-purple-500 to-pink-500 p-2.5 rounded-lg shadow-lg shadow-gray-500'}
                    onClick={() => navigate(-1)}>
                <BsBoxArrowInLeft size={20} color={'white'}/>
            </button>
            <div className={'w-[80%] h-full flex flex-col justify-center items-center relative'}>
                <Formik
                    initialValues={{
                        id: data ? data["id"] : '',
                        name: data ? data["name"] : 'unknown',
                        sku: data ? data['sku'] : '',
                        price: data ? data['price'] : 0,
                        stock: data ? data['stock'] : 0,
                        status: data ? data['status'] : 'OUT_OF_STOCK',
                        images: File || null,
                        deletedImages: []
                    }}
                    enableReinitialize={true}
                    validationSchema={Yup.object({
                        name: Yup.string().required('Tên sản phẩm là bắt buộc'),
                        sku: Yup.string().required('Yêu cầu phải có mã sku của sản phẩm'),
                        price: Yup.number().required('Bắt buộc phải có giá sản phẩm'),
                        stock: Yup.number().required('Bắt buộc phải có tồn kho')
                    })}
                    validateOnBlur={true}
                    onSubmit={async (values) => {
                        setIsSubmitted(true);
                        setIsResponse(false);
                        const data = new FormData();

                        data.append('name', values.name);
                        data.append('status', values.status.toString());
                        data.append('sku', values.sku);
                        data.append('price', values.price.toString());
                        data.append('stock', values.stock.toString());
                        data.append('deletedImages', JSON.stringify(delImage));

                        if (values.images !== null) {
                            data.append('images', values.images.file);
                        }
                        for (const [key, value] of data.entries()) {
                            if (value instanceof File) {
                                console.log(`${key}: File - name: ${value.name}, size: ${value.size}`);
                            } else {
                                console.log(`${key}: ${value}`);
                            }
                        }

                        let response;
                        if (params.id !== undefined) {
                            response = await putData(endpoints.brand.updateVariant(params.id), true, data);

                            if (response && response.status === 200) {
                                toast.success('Sản phẩm đã được cập nhật thành công!', {autoClose: 1000});
                                setIsSubmitted(false);
                                setIsResponse(true);
                            } else {
                                setNotify(response?.data?.message)
                                setIsSubmitted(false);
                                setIsResponse(true);
                            }
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
                          resetForm
                      }) => {
                        return (
                            <div className={'h-full w-full relative'}>

                                <form
                                    className={'w-full h-fit flex flex-col items-center justify-center'}
                                    onSubmit={handleSubmit}>
                                    <div className={'flex flex-row justify-center items-center'}>
                                        <p className={'font-bold text-lg w-fit m-2 text-yellow-600'}>
                                            Thông tin phiên bản
                                        </p>
                                        <BsGearWideConnected size={20} color={'var(--text-color)'}
                                                             onClick={() => handleUpdateAttribute(params.id)}/>
                                    </div>
                                    {/*Base information*/}
                                    <fieldset
                                        className={'w-full p-0 leading-8 border border-gray-700 rounded-lg m-2 flex flex-row items-center justify-between'}>
                                        <legend>ID</legend>
                                        <textarea className={'w-full p-2 overflow-clip'} name={'id'}
                                                  placeholder={'ID sản phẩm'}
                                                  disabled
                                                  value={values.id}></textarea>
                                    </fieldset>

                                    <fieldset
                                        className={'w-full p-0 leading-8 border border-gray-700 rounded-lg m-2 flex flex-row items-center justify-between'}>
                                        <legend>Mã SKU</legend>
                                        <input className={'w-full pl-2'} type={'text'} name={'sku'}
                                               placeholder={'sku sản phẩm'}
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
                                        <input className={'w-full pl-2'} type={'text'} name={'price'}
                                               placeholder={'Giá sản phẩm'}
                                               value={values.price}
                                               onChange={handleChange}
                                               onBlur={handleBlur}/>
                                    </fieldset>
                                    {errors.price && touched.price && (
                                        <p className={'text-red-600'}>
                                            <small className={'text-red-600 italic'}>{errors.price}</small>
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
                                                        defaultValue={data?.status}
                                                >
                                                    <option value={'IN_STOCK'}>Mở bán
                                                    </option>
                                                    <option value={'PRE_ORDER'}>Đặt trước
                                                    </option>
                                                    <option value={'OUT_OF_STOCK'}>Hết hàng</option>
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

                                    {/*Choose any image here*/}
                                    <fieldset
                                        className={'w-full border border-gray-700 rounded-lg leading-8 m-2 flex flex-row items-center justify-between'}>
                                        <legend>Hình ảnh</legend>
                                        <div className={'flex flex-row  flex-wrap items-center justify-start p-1'}>
                                            {imageData && imageData?.length !== 0 ? (
                                                    <div
                                                        className={'w-15 h-15 relative mx-1 border-indigo-500 border-2 rounded-lg flex item-center justify-center'}
                                                    >
                                                        {/*delete button here (remove image*/}
                                                        <button className={'absolute -top-2 -right-2'} type={'button'}
                                                                onClick={() => handleRemoveImage(imageData, 'db')}>
                                                            <Bs.BsXCircleFill
                                                                color={'red'}/>
                                                        </button>
                                                        <img className={'object-contain'} src={imageData}
                                                             alt={'image'}/>
                                                    </div>
                                                ) :
                                                imgUpload ? (
                                                    <div
                                                        className={'w-15 h-15 relative mx-1 border-indigo-500 border-2 rounded-lg flex item-center justify-center'}
                                                    >
                                                        {/*delete button here (remove image*/}
                                                        <button className={'absolute -top-2 -right-2'} type={'button'}
                                                                onClick={() => handleRemoveImage(undefined, 'upload')}>
                                                            <Bs.BsXCircleFill
                                                                color={'red'}/>
                                                        </button>
                                                        <img className={'object-contain'} src={imgUpload.url}
                                                             alt={'image'}/>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <input type={'file'} hidden={true} accept={'image/*'}
                                                               id={'imageInput'}
                                                               multiple={false}
                                                               onChange={(e) => {
                                                                   handleGetImage({e, setFieldValue})
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
                                                )}
                                        </div>
                                        {
                                            typeof errors.images === 'string' && touched.images && (
                                                <p className={'text-red-600'}>
                                                    <small className={'text-red-600 italic'}>{errors.images}</small>
                                                </p>
                                            )
                                        }
                                    </fieldset>

                                    <fieldset
                                        className={'w-full border border-gray-700 rounded-lg p-2 m-2 flex flex-row items-center justify-between flex-wrap text-sm text-gray-400'}>
                                        <legend>Thuộc tính sản phẩm</legend>
                                        {attribute.length > 0 ? attribute.map((key, index) => (
                                            <p key={index}><strong>{key.name_att}:</strong> {key.value_att}</p>
                                        )) : <p>Sản phẩm chưa có thuộc tính đính kèm</p>}
                                    </fieldset>
                                    <div className={'grid grid-cols-3 grid-rows-1 gap-2 mt-5'}>
                                        <button type={'button'}
                                                className={'bg-purple-500 p-2 rounded-4xl text-white font-bold flex justify-center items-center'}
                                                onClick={() => navigate(-1)}>
                                            Thoát
                                        </button>
                                        <button type={'button'}
                                                className={'bg-purple-500 p-2 rounded-4xl text-white font-bold flex justify-center items-center'}
                                                onClick={() => resetForm()}>
                                            Cài lại
                                        </button>
                                        <button type={'submit'}
                                                className={'bg-purple-500 p-2 rounded-4xl text-white font-bold flex justify-center items-center'}
                                        >
                                            Cập nhật
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )
                            ;
                    }}
                </Formik>
                <div className={'flex flex-row justify-center items-center mt-5'}>
                    <button type={'button'}
                            className={'p-2 border-2 border-red-500 rounded-lg'}>Xóa phiên bản
                    </button>
                </div>
                {openUpdateAttribute ? <UpdateAttribute setOpen={setOpenUpdateAttribute}/> : null}
                <ToastContainer/>
            </div>
        </>
    )
}
export default UpdateProduct;