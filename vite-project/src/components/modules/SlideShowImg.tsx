import {BsCaretLeftFill, BsCaretRightFill} from "react-icons/bs";
import React, {useState} from "react";

interface Props {
    data?: { image_link: string }[] | undefined
}

const SlideShowImg: React.FC<Props> = ({data}) => {
    const [currentTab, setCurrentTab] = useState<number>(0);

    const handleTurnLeft = () => {
        if (currentTab > 0) setCurrentTab(currentTab - 1);
        else if (data) setCurrentTab(data?.length - 1);
    }

    const handleTurnRight = () => {
        if (data && currentTab < data?.length - 1) setCurrentTab(currentTab + 1);
        else setCurrentTab(0);
    }

    return (
        <div className={'w-fit h-fit flex flex-col justify-start items-center'}>
            {/*current image*/}
            <div className={' w-full h-50 rounded-lg flex justify-center items-center p-2 my-2'}>
                <img src={data?.[currentTab]?.image_link} alt="picture"
                     className={'border-2 border-[rgb(var(--border-color))] rounded-lg h-full bg-white shadow-[rgb(var(--shadow-lg)] shadow-gray-600'}/>
            </div>
            {/*image list*/}
            <div
                className={'w-fit min-h-15 border-2 border-[rgb(var(--border-color))] rounded-lg flex justify-center items-center p-1'}>
                <button className={'w-fit h-fit border-2 border-black rounded-full mx-2'}
                        onClick={handleTurnLeft}>
                    <BsCaretLeftFill size={20}/>
                </button>
                <ul className={'w-fit h-full flex justify-center items-center gap-2 bg-white'}>
                    {data && data.map((item) => (
                        <li className={'w-[20%] border-2 border-[rgb(var(--border-color))] rounded-lg p-1'}>
                            <img src={item.image_link} alt="picture" className={'w-full'}/>
                        </li>
                    ))}
                </ul>
                <button className={'w-fit h-fit border-2 border-black rounded-full mx-2'}
                        onClick={handleTurnRight}>
                    <BsCaretRightFill size={20}/>
                </button>
            </div>
        </div>
    )
}
export default SlideShowImg