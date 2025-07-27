//in manage page, show the list of products
//on the top, it has some functions: create new, edit (update), disable or delete (we can group by option)
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import {useEffect, useState} from "react";
import * as Bs from 'react-icons/bs'
import {useProduct} from "../../../context/ProductContext.tsx";
import Loading from "../../../components/loading/Loading.tsx";
import {useFormik} from "formik";
import endpoints from "../../../services/endpoints.tsx";
import apiClient from "../../../services/apiClient.tsx";
import {getAccessToken} from "../../../services/tokenStore.tsx";
import {Pagination, Stack} from "@mui/material";
import {fetchDataWithQuery} from "../../../utils/functions.utils.tsx";
import {useAuth} from "../../../context/AuthContext.tsx";
import {productListDetailType, productListType} from "../../../utils/vendor.data-types.tsx";

const VendorManage = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<productListType>();
    const {setProduct} = useProduct();

    const {user} = useAuth()

    //search product
    const formData = useFormik({
        initialValues: {
            keyword: ''
        },
        onSubmit: async () => {
            try {
                const response = await apiClient.post(endpoints.public.getProductByKeyword(formData.values.keyword))
                if (response.status === 200) {
                    toast.success(response.data.message, {autoClose: 1500});
                    setTimeout(() => setData(response.data), 1600);
                } else {
                    toast.error(response.data.message)
                }
            } catch (error) {
                console.log(error)
            }
        }
    })

    const createNewBtn = (url: string) => {
        //change the status to call the component
        navigate(url);
    }

    const handleItem = (obj: productListDetailType) => {
        setProduct(obj)
        updateItem(obj);
    }

    const updateItem = (obj: productListDetailType) => {
        if (obj) {
            navigate('/vendor/manage/show-variant/' + obj.id);
        } else toast.error("Failed to get data!");
    }

    //get all products
    useEffect(() => {
        if (getAccessToken() !== '' || getAccessToken() !== undefined || getAccessToken() !== null) {
            fetchDataWithQuery(endpoints.brand.getAllProducts, setData, 1, 6)
        }
    }, []);

    if (data === undefined) return <Loading/>

    return (
        <div className={'w-[90%] h-screen flex flex-col justify-start items-center'}>
            <div className={'w-full flex flex-row justify-between items-center mb-2 gap-2'}>
                <div className={'bg-[rgb(var(--main-color))] text-white rounded-full p-2 w-[20%] text-center'}
                     onClick={() => createNewBtn('/vendor/manage/create')}>Tạo
                </div>

                <form className={'flex flex-row justify-center items-center w-[90%]'}
                      onSubmit={formData.handleSubmit}>
                    <input type={'text'} name={'keyword'} placeholder={'keyword'}
                           className={'w-full border border-gray-600 p-2 rounded-4xl'}
                           onChange={formData.handleChange}/>
                    <button type={'submit'}
                            className={'ml-2 border-2 border-[rgb(var(--main-color))] rounded-xl p-2 bg-white  focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500 active:bg-indigo-500'}>
                        <Bs.BsSearch size={20}/>
                    </button>
                </form>
            </div>
            <div className={'w-full h-fit text-center'}>
                <h3 className={'mt-2 font-bold text-yellow-500 text-lg'}>Danh sách sản phẩm</h3>
                <div className={'w-full h-fit flex items-center justify-center'}>
                    {data ?
                        <table className={'w-full table-auto border border-white'}>
                            <thead>
                            <tr className={' bg-indigo-300'}>
                                <th className={'border-1 border-y-white border-x-white p-1'}>ID</th>
                                <th className={'border-1 border-y-white border-x-white p-1'}>TÊN</th>
                                <th className={'border-1 border-y-white border-x-white p-1'}>TÌNH TRẠNG</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data && data.data.map((item: productListDetailType, i) => (
                                <tr key={i} className={`h-full ${i % 2 === 0 ? `bg-indigo-200` : `bg-indigo-300`}`}
                                    onClick={() => handleItem(item)}
                                >
                                    <td className={'min-h-40 max-h-40  border-1 border-b-white border-x-white p-1'}>{item["id"]}</td>
                                    <td className={'break-words border-1 border-y-white border-x-white p-1'}>
                                        <p className={'text-center min-h-40 max-h-40 overflow-hidden'}>{item["name"]}</p>
                                    </td>
                                    <td className={'min-h-40 max-h-40  border-1 border-b-white border-x-white p-1'}>
                                        <div className={'flex flex-row justify-center items-center'}>
                                            {item["status"] === 'OPENED' ?
                                                <p className={'text-green-600 font-bold'}>MỞ BÁN</p> :
                                                <p className={'text-red-500 font-bold'}>TẠM NGƯNG</p>}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table> : null}
                </div>
                {/*add a button list here*/}
            </div>
            {data !== null && data !== undefined ? (
                <Stack spacing={2} alignItems={'center'}>
                    <Pagination count={data?.total_pages}
                                page={data?.current_page}
                                onChange={(_e, value) => fetchDataWithQuery(endpoints.public.getAllProductsFromBrand(user?.id), setData, value, 6)}/>
                </Stack>
            ) : null}
            <ToastContainer/>
        </div>
    )
}
export default VendorManage