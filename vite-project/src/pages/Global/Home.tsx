import * as Bs from 'react-icons/bs'
import {toast} from "react-toastify";
import {useEffect, useState} from "react";
import apiClient from "../../services/apiClient.tsx";
import endpoints from "../../services/endpoints.tsx";
import {formatedNumber} from "../../utils/functions.utils.tsx";
import {Pagination, Stack} from "@mui/material";
import {useNavigate} from "react-router-dom";

interface productType {
    id:string,
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
    const navigator=useNavigate();
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
                    <div className={'w-45 h-70 shadow-lg shadow-gray-600 rounded-lg p-2 m-2'}
                    onClick={()=>{
                        navigator(`product-detail/${item.id}`)
                    }}>
                        <div className={'h-3/5 flex flex-col justify-center items-center'}>
                            <img src={item.image_products[0].image_link} alt="picture"/>
                        </div>
                        <div key={i} className={'h-2/5 flex flex-col justify-between items-center'}>
                            <div className={'max-h-2/3 text-base p-1 overflow-hidden'}>{item.name}</div>
                            <div className={'max-h-1/3 flex flex-row justify-between items-center w-full'}>
                                <div className={'text-sm p-1'}>{formatedNumber(Number(item.average_price ?? 0))}đ</div>
                                <div className={'text-xs flex flex-row justify-start items-center p-1'}>
                                    <div><Bs.BsStarFill color={'yellow'}/></div>
                                    <div>5.0</div>
                                </div>
                            </div>
                        </div>
                    </div>
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