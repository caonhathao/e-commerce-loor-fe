import {Link, useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {BsBoxArrowInLeft, BsExclamationCircleFill, BsPlayCircle, BsPlusCircle, BsTicket} from "react-icons/bs";
import apiClient from "../../../services/apiClient.tsx";
import endpoints from "../../../services/endpoints.tsx";

interface data {
    id: string;
    sku: string;
    has_attribute: boolean;
}

const VendorVariant = () => {
    const params = useParams();
    const [data, setData] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = params.id;
                let response;
                if (id !== undefined) {
                    response = await apiClient.get(endpoints.public.getAllVariants(id));
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
    }, [])

    const handleCreateVariant = () => {
        navigator('/vendor/manage/show-variant/create-new-variant/' + params.id);
    }

    return (
        <div className={'w-full h-full flex flex-col justify-center items-center'}>
            <div
                className={'absolute top-5 left-5 bg-gradient-to-b from-indigo-500 from-20% via-purple-500 to-pink-500 p-2.5 rounded-lg shadow-lg shadow-gray-500'}
                onClick={() => navigator(-1)}><BsBoxArrowInLeft size={20} color={'white'}/>
            </div>
            {/*show button to access update main description of product*/}
            {/*others to access update variant's description of product*/}
            <div className={'w-[80%]  p-2 my-2 text-2xl text-center font-bold border-b-2 border-gray-400'}>
                Sản phẩm và phiên bản
            </div>
            <div className={'border-[1px] border-[var(--bg-color)] p-2 rounded-lg text-xs italic w-[80%]'}>
                <ol className={'list-decimal list-inside'}>
                    <li>Sản phẩm và phiên bản là trang quản lí các mẫu mã của một sản phẩm bất kì mà ban đang xem.</li>
                    <li>Mọi thông tin chung của sản phẩm sẽ được cập nhật ở mục "Thông tin chung".</li>
                    <li>Với các phiên bản (mẫu mã) của sản phẩm, vui lòng thêm bên dưới và cung cấp thông tin.</li>
                    <li>Không cho phép trùng nhau giữa các phiên bản.</li>
                </ol>
            </div>
            <ul className={'w-[80%]'}>
                <li className={'w-full border-2 border-[var(--bg-color-btn-2)] p-2 rounded-lg my-2 flex flex-row justify-between items-center'}>
                    <div className={'w-[80%] border-r-2 border-[var(--text-color)]'}>
                        <strong
                            className={'text-lg border-b-2 border-[var(--text-color)]'}>Thông tin
                            chung</strong>
                        <p><small>Mã sản phẩm: {params.id}</small></p>
                    </div>
                    <div className={'w-[20%]'}>
                        <div className={'w-full flex flex-row justify-center items-center'}>
                            <Link to={'/vendor/manage/show-variant/update-main-description/' + params['id']}>
                                <BsPlayCircle size={30} color={'var(--text-color)'}/></Link>
                        </div>
                    </div>
                </li>
                {data && data.map((item: data, i) => (
                    <li key={i}
                        className={'w-full border-2 border-[var(--bg-color-btn-2)] p-2 rounded-lg my-2 flex flex-col justify-between items-center'}>
                        <div className={'w-full flex flex-row justify-between items-center'}>
                            <div className={'w-[80%] border-r-2 border-[var(--text-color)]'}>
                                <strong
                                    className={'text-lg border-b-2 border-[var(--text-color)]'}>Thông tin
                                    phiên bản</strong>
                                <p><small>Mã sku: {item.sku}</small></p>
                            </div>
                            <div className={'w-[20%]'}>
                                <div className={'w-full flex flex-row justify-center items-center'}>
                                    <Link to={'/vendor/manage/show-variant/update-variant-description/' + item.id}>
                                        <BsPlayCircle size={30} color={'var(--text-color)'}/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className={'w-full flex flex-row justify-between items-center text-xs'}>
                            {item.has_attribute ? (
                                <div className={'flex justify-center items-center gap-2'}><BsTicket/>Đã có thuộc tính
                                    sản phẩm</div>) : (
                                <div className={'w-full flex flex-row justify-start items-center gap-4 text-gray-600'}>
                                    <BsExclamationCircleFill size={15} color={'gray'}/><p>Sản phảm chưa có các thuộc
                                    tính</p></div>
                            )}
                        </div>
                    </li>
                ))}
                <li
                    className={'w-full border-2 border-[var(--bg-color-btn-2)] p-2 rounded-lg my-2 flex flex-row justify-between items-center'}>
                    <div className={'w-[80%] border-r-2 border-[var(--text-color)]'}>
                        <strong
                            className={'text-lg border-b-2 border-[var(--text-color)]'}>Thêm phiên bản mới</strong>
                    </div>
                    <div className={'w-[20%]'}>
                        <div className={'w-full flex flex-row justify-center items-center'}>
                            <button type={'button'}><BsPlusCircle
                                size={30} color={'var(--text-color)'} onClick={() => handleCreateVariant()}/></button>
                        </div>
                    </div>
                </li>
            </ul>

        </div>
    )
}
export default VendorVariant;