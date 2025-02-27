//in manage page, show the list of products
//on the top, it has some functions: create new, edit (update), disable or delete (we can group by option)
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import {useEffect, useState} from "react";
import {io} from 'socket.io-client'
import axios from 'axios'
import JWTDecode from "../../../security/JWTDecode.tsx";
import * as Bs from 'react-icons/bs'
import {useProduct} from "../../../context/ProductContext.tsx";
import AuthenticateBox from "../../../components/authenticate/AuthenticateBox.tsx";
import Loading from "../../../components/loading/Loading.tsx";
import {useFormik} from "formik";

const socket = io(import.meta.env.VITE_API_HOST + import.meta.env.VITE_SERVER_PORT);

const VendorManager = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const {product, setProduct} = useProduct();

    const [isDelete, setIsDelete] = useState(false); //open delete function
    const [isAllow, setIsAllow] = useState<boolean>(false); //allow to delete item
    const [sortStatus, setSortStatus] = useState<boolean>(false); //sort:follow status open or close

    //search product
    const formData = useFormik({
        initialValues: {
            keyword: ''
        },
        onSubmit: async () => {
            try {
                const api = import.meta.env.VITE_API_HOST + import.meta.env.VITE_SERVER_PORT + import.meta.env.VITE_API_S_PRODUCT + formData.values.keyword
                const response = await axios.get(api);
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
        } else updateItem(obj);
    }

    const updateItem = (obj: object) => {
        if (obj) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            navigate('/manager/e/' + obj.id);
        } else toast.error("Failed to get data!");
    }

    const deleteItem = (obj: any) => {
        setProduct(obj);
    }

    const handleSortItem = () => {
        //if sort follow status open
        if (sortStatus) {
            setSortStatus(false);
            setData((prev) => {
                const temp = [...prev]
                return temp.sort((a, b) => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    if (a.stock > 0 && b.stock > 0) {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        return b.status - a.status
                    } else {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        return b.stock - a.stock
                    }
                })
            })
        } else {
            setSortStatus(true);
            setData((prev) => {
                const temp = [...prev]
                return temp.sort((a, b) => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    if (a.stock > 0 && b.stock > 0) {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        return a.status - b.status
                    } else {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        return a.stock - b.stock
                    }
                })
            })
        }
    }

    //get all products
    useEffect(() => {
        const fetchData = async () => {
            try {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                const id = JWTDecode(sessionStorage.getItem("userToken")).id;
                const url = import.meta.env.VITE_API_HOST + import.meta.env.VITE_SERVER_PORT + import.meta.env.VITE_API_G_PRODUCT + id;
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
                    }
                });

                if (response) {
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
        fetchData();
    }, []);

    //delete (remove) product permanent
    useEffect(() => {
        if (isAllow) {
            const fetch = async () => {
                try {
                    const url = import.meta.env.VITE_API_HOST + import.meta.env.VITE_SERVER_PORT + import.meta.env.VITE_API_D_PRODUCT + product.id;
                    const response = await axios.delete(url, {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem('userToken')}`
                        }
                    });

                    if (response) {
                        toast.success('Xóa sản phẩm thanh công', {autoClose: 1000});
                        setTimeout(() => {
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
            setData((prev) => prev.filter(item => item["id"] !== id));
        })
        socket.on('search-product', ({results}) => {
            setData(results)
        })
        return () => {
            socket.off('delete-product');
            socket.off('search-product');
        }
    }, []);

    // useEffect(() => {
    //     console.log(product);
    // }, [product]);

    if (data.length === 0) return <Loading/>

    return (
        <div className={'w-80 h-screen flex flex-col justify-start items-center'}>
            <div className={'w-fit h-fit grid grid-cols-2 grid-rows-2 gap-4 text-black mb-2'}>

                <div className={'border border-gray-600 rounded-4xl flex items-center justify-center p-1'}
                     onClick={() => createNewBtn('/manager/create')}>Tạo mới
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
                            {data && data.map((item, i) => (
                                <tr key={i} className={`h-full ${i % 2 === 0 ? `bg-indigo-200` : `bg-indigo-300`}`}
                                    onClick={() => handleItem(item)}
                                >
                                    <td className={'h-full flex-col items-center justify-center border-1 border-b-white border-x-white p-1'}>{item["id"]}</td>
                                    <td className={'break-words border-1 border-y-white border-x-white p-1'}>{item["name"]}</td>
                                    <td className={'h-full border-1 border-b-white border-x-white p-1'}>
                                        <div className={'flex flex-row justify-center items-center'}>
                                            {item["status"] === '0' ?
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
            {isDelete && product !== null ?
                <AuthenticateBox setIsDelete={setIsDelete} setIsAllow={setIsAllow}
                                 message={'Bạn thật sự muốn xóa bỏ sản phẩm này ?'}/> : null}
            <ToastContainer/>
        </div>
    )
}
export default VendorManager