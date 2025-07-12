import {toast} from "react-toastify";
import {useEffect, useState} from "react";
import apiClient from "../../services/apiClient.tsx";
import endpoints from "../../services/endpoints.tsx";
import {Pagination, Stack} from "@mui/material";
import ProductCard from "../../components/modules/ProductCard.tsx";

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
}

interface dataType {
    current_page: number,
    total_pages: number,
    current_items: number,
    total_items: number,
    data: productType[]
}

const Home = () => {
    const [data, setData] = useState<dataType>()
    const fetchData = async (page: number, limit: number | 10) => {
        try {
            const response = await apiClient.get(endpoints.public.getAllProducts, {
                params: {
                    page: page,
                    limit: limit
                }
            });
            if (response.status === 200) {
                console.log(response.data)
                setData(response.data)
            } else
                toast.error('Failed to get products')
        } catch (e) {
            console.error(e)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            toast.error(e.message)
        }
    }
    useEffect(() => {
        fetchData(1, 10);
    }, [])

    // useEffect(() => {
    //     console.log(data)
    // }, [data]);

    return (
        <div className={'w-full h-full'}>
            <div className={'flex flex-row flex-wrap justify-start items-center m-2'}>
                {data && data.data.map((item, i) => (
                    <ProductCard url_path={item.id} img_path={item.image_products[0].image_link} index={i}
                                 name={item.name} price={item.average_price} rating={'5.0'}/>
                ))}
            </div>
            {data !== null && data !== undefined ? (
                <Stack spacing={2} alignItems={'center'}>
                    <Pagination count={data?.total_pages}
                                page={data?.current_page}
                                onChange={(_e, value) => fetchData(value, 10)}/>
                </Stack>
            ) : null}
        </div>
    )
}
export default Home;