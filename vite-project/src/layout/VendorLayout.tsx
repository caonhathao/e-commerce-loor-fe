import avatar from '../assets/img/loli.png'
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import * as Bs from 'react-icons/bs'
import {AnimatePresence, motion, MotionConfig} from 'motion/react'
import {toast} from "react-toastify";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const VendorLayout = ({child}) => {

    const [activeTab, setActiveTab] = useState([false, false, false]);
    const [currentTab, setCurrentTab] = useState(-1);
    const [minimizeMenu, setMinimizeMenu] = useState(false);
    useNavigate();
    const activeCurrTab = (index: number) => {
        setActiveTab((prevState) => {
            const newContent = [...prevState];
            if (currentTab !== index) {
                setCurrentTab(index);
                newContent[currentTab] = !newContent[currentTab];
                newContent[index] = !newContent[index];
            }
            return newContent;
        })
        setMinimizeMenu(!minimizeMenu);
    }

    const signOut = () => {
        sessionStorage.removeItem("userToken");
        toast.success('Đăng xuất thành công', {autoClose: 2000});
        setTimeout(() => {
            window.location.href = '/';
        }, 2500);
    }


    const closeMenu = () => {
        console.log('click')
        setMinimizeMenu(!minimizeMenu)
    }

    const getMotionConfig = (isClosed: boolean) => ({
        initial: {
            width: isClosed ? 0 : 'max-content',
            opacity: isClosed ? 0 : 1,
        },
        animate: {
            width: isClosed ? 'max-content' : 0,
            opacity: isClosed ? 1 : 0,
        },
        transition: {
            width: {duration: 0.5},
            opacity: {duration: 0.5},
        },
        exit: {
            width: isClosed ? 0 : 'max-content',
            opacity: isClosed ? 0 : 1,
        },
    });

    return (
        <div className={'w-screen h-screen overflow-x-hidden'}>
            <div className={'w-full h-full flex flex-col items-center justify-start'}>
                {/*this part is for avatar and title*/}
                <div
                    className={'w-screen h-max bg-gradient-to-r from-indigo-500 from-20% via-purple-500 to-pink-500 text-white'}>
                    <div className={'w-screen flex flex-row items-center justify-around'}>
                        <div className={'w-3/12 flex flex-col justify-center items-center p-2'}>
                            <img className={'w-10 rounded-4xl'} src={avatar} alt={'avatar'}/>
                            <div className={'text-orange-400 font-bold'}>avatar</div>
                        </div>
                        <div className={'w-9/12 text-center text-yellow-500 font-bold'}>cửa hàng: [shop's name]</div>
                    </div>
                </div>
                {/*this part is for navbar and content*/}
                {/*now is for navbar on the left side*/}
                {/*maybe navbar will be minimize or not*/}
                <div className={'w-screen h-max relative'}>
                    <div
                        className={'max-w-4/12 h-full absolute z-10 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 pt-3 text-yellow-500'}>
                        <div className={'flex flex-col items-center justify-center px-1 my-2'} onClick={closeMenu}>
                            {!minimizeMenu ?
                                <Bs.BsCaretRightFill className={'border rounded-4xl'} size={20} color={'white'}/>
                                :
                                <Bs.BsCaretLeftFill className={'border rounded-4xl'} size={20} color={'white'}/>}
                        </div>
                        <MotionConfig>
                            <AnimatePresence initial={false}>
                                {minimizeMenu ? (
                                    <motion.ul
                                        {...getMotionConfig(minimizeMenu)}
                                        className={`h-screen`}
                                    >
                                        <li
                                            className={`text-center p-2 ${activeTab[0] ? `bg-gradient-to-l from-red-400 to-teal-400 text-white font-bold` : `bg-transparent`}`}
                                            onClick={() => activeCurrTab(0)}>
                                            <Link to={'/'}>Tổng quan</Link></li>
                                        <li className={`text-center py-2 ${activeTab[1] ? `bg-gradient-to-l from-red-400 to-teal-400 text-white font-bold` : `bg-transparent`}`}
                                            onClick={() => activeCurrTab(1)}>
                                            <Link
                                                to={'/manage'}>Quản lí</Link>
                                        </li>
                                        <li className={`text-center p-2 ${activeTab[2] ? `bg-gradient-to-l from-red-400 to-teal-400 text-white font-bold` : `bg-transparent`}`}
                                            onClick={() => activeCurrTab(2)}>
                                            <Link
                                                to={'/orders'}>Đơn hàng</Link>
                                        </li>
                                        <li className={`text-center p-2 ${activeTab[3] ? `bg-gradient-to-l from-red-400 to-teal-400 text-white font-bold` : `bg-transparent`}`}
                                            onClick={() => activeCurrTab(3)}>
                                            <Link
                                                to={'/support'}>Hỗ trợ</Link>
                                        </li>
                                        <li className={`text-center p-2 ${activeTab[4] ? `bg-gradient-to-l from-red-400 to-teal-400 text-white font-bold` : `bg-transparent`}`}
                                            onClick={() => signOut()}>
                                            Đăng xuất
                                        </li>
                                    </motion.ul>
                                ) : null}
                            </AnimatePresence>
                        </MotionConfig>
                    </div>
                    <div className={'w-full h-full flex flex-row items-center justify-end mt-2 pr-2'}>
                        {child}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default VendorLayout;