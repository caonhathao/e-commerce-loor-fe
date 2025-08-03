import {Link, useNavigate} from 'react-router-dom'
import '../../../assets/css/pages/customer/SignUp.css'
import {useEffect, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import Typewriter from "typewriter-effect";
import {ToastContainer, toast} from "react-toastify";
import * as Bs from 'react-icons/bs'
import {motion} from 'motion/react'
import {animate, press} from "motion";
import apiClient from "../../../services/apiClient.tsx";
import endpoints from "../../../services/endpoints.tsx";
import {useAuth} from "../../../context/AuthContext.tsx";

function UserSignIn() {
    const navigate = useNavigate();
    const [greeting, setGreeting] = useState('');
    const [currDate] = useState(new Date());
    const [typeInput, setTypeInput] = useState<string>('password');

    const [count, setCount] = useState(0);
    const {login} = useAuth();

    const formData = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: async (values) => {
            setCount(count + 1);
            try {
                const response = await apiClient.post(endpoints.auth.userLogin, values)
                if (response.status === 200) {
                    const {access, data} = response.data;
                    login(access, data);
                    toast.success('Đăng nhập thành công', {autoClose: 1500});
                    setTimeout(() => {
                        navigate('/');
                    }, 1700);
                }
            } catch (err) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                toast.error(err.response.data.message);
            }
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Email không hợp lệ').required('Thiếu email'),
            password: Yup.string().min(6, 'Tối thiểu 6 kí tự').required('Thiếu mật khẩu')
        })
    })

    useEffect(() => {
        if (currDate.getHours() >= 0 && currDate.getHours() <= 10) {
            setGreeting('Chào buổi sáng, bạn đã sẵn sàng để lấp đầy giỏ hàng của mình chưa? Hẫy mua sắm ngay thôi nào!')
        } else if (currDate.getHours() > 10 && currDate.getHours() <= 12) {
            setGreeting('Trưa nay bạn sẽ ăn gì á? Lướt thử ở đây xem nào...')
        } else if (currDate.getHours() > 12 && currDate.getHours() <= 17) {
            setGreeting('Giờ vàng săn vouchers nè bạn ơi, nhanh nhanh thôi nào...')
        } else {
            setGreeting('Thi thoảng thì nên làm gì đó mới lạ xem nào...')
        }
    }, []);

    function handleShowPassword() {
        if (typeInput === 'password') {
            setTypeInput('text');
        } else setTypeInput('password')
    }

    press('#feaBtn', (target => {
        animate(target, {scale: 0.8})
        return () => {
            animate(target, {scale: 1})
        }
    }))

    return (
        <div
            className="w-screen min-h-screen bg-white flex flex-col sm:max-lg:flex-col justify-between items-center relative">
            {/*this is for header and navigate buttons*/}
            <div id={'header'}
                 className={'bg-[rbg(var(--main-color))] w-full h-1/4 shadow-sm shadow-[rgb(var(--secondary-color))] z-20 rounded-b-xl'}>
                <div
                    className={'bg-[rgb(var(--main-color))] w-full h-fit text-center text-2xl p-3 rounded-b-xl'}>
                    <Link to={'/'} className={'text-white font-bold'}>
                        Chào mừng bạn đến với <br/>Loli shopping
                    </Link>
                </div>
            </div>

            {/*start sign-in form*/}
            <div id={'signInForm'} className={'bg-white w-full h-full flex grow justify-center items-center'}>
                {/*greeting*/}
                <div
                    className={'rounded-lg sm:max-lg:rounded-2xl shadow-lg shadow-gray-500 ' +
                        'flex flex-row sm:max-lg:flex-col max-sm:flex-col justify-center sm:max-lg:justify-start max-sm:justify-center items-center ' +
                        'w-[80%] h-full lg:w-full lg:h-[500px]'}>
                    <div
                        className={'text-white bg-[rgb(var(--main-color))] ' +
                            'w-full lg:w-[40%] ' +
                            'min-h-40 sm:max-lg:min-h-55 lg:min-h-full p-2 ' +
                            'sm:max-lg:p-10 lg:p-5 ' +
                            'rounded-t-lg sm:max-lg:rounded-t-2xl ' +
                            'flex items-center justify-center ' +
                            'text-xl sm:max-lg:text-3xl lg:text-4xl font-bold'}>
                        <h3>
                            <Typewriter
                                options={{
                                    strings: [greeting],
                                    autoStart: true,
                                    delay: 50,
                                    loop: true
                                }}
                            />
                        </h3>
                    </div>

                    {/*start form here*/}
                    <div
                        className={'w-full h-max sm:max-lg:h-2/3 lg:w-[60%] lg:h-full' +
                            'mt-3 sm:max-lg:mt-10 ' +
                            'flex sm:max-lg:flex-col lg:flex-col max-sm:flex-col justify-center sm:max-lg:justify-start items-center ' +
                            'text-center'}>
                        <h3 className={'text-(--title-color-2) max-sm:text-lg sm:max-lg:text-3xl lg:text-4xl'}>
                            Sign in for your new day...
                        </h3>
                        <form
                            className={'w-[90%] sm:max-lg:w-[90%] p-2 sm:max-lg:p-6 flex flex-col justify-center items-center'}
                            onSubmit={formData.handleSubmit}>
                            <div className={'w-full flex flex-col justify-center items-center'}>
                                <fieldset
                                    className={' w-full h-max mt-2 rounded-lg border-gray-600 border-1 p-0'}>
                                    <legend
                                        className={'text-(--text-color) text-sm sm:max-lg:text-xl  lg:text-xl font-bold'}>
                                        Your email
                                    </legend>
                                    <input
                                        className={'border-0 m-0 bg-transparent ' +
                                            'w-full max-sm:h-10 sm:max-lg:h-15 ' +
                                            'max-sm:text-xl sm:max-lg:text-2xl  p-2 rounded-lg ' +
                                            'focus:outline-2 focus:outline-solid focus:outline-(--bg-color-btn)'}
                                        type='text' name={'email'}
                                        placeholder={'We want to take an authentication'}
                                        onChange={formData.handleChange}
                                        onBlur={formData.handleBlur}
                                    />
                                </fieldset>
                                {formData.errors.email && formData.touched.email && (
                                    <motion.p className={'my-1 p-0'}
                                              initial={{
                                                  opacity: 0,
                                                  height: 0,
                                              }}
                                              animate={{
                                                  opacity: 1,
                                                  height: 'max-content'
                                              }}
                                              transition={{
                                                  opacity: {duration: 0.2, ease: 'easeInOut'},
                                                  height: {duration: 0.2, ease: 'easeInOut', delay: 0.2},
                                              }}
                                    ><small
                                        className={'text-(--text-error) italic text-sm sm:max-lg:text-xl lg:text-xl'}>{formData.errors.email}</small>
                                    </motion.p>)}
                            </div>
                            <div className={'w-full flex flex-col justify-center items-center'}>
                                <fieldset
                                    className={'w-full sm:max-lg:h-max mt-2 rounded-lg border-gray-600 border-1 p-0'}>
                                    <legend
                                        className={'text-(--text-color) text-sm sm:max-lg:text-xl lg:text-xl font-bold'}>
                                        Your password
                                    </legend>
                                    <div className={'w-full flex flex-row justify-center items-center'}>
                                        <input
                                            className={'border-0 m-0 bg-transparent ' +
                                                'w-full max-sm:h-10 sm:max-lg:h-15' +
                                                ' p-2 sm:max-lg:text-xl rounded-lg ' +
                                                'focus:outline-2 focus:outline-solid focus:outline-(--bg-color-btn)'}
                                            type={typeInput} name={'password'}
                                            placeholder={'Strong password, please'}
                                            onChange={formData.handleChange}
                                            onBlur={formData.handleBlur}

                                        />
                                        <button type={'button'}
                                                className={'border-gray-600 p-1 bg-(--bg-color-btn) rounded-xl'}
                                                onClick={handleShowPassword}>
                                            {typeInput === 'password' ?
                                                <Bs.BsEye
                                                    className={'w-5 h-5 sm:max-lg:w-10 sm:max-lg:h-10 text-white p-1'}/>
                                                : <Bs.BsEyeSlash
                                                    className={'w-5 h-5 sm:max-lg:w-10 sm:max-lg:h-10 text-white p-1'}/>}
                                        </button>
                                    </div>
                                </fieldset>
                                {formData.errors.password && formData.touched.password && (
                                    <motion.p className={'my-1 p-0'}
                                              initial={{
                                                  opacity: 0,
                                                  width: 0,
                                                  height: 0,
                                              }}
                                              animate={{
                                                  opacity: 1,
                                                  width: 'max-content',
                                                  height: 'max-content'
                                              }}
                                              transition={{
                                                  opacity: {duration: 0.2},
                                                  width: {duration: 0.2},
                                                  height: {duration: 0.2},
                                              }}
                                    >
                                        <small
                                            className={'text-(--text-error) italic text-sm sm:max-lg:text-xl lg:text-xl '}>{formData.errors.password}</small>
                                    </motion.p>)}
                            </div>
                            <div className={'flex flex-col justify-center items-center'}>
                                <div className={'flex justify-center item-center flex-row'}>
                                    <button id={'feaBtn'}
                                            type={'button'}
                                            className={'px-3 py-4 font-bold border -0 m-2 text-(--text-color-btn) rounded-lg'}
                                            onClick={() => {
                                                navigate(-1)
                                            }}>Cancel
                                    </button>
                                    <button id={'feaBtn'}
                                            className={'bg-[rgb(var(--btn-primary-bg))] px-3 py-4 font-bold border-0 m-2 text-[rgb(var( --btn-primary-text))] rounded-lg text-white'}
                                            type={'submit'}>Submit
                                    </button>
                                </div>
                                <Link to={'/user/sign-up'} className={'text-sm sm:max-lg:text-xl'}>You are new? <strong
                                    className={'text-[rgb(var(--secondary-color))]'}>
                                    Sign up here</strong></Link>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={'footer'}></div>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default UserSignIn