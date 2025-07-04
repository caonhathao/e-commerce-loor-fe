import {useEffect, useState} from "react";
import apiClient from "../../services/apiClient.tsx";
import {useParams} from "react-router-dom";
import endpoints from "../../services/endpoints.tsx";
import {toast} from "react-toastify";

interface dataType {
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
    promotion: number,
    stock: number,
    description: string,
}

const ProductDetail = () => {
    const [data, setData] = useState<dataType>()
    const params = useParams()
    const fetchData = async () => {
        try {
            if (params.id !== undefined) {
                const response = await apiClient.get(endpoints.public.getProductByIdFromUser(params.id))
                if (response.status === 200) {
                    console.log(response.data)
                    setData(response.data)
                }
            }
        } catch (err) {
            console.log(err)
            toast.error('Sản phẩm không tồn tại hoặc có lỗi xảy ra!')
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <div></div>
    )
}

export default ProductDetail