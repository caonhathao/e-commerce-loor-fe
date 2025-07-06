//in manage page, show the list of products
//on the top, it has some functions: create new, edit (update), disable or delete (we can group by option)
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import {useEffect, useState} from "react";
import {io} from 'socket.io-client'
import JWTDecode from "../../../security/JWTDecode.tsx";
import * as Bs from 'react-icons/bs'
import {useProduct} from "../../../context/ProductContext.tsx";
import AuthenticateBox from "../../../components/authenticate/AuthenticateBox.tsx";
import Loading from "../../../components/loading/Loading.tsx";
import {useFormik} from "formik";
import endpoints from "../../../services/endpoints.tsx";
import apiClient from "../../../services/apiClient.tsx";
import {getAccessToken} from "../../../services/tokenStore.tsx";
import {Pagination, Stack} from "@mui/material";

const socket = io(endpoints.system.socketConnection, {
    withCredentials: true,
    transports: ['websocket', 'polling'],
});

interface productType {
    id: string,
    brand_id: string,
    category_id: string,
    subcategory_id: string,
    name: string,
    image_products: {
        image_link: string,
    }[],
    average_price: string,
    status: string,
    origin: string,
    stock: number,
}

interface dataType {
    current_page: number,
    total_pages: number,
    current_items: number,
    total_items: number,
    data: productType[]
}

