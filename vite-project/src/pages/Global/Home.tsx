import * as Bs from 'react-icons/bs'
import {toast} from "react-toastify";
import {useEffect, useState} from "react";
import apiClient from "../../services/apiClient.tsx";
import endpoints from "../../services/endpoints.tsx";

interface dataType {
    brand_id: string,
    category_id: string,
    subcategory_id: string,
    name: string,
    image_products: {
        image_link: string,
    }[],
    averagePrice: string,
    status: string,
    origin: string,
}

const Home = () => {

    const [data, setData] = useState<dataType[]>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get(endpoints.public.getAllProducts);
                if (response.status === 200) {
                    setData(response.data)
                    toast.success('Get products successfully')
                } else
                    toast.error('Failed to get products')
            } catch (e) {
                console.error(e)
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                toast.error(e.message)
            }
        }
        fetchData();
    }, [])

    // useEffect(() => {
    //     console.log(data)
    // }, [data]);

    return (
        <div className={'w-full h-full'}>
            <div className={'flex flex-row flex-wrap justify-start items-center m-2'}>
                {data && data.map((item, i) => (
                    <div className={'w-45 h-70 shadow-lg shadow-gray-600 rounded-lg p-2 m-2'}>

                        <div className={'h-3/5 flex flex-col justify-center items-center'}>
                            <img src={item.image_products[0].image_link} alt="picture"/>
                        </div>
                        <div key={i} className={'h-2/5'}>
                            <div className={'text-base p-1 overflow-hidden'}>{item.name}</div>
                            <div className={'flex flex-row justify-between items-center w-full'}>
                                <div className={'text-sm p-1'}>{item.averagePrice}</div>
                                <div className={'text-xs flex flex-row justify-start items-center p-1'}>
                                    <div><Bs.BsStarFill color={'yellow'}/></div>
                                    <div>5.0</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Home;