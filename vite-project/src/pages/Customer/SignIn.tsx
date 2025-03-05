import {Link, useNavigate} from 'react-router-dom'
import '../../assets/css/pages/customer/SignUp.css'
import {useEffect, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import {Tooltip} from "@mui/material";
import Typewriter from "typewriter-effect";
import {ToastContainer, toast} from "react-toastify";
import * as Bs from 'react-icons/bs'
import {motion} from 'motion/react'
import {animate, press} from "motion";

function SignIn() {
    const navigate = useNavigate();
    const [greeting, setGreeting] = useState('');
    const [currDate] = useState(new Date());
    const [typeInput, setTypeInput] = useState<string>('password');

    const [count, setCount] = useState(0);

    const formData = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: async (values) => {
            setCount(count + 1);
            try {
                const _url = import.meta.env.VITE_API_HOST + import.meta.env.VITE_SERVER_PORT + import.meta.env.VITE_API_LOGIN;
                const response = await axios.post(_url, values);

                toast.success('Sign in successfully');

                console.log(response.data);
            } catch (err) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                toast.error(err.response.data.message);
            }
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Your email is invalid').required('Your Customer email is required'),
            password: Yup.string().min(6, 'Your password must be at least 6 characters').required('Your password is required')
        })
    })

    useEffect(() => {
        if (currDate.getHours() >= 0 && currDate.getHours() <= 10) {
            setGreeting('Good morning, sir. Ready to add somethings to your cart? Shopping now!')
        } else if (currDate.getHours() > 10 && currDate.getHours() <= 12) {
            setGreeting('Time to lunch, sir')
        } else if (currDate.getHours() > 12 && currDate.getHours() <= 17) {
            setGreeting('Hey guy, this is the perfect time to get more attractive promotions. Are you ready to create new deals? Go go go!')
        } else {
            setGreeting('Sometimes is different to get something strange...')
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
                 className={'bg-white sm:max-lg:bg-(--bg-color) w-full h-1/4 flex flex-col sm:max-lg:flex-row justify-between items-center'}>
                <div
                    className={'text-xl max-sm:text-2xl sm:max-lg:text-6xl lg:text-7xl font-[cursive]' +
                        ' flex justify-center sm:max-lg:justify-start items-center' +
                        ' h-full w-full bg-(--bg-color)' +
                        ' p-2 sm:max-lg:pl-20 sm:max-lg:py-6 lg:py-7'}>
                    <Link to={'/'} className={'text-(--title-color-1) font-bold'}> Welcome to <br/> Loli shopping</Link>
                </div>
                <div className={'w-full sm:max-lg:w-auto ' +
                    'flex flex-row justify-center item-center ' +
                    'sm:max-lg:grid sm:max-lg:grid-rows-2 sm:max-lg:grid-cols-2 sm:max-lg:gap-x-4 sm:max-lg:gap-y-1 sm:max-lg:justify-items-end ' +
                    ' bg-white sm:max-lg:bg-(--bg-color)'}>
                    <Tooltip title={'love list'}>
                        <button id={'feaBtn'} type='button'
                                className={'bg-(--bg-color-btn-2) lg:bg-(--bg-color-btn-1) h-fit rounded-lg border-0 p-2 sm:max-lg:p-3 m-2 sm:max-lg:mx-2 lg:m-5 flex justify-center items-center'}>
                            <Bs.BsBagHeart className={'w-6 h-6 sm:max-lg:w-10 sm:max-lg:h-10 lg:w-13 lg:h-13'}
                                           color={'white'}/>
                        </button>
                    </Tooltip>
                    <Tooltip title={'shopping cart'}>
                        <button id={'feaBtn'} type='button'
                                className={'bg-(--bg-color-btn-2) lg:bg-(--bg-color-btn-1) h-fit rounded-lg border-0 p-2 sm:max-lg:p-3 m-2 sm:max-lg:mx-2 lg:m-5 flex justify-center items-center'}>
                            <Bs.BsCart className={'w-6 h-6 sm:max-lg:w-10 sm:max-lg:h-10 lg:w-13 lg:h-13'}
                                       color={'white'}/>
                        </button>
                    </Tooltip>
                    <Tooltip title={'your Customer'}>
                        <button id={'feaBtn'} type='button'
                                className={'bg-(--bg-color-btn-2) lg:bg-(--bg-color-btn-1) h-fit rounded-lg border-0 p-2 sm:max-lg:p-3 m-2 sm:max-lg:mx-2 lg:m-5 flex justify-center items-center sm:max-lg:col-span-2'}>
                            <Bs.BsPersonCircle className={'w-6 h-6 sm:max-lg:w-10 sm:max-lg:h-10 lg:w-13 lg:h-13'}
                                               color={'white'}/>
                        </button>
                    </Tooltip>
                </div>
            </div>

            {/*start sign-in form*/}
            <div id={'signInForm'} className={'bg-white w-[90%] h-3/4 flex grow justify-center items-center'}>
                {/*greeting*/}
                <div
                    className={'rounded-lg sm:max-lg:rounded-2xl shadow-lg shadow-gray-500 ' +
                        'flex flex-row sm:max-lg:flex-col max-sm:flex-col justify-center sm:max-lg:justify-start max-sm:justify-center items-center ' +
                        'w-[80%] h-full lg:w-full lg:h-[500px]'}>
                    <div
                        className={'text-white bg-(--bg-color) ' +
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
                                    <legend className={'text-(--text-color) text-sm sm:max-lg:text-xl  lg:text-xl font-bold'}>
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
                                            className={'bg-(--bg-color-btn-1) px-3 py-4 font-bold border -0 m-2 text-(--text-color-btn) rounded-lg'}
                                            onClick={() => {
                                                navigate(-1)
                                            }}>Cancel
                                    </button>
                                    <button id={'feaBtn'}
                                            className={'bg-(--bg-color-btn-1) px-3 py-4 font-bold border -0 m-2 text-(--text-color-btn) rounded-lg'}
                                            type={'submit'}>Submit
                                    </button>
                                </div>
                                <Link to={'/sign-up'} className={'text-sm sm:max-lg:text-xl'}>You are new? Sign up
                                    here</Link>
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

export default SignIn