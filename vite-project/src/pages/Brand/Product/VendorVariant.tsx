import {Link} from "react-router-dom";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

const VendorVariant = () => {
    const params = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = params.id;
                const url = import.meta.env.VITE_API_HOST + import.meta.env.VITE_SERVER_PORT + import.meta.env.VITE_API_G_A_VARIANT + id;
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
                    }
                });
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

    return (
        <div className={'w-full h-full flex flex-col justify-center items-center'}>
            {/*show button to access update main description of product*/}
            {/*others to access update variant's description of product*/}
            <div className={'w-full p-2 my-2 text-2xl text-center font-bold border-b-2 border-gray-400'}>Chỉnh sửa thông
                tin<br/> sản phẩm và phiên bản
            </div>
            <ul className={'w-[80%]'}>
                <li className={'w-full border-2 border-[var(--bg-color-btn-2)] p-2 rounded-lg my-2'}>
                    <Link to={'/manager/show-variant/update-main-description/' + params['id']}><strong className={'text-lg border-b-2 border-[var(--text-color)]'}>Thông tin
                        chung</strong></Link>
                    <p><small>Mã sản phẩm: {params.id}</small></p>
                </li>
                {data && data.map((item, i) => (
                    <li className={'w-full border-2 border-[var(--bg-color-btn-2)] p-2 rounded-lg my-2'}>
                        <Link to={'/manager/show-variant/update-variant-description/' + item.id}>
                            <strong className={'text-lg border-b-2 border-[var(--text-color)]'}>Thông tin phiên bản: {i + 1}</strong></Link>
                        <p><small>Mã phiên bản: {item.sku}</small></p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default VendorVariant;