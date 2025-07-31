import {useNavigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {useEffect, useState} from "react";
import {useProduct} from "../../../context/ProductContext.tsx";
import Loading from "../../../components/loading/Loading.tsx";
import endpoints from "../../../services/endpoints.tsx";
import {Pagination, Stack} from "@mui/material";
import {fetchDataWithQuery} from "../../../utils/functions.utils.tsx";
import {productListDetailType, productListType} from "../../../utils/vendor.data-types.tsx";
import SearchingBar from "../../../components/modules/SearchingBar.tsx";

const VendorManage = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<productListType>();
    const [reload, setReload] = useState<boolean>(false);
    const {setProduct} = useProduct();

    useEffect(() => {
        fetchDataWithQuery(endpoints.brand.getAllProducts, setData, 1, 7);
    }, [reload]);

    const createNewProduct = () => {
        navigate('/vendor/manage/create');
    };

    const handleProductClick = (product: productListDetailType) => {
        setProduct(product);
        navigate('/vendor/manage/show-variant/' + product.id);
    };

    if (!data) return <Loading/>;

    return (
        <div className="w-full h-full flex flex-col justify-start items-center pb-2">
            <div className="w-full h-fit flex flex-row justify-between items-center gap-4 mb-5">
                <div
                    className="bg-[rgb(var(--main-color))] text-white rounded-full p-2 w-[20%] text-center cursor-pointer"
                    onClick={createNewProduct}>
                    Tạo
                </div>
                <SearchingBar url={endpoints.public.getProductByKeyword} setData={setData} setReload={setReload}
                              errorText={''} placeholderText={'Tên sản phẩm...'} minLength={6}/>
            </div>
            {data.total_pages && (
                <Stack spacing={2} alignItems="center">
                    <Pagination
                        count={data.total_pages}
                        page={data.current_page}
                        onChange={(_e, value) =>
                            fetchDataWithQuery(endpoints.brand.getAllProducts, setData, value, 7)
                        }
                    />
                </Stack>
            )}
            <div className="w-full h-fit text-center">
                <h3 className="mt-2 font-bold text-yellow-500 text-lg">Danh sách sản phẩm</h3>
                <div className="w-full h-fit flex items-center justify-center">
                    <table className="w-full table-auto border border-white">
                        <thead>
                        <tr className="bg-indigo-300">
                            <th className="border border-white p-1">ID</th>
                            <th className="border border-white p-1">TÊN</th>
                            <th className="border border-white p-1">TÌNH TRẠNG</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.data.map((item, i) => (
                            <tr key={i}
                                className={`cursor-pointer ${i % 2 === 0 ? 'bg-indigo-200' : 'bg-indigo-300'}`}
                                onClick={() => handleProductClick(item)}>
                                <td className="border border-white p-1">{item.id}</td>
                                <td className="border border-white p-1">
                                    <p className="text-center overflow-hidden">{item.name}</p>
                                </td>
                                <td className="border border-white p-1">
                                    {item.status === 'OPENED' ? (
                                        <p className="text-green-600 font-bold">MỞ BÁN</p>
                                    ) : (
                                        <p className="text-red-500 font-bold">TẠM NGƯNG</p>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default VendorManage;