const VendorManage = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<dataType>();
    const {product, setProduct} = useProduct();

    const [isDelete, setIsDelete] = useState(false); //open delete function
    const [isAllow, setIsAllow] = useState<boolean>(false); //allow deleting item
    const [sortStatus, setSortStatus] = useState<boolean>(false); //sort:follow status open or close

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

    const handleItem = (obj: object) => {
        if (isDelete) {
            deleteItem(obj);
        } else {
            setProduct(obj)
            updateItem(obj);
        }
    }

    const updateItem = (obj: object) => {
        if (obj) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            navigate('/vendor/manage/show-variant/' + obj.id);
        } else toast.error("Failed to get data!");
    }

    const deleteItem = (obj: object) => {
        setProduct(obj);
    }

    const handleSortItem = () => {
        //if sort follows status open
        if (sortStatus) {
            setSortStatus(false);
            setData(prev => {
                if (!prev) return prev;

                const temp = [...prev.data];
                const sorted = temp.sort((a, b) => {
                    if (a.stock > 0 && b.stock > 0) {
                        return b.status > a.status;
                    } else {
                        return b.stock - a.stock;
                    }
                });

                return {...prev, data: sorted};
            });

        } else {
            setSortStatus(true);
            setData(prev => {
                if (!prev) return prev;

                const temp = [...prev.data];
                const sorted = temp.sort((a, b) => {
                    if (a.stock > 0 && b.stock > 0) {
                        return a.status > b.status;
                    } else {
                        return a.stock - b.stock;
                    }
                });

                return {...prev, data: sorted};
            });
        }
    }

    const fetchData = async (page: number, limit: number | 10) => {
        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const id = JWTDecode(getAccessToken()).id;
            const response = await apiClient.get(endpoints.public.getAllProductsFromBrand(id), {
                params: {
                    page: page,
                    limit: limit
                }
            })

            if (response && response.status === 200) {
                console.log(response.data)
                toast.success('Load data successfully.', {
                    toastId: 'loadDataToast',
                    position: "bottom-right",
                    autoClose: 1400
                });
                setTimeout(() => {
                    setData(response.data)

                }, 1500)
            } else console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    //get all products
    useEffect(() => {
        fetchData(1, 10);
    }, []);

    //delete (remove) product permanent
    useEffect(() => {
        if (isAllow) {
            const fetch = async () => {
                try {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    const response = await apiClient.post(endpoints.brand.deleteProduct(product.id))

                    if (response) {
                        toast.success('Xóa sản phẩm thanh công', {autoClose: 1000});
                        setTimeout(() => {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error
                            setData((prev) => prev.filter(item => item["id"] !== product["id"]));
                            setProduct(null)
                        }, 1500)
                    }

                } catch (e) {
                    console.error('Failed to delete', e);
                }
            }
            fetch();
        }
    }, [isAllow]);

    useEffect(() => {
        socket.on('delete-product', ({id}) => {
            setData(prev => prev ? {...prev, data: prev.data.filter(item => item.id !== id)} : prev);
        })
        socket.on('search-product', ({results}) => {
            setData(results)
        })
        return () => {
            socket.off('delete-product');
            socket.off('search-product');
        }
    }, []);

    if (data === undefined) return <Loading/>

    return (
        <div className={'w-80 h-screen flex flex-col justify-start items-center'}>
            <div className={'w-fit h-fit grid grid-cols-2 grid-rows-2 gap-4 text-black mb-2'}>

                <div className={'border border-gray-600 rounded-4xl flex items-center justify-center p-1'}
                     onClick={() => createNewBtn('/vendor/manager/create')}>Tạo mới
                </div>
                <div
                    className={`border border-gray-600 rounded-4xl flex items-center justify-center p-1 ${isDelete ? `text-white bg-indigo-500 border-indigo-500 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500` : ``}`}
                    onClick={() => {
                        if (!isDelete) {
                            toast.success('Vui lòng chọn 1 sản phẩm để xóa', {autoClose: 1000});
                        }
                        setIsDelete(!isDelete);
                    }}>Xóa
                </div>

                <div className={'col-span-2'}>
                    <form className={'flex flex-row justify-center items-center'}
                          onSubmit={formData.handleSubmit}>
                        <input type={'text'} name={'keyword'} placeholder={'keyword'}
                               className={'border border-gray-600 p-2 rounded-4xl'}
                               onChange={formData.handleChange}/>
                        <button type={'submit'}
                                className={'ml-2 border border-gray-600 rounded-xl p-2 bg-white  focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500 active:bg-indigo-500'}>
                            <Bs.BsSearch size={20}/>
                        </button>
                    </form>
                </div>
            </div>
            <div className={'w-lg h-fit text-center'}>
                <h3 className={'mt-2 font-bold text-yellow-500 text-lg'}>Danh sách sản phẩm</h3>
                <div className={'w-full h-fit flex items-center justify-center'}>
                    {data ?
                        <table className={'max-w-80 table-auto border border-white'}>
                            <thead>
                            <tr className={' bg-indigo-300'}>
                                <th className={'border-1 border-y-white border-x-white p-1'}>ID</th>
                                <th className={'border-1 border-y-white border-x-white p-1'}>TÊN</th>
                                <th className={'border-1 border-y-white border-x-white p-1'}
                                    onClick={handleSortItem}>STATUS
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {data && data.data.map((item, i) => (
                                <tr key={i} className={`h-full ${i % 2 === 0 ? `bg-indigo-200` : `bg-indigo-300`}`}
                                    onClick={() => handleItem(item)}
                                >
                                    <td className={'h-full flex-col items-center justify-center border-1 border-b-white border-x-white p-1'}>{item["id"]}</td>
                                    <td className={'break-words border-1 border-y-white border-x-white p-1'}>
                                        <p className={'text-left min-h-40 max-h-40 overflow-hidden'}>{item["name"]}</p>
                                    </td>
                                    <td className={'h-full border-1 border-b-white border-x-white p-1'}>
                                        <div className={'flex flex-row justify-center items-center'}>
                                            {item["status"] === 'OPENED' ?
                                                <Bs.BsBanFill
                                                    className={'shadow shadow-gray-600 rounded-4xl drop-shadow-xl'}
                                                    color={'red'} size={25}/> : (item['stock'] === 0 ?
                                                    <Bs.BsExclamationCircleFill
                                                        className={'shadow shadow-gray-600 rounded-4xl drop-shadow-xl'}
                                                        color={'#5a3f3f'} size={25}/> :
                                                    <Bs.BsCheckCircleFill
                                                        className={'shadow shadow-gray-600 rounded-4xl drop-shadow-xl'}
                                                        color={'green'} size={25}/>)}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table> : null}
                </div>
                {/*add button list here*/}
            </div>
            {data !== null && data !== undefined ? (
                <Stack spacing={2} alignItems={'center'}>
                    <Pagination count={data?.total_pages}
                                page={data?.current_page}
                                onChange={(_e, value) => fetchData(value, 10)}/>
                </Stack>
            ) : null}
            {isDelete && product !== null ?
                <AuthenticateBox setIsDelete={setIsDelete} setIsAllow={setIsAllow}
                                 message={'Bạn thật sự muốn xóa bỏ sản phẩm này ?'}/> : null}
            <ToastContainer/>
        </div>
    )
}
export default VendorManage