import {Link, useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {BsBoxArrowInLeft, BsExclamationCircleFill, BsPlayCircle, BsPlusCircle, BsTicket} from "react-icons/bs";
import endpoints from "../../../services/endpoints.tsx";
import {io} from "socket.io-client";
import Loading from "../../../components/loading/Loading.tsx";
import {useProduct} from "../../../context/ProductContext.tsx";
import {fetchDataWithQuery} from "../../../utils/functions.utils.tsx";
import {variantListType} from "../../../utils/vendor.data-types.tsx";

const socket = io(endpoints.system.socketConnection, {
    withCredentials: true,
    transports: ['websocket', 'polling'],
});

const VendorVariant = () => {
    const params = useParams();
    const [data, setData] = useState<variantListType[]>([]);
    const navigator = useNavigate();
    const {product} = useProduct()

    const handleCreateVariant = () => {
        navigator('/vendor/manage/show-variant/create-new-variant/' + params.id);
    }

    const handleRemove = () => {
        alert(product?.id)
    }

    useEffect(() => {
        if (data)
            fetchDataWithQuery(endpoints.brand.getAllVariants, setData, {id: product?.id || params.id}, 1, 10)
    }, [product, params.id, data])

    useEffect(() => {
        socket.on('search-product', ({results}) => {
            setData(results)
        })
        return () => {
            socket.off('search-product');
        }
    }, []);

    if (!data) return <Loading/>

    return (
        <div className={'w-full h-full flex flex-col justify-center items-center'}>
            <div
                className={'absolute top-5 left-5 bg-gradient-to-b from-indigo-500 from-20% via-purple-500 to-pink-500 p-2.5 rounded-lg shadow-lg shadow-gray-500'}
                onClick={() => navigator(-1)}><BsBoxArrowInLeft size={20} color={'white'}/>
            </div>
            {/*show button to access update main description of product*/}
            {/*others to access update variant's description of product*/}
            <div
                className={'w-[80%]  p-2 my-2 text-2xl text-center text-[rgb(var(--main-color))] font-bold border-b-2 border-gray-400'}>
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
                <li className={'w-full border border-gray-500 p-2 rounded-lg my-2 flex flex-row justify-between items-center'}>
                    <div className={'w-[80%] border-r-2 border-[rgb(var(--border-color))]'}>
                        <strong
                            className={'text-lg border-b-2 border-[rgb(var(--border-color))] text-[rgb(var(--main-color))]'}>
                            Thông tin chung
                        </strong>
                        <p><small><strong className={' text-[rgb(var(--main-color))]'}>Tên SP: </strong> {product?.name}
                        </small></p>
                        <p><small><strong className={' text-[rgb(var(--main-color))]'}>Mã SP: </strong>{product?.id}
                        </small></p>
                    </div>
                    <div className={'w-[20%]'}>
                        <div className={'w-full flex flex-row justify-center items-center'}>
                            <Link to={'/vendor/manage/show-variant/update-main-description/' + params['id']}>
                                <BsPlayCircle size={30} color={'var(--main-color)'}/></Link>
                        </div>
                    </div>
                </li>
                {data && data.map((item: variantListType, i) => (
                    <li key={i}
                        className={'w-full border border-gray-500 p-2 rounded-lg my-2 flex flex-col justify-between items-center'}>
                        <div className={'w-full flex flex-row justify-between items-center'}>
                            <div className={'w-[80%] h-full border-r-2 border-[rgb(var(--border-color))] '}>
                                <strong
                                    className={'text-lg border-b-2 border-[rgb(var(--border-color))] text-[rgb(var(--main-color))]'}>
                                    Thông tin phiên bản</strong>
                                <p>
                                    <small>
                                        <strong className={' text-[rgb(var(--main-color))]'}>
                                            Tên SP:{' '}
                                        </strong>{item.name}
                                    </small>
                                </p>
                                <p>
                                    <small>
                                        <strong className={' text-[rgb(var(--main-color))]'}>
                                            Mã sku:{' '}
                                        </strong>{item.sku}
                                    </small>
                                </p>
                                <div className={'w-full flex flex-row justify-between items-center text-xs'}>
                                    {item.has_attribute ? (
                                        <div className={'flex justify-center items-center gap-2'}><BsTicket/>Đã có thuộc
                                            tính
                                            sản phẩm</div>) : (
                                        <div
                                            className={'w-full flex flex-row justify-start items-center gap-4 text-gray-600'}>
                                            <BsExclamationCircleFill size={15} color={'gray'}/><p>Sản phảm chưa có các
                                            thuộc
                                            tính</p></div>
                                    )}
                                </div>
                            </div>
                            <div className={'w-[20%]'}>
                                <div className={'w-full flex flex-row justify-center items-center'}>
                                    <Link to={'/vendor/manage/show-variant/update-variant-description/' + item.id}>
                                        <BsPlayCircle size={30} color={'var(--main-color)'}/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
                <li
                    className={'w-full border border-gray-500 p-2 rounded-lg my-2 flex flex-row justify-between items-center'}>
                    <div className={'w-[80%] border-r-2 border-[rgb(var(--border-color))] '}>
                        <strong
                            className={'text-lg border-b-2 border-[rgb(var(--border-color))] text-[rgb(var(--main-color))]'}>Thêm
                            phiên bản mới</strong>
                    </div>
                    <div className={'w-[20%]'}>
                        <div className={'w-full flex flex-row justify-center items-center'}>
                            <button type={'button'}><BsPlusCircle
                                size={30} color={'var(--main-color)'} onClick={() => handleCreateVariant()}/></button>
                        </div>
                    </div>
                </li>
            </ul>
            <div className={'w-[80%] grid grid-cols-2 grid-rows-1 items-center gap-4 mt-10'}>
                <button type={'button'} className={'w-full h-fit border-2 border-green-600 rounded-lg p-2'}>Trợ giúp
                </button>
                <button type={'button'}
                        className={'w-full h-fit border-2 border-[rgb(var(--main-color))] rounded-lg p-2'}
                        onClick={() => handleRemove()}>Xóa
                </button>
            </div>
        </div>
    )
}
export default VendorVariant;