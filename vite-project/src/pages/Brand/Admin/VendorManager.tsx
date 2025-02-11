//in manage page, show the list of products
//on the top, it has some functions: create new, edit (update), disable or delete (we can group by option)
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import {useEffect, useState} from "react";
import axios from 'axios'
import JWTDecode from "../../../security/JWTDecode.tsx";
import * as Bs from 'react-icons/bs'
import {useProduct} from "../../../context/ProductContext.tsx";
import AuthenticateBox from "../../../components/authenticate/AuthenticateBox.tsx";

const VendorManager = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const {product, setProduct} = useProduct();

    const [isDelete, setIsDelete] = useState(false); //open delete function

    const createNewBtn = (url: string) => {
        //change the status to call the component
        navigate(url);
    }

    const handleItem = (obj: any) => {
        if (isDelete) {
            deleteItem(obj);
        } else updateItem(obj);
    }

    const updateItem = (obj: any) => {
        if (obj) {
            setProduct(obj)
            navigate('/manager/e/' + obj["id"]);
        } else toast.error("Failed to get data!");
    }

    const deleteItem = (obj: any) => {
        setProduct(obj);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
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
                        autoClose: 2000
                    });
                    setData(response.data)
                } else console.log(response)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, []);

    // useEffect(() => {
    //     console.log(product);
    // }, [product]);

    return (
        <div className={'w-80 h-screen flex flex-col justify-start items-center'}>
            <div className={'w-fit h-fit grid grid-cols-2 grid-rows-1 gap-4 text-black mb-2'}>
                <div className={'border border-gray-600 rounded-4xl text-center p-1'}
                     onClick={() => createNewBtn('/manager/create')}>Tạo mới
                </div>
                <div
                    className={`border border-gray-600 rounded-4xl text-center p-1 ${isDelete ? `text-white bg-indigo-500 border-indigo-500` : ``}`}
                    onClick={() => {
                        setIsDelete(!isDelete);
                        toast.success('Vui lòng chọn 1 sản phẩm để xóa', {autoClose: 1000});
                    }}>Xóa
                </div>
            </div>
            <div className={'w-lg h-fit text-center'}>
                <h3 className={'mt-2 font-bold text-yellow-500'}>Danh sách sản phẩm</h3>
                <div className={'w-full h-fit flex items-center justify-center'}>
                    {data ?
                        <table className={'max-w-80 table-auto border border-white'}>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>TÊN</th>
                                <th>STATUS</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data && data.map((item, i) => (
                                <tr key={i} className={`h-full ${i % 2 === 0 ? `bg-indigo-200` : `bg-indigo-300`}`}
                                    onClick={() => handleItem(item)}
                                >
                                    <td className={'h-full flex-col items-center justify-center'}>{item["id"]}</td>
                                    <td className={'break-words border-1 border-y-white border-x-indigo-600 '}>{item["name"]}</td>
                                    <td className={'h-full flex flex-col items-center justify-center pt-2'}>
                                        {item["status"] === '0' ?
                                            <Bs.BsBanFill color={'red'} size={25}/> :
                                            <Bs.BsCheckCircleFill color={'green'} size={25}/>}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table> : null}
                </div>
            </div>
            {isDelete && product !== null ?
                <AuthenticateBox setIsDelete={setIsDelete} message={'Bạn thật sự muốn xóa bỏ sản phẩm này ?'}/> : null}
            <ToastContainer/>
        </div>
    )
}
export default VendorManager