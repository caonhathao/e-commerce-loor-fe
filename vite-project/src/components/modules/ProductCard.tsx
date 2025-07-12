import {formatedNumber} from "../../utils/functions.utils.tsx";
import * as Bs from "react-icons/bs";
import React from "react";
import {useNavigate} from "react-router-dom";

interface Props {
    url_path: string;
    img_path: string;
    index: number;
    name: string;
    price: string;
    rating: string;
}

const ProductCard: React.FC<Props> = ({url_path, img_path, index, name, price, rating}) => {
    const navigator = useNavigate();

    return (
        <>
        <div key={index}
             className={'w-45 h-70 shadow-lg shadow-gray-600 rounded-lg p-2 m-2 border-2 border-[rgb(var(--main-color))]'}
             onClick={() => {
                 navigator(`product-detail/${url_path}`)
             }}>
            <div className={'h-3/5 flex flex-col justify-center items-center'}>
                <img src={img_path} alt="picture"/>
            </div>
            <div className={'h-2/5 flex flex-col justify-between items-center'}>
                <div className={'max-h-2/3 text-base p-1 overflow-hidden'}>{name}</div>
                <div className={'max-h-1/3 flex flex-row justify-between items-center w-full'}>
                    <div className={'text-sm p-1'}>{formatedNumber(Number(price ?? 0))}đ</div>
                    <div className={'text-xs flex flex-row justify-start items-center p-1'}>
                        <div><Bs.BsStarFill color={'yellow'}/></div>
                        <div>{rating}</div>
                    </div>
                </div>
        </div>
        </div>
</>
)
}
export default ProductCard