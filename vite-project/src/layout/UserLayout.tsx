import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import apiClient from "../services/apiClient.tsx";
import endpoints from "../services/endpoints.tsx";
import {toast} from "react-toastify";
import {useAuth} from "../context/AuthContext.tsx";
import {BsBell, BsBoxArrowRight, BsCart, BsHouse, BsPerson, BsReceipt} from "react-icons/bs";
import SearchingBar from "../components/modules/SearchingBar.tsx";
import Loading from "../components/loading/Loading.tsx";

interface dataType {
    id: string,
    account_name: string,
    full_name: string,
    birthday: string,
    gender: string,
    email: string,
    phone: string,
    address: string,
    image_link: string,
    role: string,
}

export const UserLayout = () => {
    const [data, setData] = useState<dataType | undefined>(undefined);
    const [activeTab, setActiveTab] = useState(new Array(5).fill(false));
    const [currentTab, setCurrentTab] = useState(0);
    const location = useLocation();

    const {logout} = useAuth()
    const navigate = useNavigate()

    const activeCurrTab = (index: number, url: string) => {
        setActiveTab((prevState) => {
            const newContent = [...prevState];
            if (currentTab !== index) {
                setCurrentTab(index);
                newContent[currentTab] = !newContent[currentTab];
                newContent[index] = true;
            }
            return newContent;
        })
        navigate(`/user${url === '/' ? '' : url}`);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get(endpoints.user.getUserInfo)

                if (response.status === 200) {
                    setData(response.data)
                } else toast.error('Có lỗi trong quá trình tải dữ liệu')
            } catch (e) {
                console.error(e)
                toast.error('Có lỗi trong quá trình kết nối')
            }
        }
        fetchData()
    }, []);

    useEffect(() => {
        const path = location.pathname.split('/')
        if (path[1] === 'user') {
            if (path[2] === 'show-cart') {
                setActiveTab(() => {
                    const newContent = new Array(5).fill(false);
                    newContent[1] = true;
                    return newContent;
                })
                setCurrentTab(1)
            } else if (path[2] === 'show-receipts') {
                setActiveTab(() => {
                    const newContent = new Array(5).fill(false);
                    newContent[2] = true;
                    return newContent;
                })
                setCurrentTab(2)
            } else if (path[2] === 'show-notifications') {
                setActiveTab(() => {
                    const newContent = new Array(5).fill(false);
                    newContent[3] = true;
                    return newContent;
                })
                setCurrentTab(3)
            }else{
                setActiveTab(() => {
                    const newContent = new Array(5).fill(false);
                    newContent[0] = true;
                    return newContent;
                })
                setCurrentTab(0)
            }
        }
    }, []);

    if (data === undefined) return <Loading/>

    return (
        <div className={'flex flex-col justify-center items-center'}>
            {/*avatar and some info*/}
            <div className={'w-full h-fit flex flex-row justify-between items-center bg-[rgb(var(--main-color))] p-2'}>
                <div className={'w-16 h-16 rounded-full border-2 border-[rgb(var(--border-color))]'}>
                    <img src={data?.image_link} alt={'logo'} className={'w-full h-full rounded-full'}/>
                </div>
                <p>Xin chào, {data?.full_name ?? data?.account_name}</p>
                <button
                    className={'bg-[rgb(var(--btn-accent-bg))] text-white rounded-lg p-1 shadow-lg shadow-gray-300'}
                    onClick={() => navigate('/')}>
                    <BsHouse size={25}/>
                </button>
            </div>
            {/*searching bar here*/}
            <div className={'w-full h-fit flex flex-row justify-center items-center p-2'}>
                <SearchingBar placeholderText={"Tìm kiếm đơn hàng,.."}/>
            </div>
            {/*Navigate bar here (vertical)*/}
            <div
                className={'w-full h-fit my-5 border-b-2 border-[rgb(var(--main-color))] rounded-b-xl p-2 shadow-lg shadow-gray-300'}>
                <ul className={'w-full flex flex-row justify-around items-center gap-4'}>
                    <li className={`w-fit h-fit flex flex-col justify-center items-center`}
                        onClick={() => activeCurrTab(0, '/')}>
                        <div
                            className={`w-fit h-fit border-2 border-[rgb(var(--border-color))] ${activeTab[0] ? 'bg-[rgb(var(--accent-color))] text-white' : 'bg-white text-black'}  rounded-full p-3`}>
                            <BsPerson size={25}/>
                        </div>
                        <p className={'text-center'}>Tài khoản</p>
                    </li>
                    <li className={`w-fit h-fit flex flex-col justify-center items-center`}
                        onClick={() => activeCurrTab(1, '/show-cart')}>
                        <div
                            className={`border-2 border-[rgb(var(--border-color))] ${activeTab[1] ? 'bg-[rgb(var(--accent-color))] text-white' : 'bg-white text-black'} rounded-full p-3 e-fit h-fit`}>
                            <BsCart size={25}/>
                        </div>
                        <p className={'text-center'}>Giỏ hàng</p>
                    </li>
                    <li className={`w-fit h-fit flex flex-col justify-center items-center`}
                        onClick={() => activeCurrTab(2, '/show-receipts')}>
                        <div
                            className={` border-2 border-[rgb(var(--border-color))] ${activeTab[2] ? 'bg-[rgb(var(--accent-color))] text-white' : 'bg-white text-black'} rounded-full p-3 w-fit h-fit`}>
                            <BsReceipt size={25}/>
                        </div>
                        <p className={'text-center'}>Đơn hàng</p>
                    </li>
                    <li className={`w-fit h-fit flex flex-col justify-center items-center`}
                        onClick={() => activeCurrTab(3, '/show-notifications')}>
                        <div
                            className={` border-2 border-[rgb(var(--border-color))] ${activeTab[3] ? 'bg-[rgb(var(--accent-color))] text-white' : 'bg-white text-black'} rounded-full p-3 w-fit h-fit`}>
                            <BsBell size={25}/>
                        </div>
                        <p className={'text-center'}>Thông báo</p>
                    </li>
                    <li className={`w-fit h-fit flex flex-col justify-center items-center`}
                        onClick={() => logout()}>
                        <div
                            className={` border-2 border-[rgb(var(--border-color))] ${activeTab[4] ? 'bg-[rgb(var(--accent-color))] text-white' : 'bg-white text-black'} rounded-full p-3 w-fit h-fit`}>
                            <BsBoxArrowRight size={25}/>
                        </div>
                        <p className={'text-center'}>Đăng xuất</p>
                    </li>
                </ul>
            </div>
            <div className={'w-full h-full'}><Outlet/></div>
        </div>

    )
}
