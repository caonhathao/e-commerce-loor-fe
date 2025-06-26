import avatar from '../assets/img/loli.png'
import {Outlet, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import * as Bs from 'react-icons/bs'
import {AnimatePresence, motion, MotionConfig} from 'motion/react'
import {toast} from "react-toastify";
import JWTDecode from "../security/JWTDecode.tsx";
import {animate, press} from "motion";
import {getAccessToken} from "../services/tokenStore.tsx";
import {useAuth} from "../context/AuthContext.tsx";

const VendorLayout = () => {
    const [activeTab, setActiveTab] = useState([false, false, false, false, false, false]);
    const [currentTab, setCurrentTab] = useState(-1);
    const [minimizeMenu, setMinimizeMenu] = useState(false);
    const navigate = useNavigate();

    const [posAnchor, setPosAnchor] = useState({top: 0, left: 0});

    const navRef = useRef<HTMLDivElement>(null);
    const constraintsRef = useRef<HTMLDivElement | null>(null)

    const {logout} = useAuth();

    const activeCurrTab = (index: number, url: string) => {
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
        navigate(`/vendor${url === '/' ? '' : url}`);
    }

    const signOut = () => {
        logout();
        toast.success('Đăng xuất thành công', {autoClose: 2000});
        setTimeout(() => {
            window.location.href = '/';
        }, 2500);
    }

    const closeMenu = () => {
        setMinimizeMenu(!minimizeMenu)
    }

    const getMotionConfig = (isClosed: boolean) => {
        return {
            initial: {
                width: isClosed ? 0 : 'max-content',
                height: isClosed ? 0 : 'max-content',
                opacity: isClosed ? 0 : 1,
                fontSize: isClosed ? '0' : '16px',
            },
            animate: {
                width: isClosed ? 'max-content' : 0,
                height: isClosed ? 'max-content' : 0,
                opacity: isClosed ? 1 : 0,
                fontSize: isClosed ? '16px' : '0',
            },
            transition: {
                width: {duration: 0.3, delay: isClosed ? 0.2 : 0},
                height: {duration: 0.3, delay: isClosed ? 0.2 : 0},
                opacity: {duration: 0.3, delay: isClosed ? 0.5 : 0},
                fontSize: {duration: 0.3, delay: isClosed ? 0.5 : 0},
            },
            exit: {
                width: isClosed ? 0 : 'max-content',
                height: isClosed ? 0 : 'max-content',
                opacity: isClosed ? 0 : 1,
                fontSize: isClosed ? '0' : '16px',
                overflow: 'hidden',
            },
        }
    };

    useEffect(() => {
        const anchor = document.querySelector("#anchorPoint");
        if (anchor) {
            const rect = anchor.getBoundingClientRect();
            if (rect.top < 110 && rect.left < 15) {
                setPosAnchor({
                    top: rect.top + 45,
                    left: rect.left + 5,
                });
            } else if (rect.top < 110 && rect.left > 300) {
                setPosAnchor({
                    top: rect.top + 45,
                    left: rect.left - 5 - 50,
                });
            } else if (rect.top >= 110 && rect.top <= 400 && rect.left > 300) {
                setPosAnchor({
                    top: rect.top + 45,
                    left: rect.left - 5 - 50,
                });
            } else if (rect.top > 440 && rect.left > 260) {
                setPosAnchor({
                    top: rect.top - 45 - 205,
                    left: rect.left - 5 - 50,
                });
            } else if (rect.top > 440) {
                setPosAnchor({
                    top: rect.top - 45 - 205,
                    left: rect.left - 5,
                });
            } else if (rect.left < 15) {
                setPosAnchor({
                    top: rect.top + 45,
                    left: rect.left + 5,
                });
            } else if (rect.left > 300) {
                setPosAnchor({
                    top: rect.top - 45 - 205,
                    left: rect.left - 5,
                });
            } else {
                setPosAnchor({
                    top: rect.top + 45,
                    left: rect.left + 5,
                });
            }
        }
    }, [minimizeMenu]);

    return (
        <div className={'w-screen h-screen overflow-x-hidden'}>
            <div className={'w-full h-full flex flex-col items-center justify-start'}>
                {/*this part is for avatar and title*/}
                <div
                    className={'w-screen h-max bg-gradient-to-r from-indigo-500 from-20% via-purple-500 to-pink-500 text-white'}>
                    <div className={'w-screen flex flex-row items-center justify-around'}>
                        <div className={'w-3/12 flex flex-col justify-center items-center p-2'}>
                            <img className={'w-10 rounded-4xl'} src={avatar} alt={'avatar'}/>
                            <div className={'text-orange-300 font-bold'}>avatar</div>
                        </div>
                        <div className={'w-9/12 text-center text-lg text-yellow-300 font-bold'}>Xin chào <br/> {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error
                            JWTDecode(getAccessToken()) ? JWTDecode(getAccessToken()).name : 'Bạn'
                        }
                        </div>
                    </div>
                </div>
                {/*this part is for navbar and content*/}
                {/*now is for navbar on the left side*/}
                {/*maybe navbar will be minimized or not*/}
                <div className={'w-screen h-max relative flex flex-col items-center justify-center'}>
                    <motion.div ref={constraintsRef}
                                className={'w-85 max-h-screen fixed top-5 bottom-5 z-[9] pointer-events-none'}>
                        <motion.div ref={navRef}
                                    className={`w-max h-max z-[10] flex flex-col absolute bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 py-0.5 px-1 rounded-lg text-yellow-300 pointer-events-auto overflow-y-hidden shadow-lg shadow-gray-600`}
                                    drag
                                    dragElastic={0.01}
                                    dragMomentum={true}
                                    dragConstraints={constraintsRef}
                                    id={'anchorPoint'}
                        >
                            <div
                                className={'w-fit h-fit flex flex-col relative items-center justify-center order-1 px-1 my-2 '}
                                onClick={closeMenu}>
                                {!minimizeMenu ?
                                    <Bs.BsCaretRightFill className={'border rounded-4xl'} size={20} color={'white'}/>
                                    :
                                    <Bs.BsCaretLeftFill className={'border rounded-4xl'} size={20} color={'white'}/>}
                            </div>
                        </motion.div>
                    </motion.div>
                    <div className={'w-fit h-fit z-[30]'}
                         style={{
                             position: 'fixed',
                             top: posAnchor.top,
                             left: posAnchor.left,
                         }}>
                        <MotionConfig>
                            <AnimatePresence initial={false}>
                                {minimizeMenu ? (
                                    <motion.ul id={'navBtn'}
                                               {...getMotionConfig(minimizeMenu)}
                                               className={`w-full h-full bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 py-0.5 px-1 rounded-lg text-yellow-300 pointer-events-auto overflow-y-hidden shadow-lg shadow-gray-600`}
                                    >
                                        <li
                                            className={`text-center p-2 ${activeTab[0] ? `bg-gradient-to-l from-red-400 to-teal-400 text-white font-bold` : `bg-transparent`} rounded-md`}
                                            onClick={() => activeCurrTab(0, '/')}>
                                            Tổng quan
                                        </li>
                                        <li className={`text-center py-2 ${activeTab[1] ? `bg-gradient-to-l from-red-400 to-teal-400 text-white font-bold` : `bg-transparent`} rounded-md`}
                                            onClick={() => activeCurrTab(1, '/manage')}>
                                            Quản lí
                                        </li>
                                        <li className={`text-center p-2 ${activeTab[2] ? `bg-gradient-to-l from-red-400 to-teal-400 text-white font-bold` : `bg-transparent`} rounded-md`}
                                            onClick={() => activeCurrTab(2, '/orders')}>
                                            Đơn hàng
                                        </li>
                                        <li className={`text-center p-2 ${activeTab[3] ? `bg-gradient-to-l from-red-400 to-teal-400 text-white font-bold` : `bg-transparent`} rounded-md`}
                                            onClick={() => activeCurrTab(3, '/support')}>
                                            Hỗ trợ
                                        </li>
                                        <li className={`text-center p-2 ${activeTab[4] ? `bg-gradient-to-l from-red-400 to-teal-400 text-white font-bold` : `bg-transparent`} rounded-md`}
                                            onClick={() => activeCurrTab(4, '/shop-info')}>
                                            Cá nhân
                                        </li>
                                        <li className={`text-center p-2 ${activeTab[5] ? `bg-gradient-to-l from-red-400 to-teal-400 text-white font-bold` : `bg-transparent`} rounded-md`}
                                            onClick={() => signOut()}>
                                            Đăng xuất
                                        </li>
                                    </motion.ul>
                                ) : null}
                            </AnimatePresence>
                        </MotionConfig>
                    </div>

                    <main className={'w-full h-full flex flex-row items-center justify-center mt-2 px-2'}>
                        <Outlet/>
                    </main>
                </div>
            </div>
        </div>
    )
}
export default VendorLayout;