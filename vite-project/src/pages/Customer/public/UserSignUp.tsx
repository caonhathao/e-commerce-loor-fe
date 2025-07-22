import {Link, useNavigate} from 'react-router-dom'
import '../../../assets/css/pages/customer/SignUp.css'
import {useEffect, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Tooltip} from "@mui/material";
import Typewriter from 'typewriter-effect'
import {toast} from "react-toastify";
import {BsEye, BsEyeSlash, BsPerson} from "react-icons/bs";
import apiClient from "../../../services/apiClient.tsx";
import endpoints from "../../../services/endpoints.tsx";

function UserSignUp() {
    const navigate = useNavigate();
    const [greeting, setGreeting] = useState('');
    const [currDate] = useState(new Date());

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const formData = useFormik({
        initialValues: {
            account_name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        onSubmit: async (values) => {
            try {
                const response = await apiClient.post(endpoints.auth.userRegister, values)
                toast.success('Sign in successfully', {autoClose: 1200});

                setTimeout(() => {
                    navigate('/')
                }, 1400);
            } catch (err) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                toast.error(err.response.data.message);
                console.log(err)
            }
        },
        validationSchema: Yup.object({
            account_name: Yup.string().min(6, 'Your Customer name must be at least 6 characters').max(10, 'Your Customer name must be under 10 characters').required('Your Customer name is required'),
            email: Yup.string().email('Your email is invalid').required('Your Customer email is required'),
            password: Yup.string().min(6, 'Your password must be at least 6 characters').required('Your password is required'),
            confirmPassword: Yup.string().oneOf(
                [Yup.ref('password')], 'Passwords dost not match'
            ).required('Your confirm password is required'),
        })
    })

    useEffect(() => {
        if (currDate.getHours() >= 0 && currDate.getHours() <= 10) {
            setGreeting('Welcome to LOLI Shopping')
        } else if (currDate.getHours() > 10 && currDate.getHours() <= 12) {
            setGreeting('You want to discover something? Let me show you all')
        } else if (currDate.getHours() > 12 && currDate.getHours() <= 17) {
            setGreeting('We have anything that you want:)')
        } else {
            setGreeting('Sometimes is different to get something strange...')
        }
    }, []);

    return (
        <div className="w-screen min-h-screen bg-white flex justify-between items-center flex-col relative">
            <div
                className={'bg-[var(--bg-color)] w-full h-fit max-w-[calc(100vw-40px) text-white font-bold p-5 flex justify-between items-center' +
                    'flex-row'}>
                <div className={'text-2xl flex justify-center items-center'} style={{fontFamily: 'cursive'}}>Welcome to
                    Loli shopping
                </div>
                <div className={'flex flex-wrap justify-end items-center w-[50%]'}>
                    <Tooltip title={'You'}>
                        <div className={'bg-[var(--bg-color-btn-2)] px-3 py-3.5 m-2 rounded-lg'}>
                            <BsPerson size={25}/>
                        </div>
                    </Tooltip>
                </div>
            </div>
            <div
                className={'rounded-lg shadow-lg shadow-gray-500 p-2.5 flex flex-col justify-center item-center min-w-[80%] min-h-[400px]'}>
                <div
                    className={'text-white bg-[var(--bg-color)] p-4 rounded-lg w-full min-h-[300px] flex justify-center item-center text-center text-xl'}>
                    <h3 className={'flex justify-center items-center'}>
                        <Typewriter
                            options={{
                                strings: [greeting],
                                autoStart: true,
                                delay: 100,
                                loop: true,
                            }}
                        />
                    </h3>
                </div>
                <div className={'w-full min-h-[400px] flex flex-col justify-center items-center p-2'}>
                    <h3 className={'text-lg'} style={{color: 'orange'}}>Sir, you need to create new account...</h3>

                    <form className={'w-[90%]'} onSubmit={formData.handleSubmit}>
                        <div className={'grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-4 grid-rows-4 md:grid-rows-2'}>
                            <div>
                                <fieldset className={'mt-2.5 rounded-md border-2 border-solid border-gray-300 p-0'}>
                                    <legend className={'text-[var(--bg-color-btn-2)] text-md font-bold'}>Account name
                                    </legend>
                                    <input className={'border-none bg-transparent p-1 w-full h-10 rounded-md'}
                                           type='text'
                                           name={'account_name'}
                                           placeholder={'How can I call you?'}
                                           autoComplete={'off'}
                                           onChange={formData.handleChange}
                                           onBlur={formData.handleBlur}
                                    />
                                </fieldset>
                                {formData.errors.account_name && formData.touched.account_name && (
                                    <p className={'m-1 p-0 '} style={{animation: 'show-errors 0.2s ease-in-out'}}><small
                                        style={{
                                            color: 'red',
                                            fontStyle: 'italic'
                                        }}>{formData.errors.account_name}</small>
                                    </p>)}
                            </div>
                            <div>

                                <fieldset className={'mt-2.5 rounded-md border-2 border-solid border-gray-300 p-0'}>
                                    <legend className={'text-[var(--bg-color-btn-2)] text-md font-bold'}>Your email
                                    </legend>
                                    <input className={'border-none bg-transparent p-1 w-full h-10 rounded-md'}
                                           type='text'
                                           name={'email'}
                                           placeholder={'We want to take an authentication'}
                                           onChange={formData.handleChange}
                                           onBlur={formData.handleBlur}
                                    />
                                </fieldset>
                                {formData.errors.email && formData.touched.email && (
                                    <p className={'m-1 p-0 '} style={{animation: 'show-errors 0.2s ease-in-out'}}><small
                                        style={{color: 'red', fontStyle: 'italic'}}>{formData.errors.email}</small>
                                    </p>)}
                            </div>
                            <div>

                                <fieldset className={'mt-2.5 rounded-md border-2 border-solid border-gray-300 p-0'}>
                                    <legend className={'text-[var(--bg-color-btn-2)] text-md font-bold'}>Your password
                                    </legend>
                                    <div className={'flex justify-center items-center'}>
                                        <input className={'border-none bg-transparent p-1 w-full h-10 rounded-md'}
                                               type={showPassword ? 'text' : 'password'}
                                               name={'password'}
                                               placeholder={'Strong password, please'}
                                               onChange={formData.handleChange}
                                               onBlur={formData.handleBlur}
                                        />
                                        <div className={'p-2 border-l-2 border-gray-500'} onClick={handleShowPassword}>
                                            {showPassword ? <BsEyeSlash size={25}/> :
                                                <BsEye size={25}/>}
                                        </div>
                                    </div>
                                </fieldset>
                                {formData.errors.password && formData.touched.password && (
                                    <p className={'m-1 p-0 '} style={{animation: 'show-errors 0.2s ease-in-out'}}><small
                                        style={{color: 'red', fontStyle: 'italic'}}>{formData.errors.password}</small>
                                    </p>)}
                            </div>

                            <div>

                                <fieldset className={'mt-2.5 rounded-md border-2 border-solid border-gray-300 p-0'}>
                                    <legend className={'text-[var(--bg-color-btn-2)] text-md font-bold'}>Confirm your
                                        password
                                    </legend>
                                    <input className={'border-none bg-transparent p-1 w-full h-10 rounded-md'}
                                           type='password'
                                           name={'confirmPassword'}
                                           autoComplete={'off'}
                                           placeholder={'Do not forget your password'}
                                           onChange={formData.handleChange}
                                           onBlur={formData.handleBlur}
                                    />
                                </fieldset>
                                {formData.errors.confirmPassword && formData.touched.confirmPassword && (
                                    <p className={'m-1 p-0 '} style={{animation: 'show-errors 0.2s ease-in-out'}}><small
                                        style={{
                                            color: 'red',
                                            fontStyle: 'italic'
                                        }}>{formData.errors.confirmPassword}</small>
                                    </p>)}
                            </div>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column'
                        }}>
                            <div className={'flex jus-center items-center flex-row'}>
                                <button
                                    className={'border-2 border-[var(--bg-color-btn-2)] rounded-lg px-3 py-4 text-[var(--bg-color-btn-2)] font-bold'}
                                    onClick={() => {
                                        navigate(-1)
                                    }}>Cancel
                                </button>
                                <button
                                    className={'bg-[var(--bg-color-btn-2)] px-3 py-4 border-none m-2 text-white rounded-lg font-bold'}
                                    type={'submit'}>Submit
                                </button>
                            </div>
                            <div>You are our member?<Link to={'/sign-in'} className={'text-blue-500'}> Login in
                                here</Link></div>
                        </div>
                    </form>
                </div>
            </div>
            <div className={'footer'}></div>
        </div>
    )
}

export default UserSignUp