import {useEffect, useState} from "react";
import endpoints from "../../services/endpoints.tsx";
import {Pagination, Stack} from "@mui/material";
import ProductCard from "../../components/modules/ProductCard.tsx";
import err404 from '../../assets/img/404.png'
import {productListDataType} from "../../utils/user.data-types.tsx";
import {fetchDataWithQuery} from "../../utils/functions.utils.tsx";
import Loading from "../../components/loading/Loading.tsx";


const Home = () => {
    const [data, setData] = useState<productListDataType | null>(null)
    const [topProducts, setTopProducts] = useState<productListDataType | null>(null)

    useEffect(() => {
        fetchDataWithQuery(endpoints.public.getAllProducts, setData, undefined, 1, 10)
        fetchDataWithQuery(endpoints.public.getFeaturedProductsBySort, setTopProducts, {sortBy: "wishlist"}, 1, 10)
    }, [])

    useEffect(() => {
        console.log(topProducts)
    }, [topProducts]);

    if (!data || !topProducts) return <Loading/>

    return (
        <div className={'w-full h-full'}>
            <div className={'w-full h-fit flex flex-col justify-center items-center'}>
                <div className={'w-full h-fit p-2 m-2'}>
                    <div className={'w-full h-fit'}>
                        <p className={'w-fit pl-2 pr-8 py-1 text-white text-center text-2xl font-bold rounded-lg'}
                           style={{
                               background: "rgb(var(--main-color))",
                               clipPath: "polygon(15px 0, calc(100% - 30px) 0, 100% 100%, calc(100% - 15px) 100%, 0px 100%, 0 0)"
                           }}>
                            Sản phẩm được yêu thích nhất
                        </p>
                    </div>
                </div>
                <div className={'flex flex-row flex-wrap justify-start items-center m-2'}>
                    {topProducts && topProducts.data.map((item, i) => (
                        <ProductCard url_path={item.id} img_path={item.ImageProducts[0].image_link ?? err404}
                                     index={i}
                                     name={item.name} price={item.average_price} rating={'5.0'}/>
                    ))}
                </div>
                {data !== null && data !== undefined ? (
                    <Stack spacing={2} alignItems={'center'}>
                        <Pagination count={data?.total_pages}
                                    page={data?.current_page}
                                    onChange={(_e, value) => fetchDataWithQuery(endpoints.public.getFeaturedProductsBySort, setTopProducts, {sortBy: "wishlist"}, value, 10)
                                    }/>
                    </Stack>
                ) : null}
            </div>
            <div className={'w-full h-fit flex flex-col justify-center items-center'}>
                <div className={'w-full h-fit p-2 m-2'}>
                    <div className={'w-full h-fit'}>
                        <p className={'w-fit pl-2 pr-8 py-1 text-white text-center text-2xl font-bold rounded-lg'}
                           style={{
                               background: "rgb(var(--main-color))",
                               clipPath: "polygon(15px 0, calc(100% - 30px) 0, 100% 100%, calc(100% - 15px) 100%, 0px 100%, 0 0)"
                           }}>
                            Sản phẩm tuần này
                        </p>
                    </div>
                </div>
                <div className={'flex flex-row flex-wrap justify-start items-center m-2'}>
                    {data && data.data.map((item, i) => (
                        <ProductCard url_path={item.id} img_path={item.ImageProducts[0].image_link ?? err404}
                                     index={i}
                                     name={item.name} price={item.average_price} rating={'5.0'}/>
                    ))}
                </div>
                {data !== null && data !== undefined ? (
                    <Stack spacing={2} alignItems={'center'}>
                        <Pagination count={data?.total_pages}
                                    page={data?.current_page}
                                    onChange={(_e, value) => fetchDataWithQuery(endpoints.public.getAllProducts, setData, undefined, value, 10)}/>
                    </Stack>
                ) : null}
            </div>
        </div>
    )
}
export default Home;