import {useEffect, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Tooltip} from "@mui/material";
import Typewriter from "typewriter-effect";
import {Link, useNavigate} from "react-router-dom";
import '../../assets/css/pages/customer/SignUp.css'
import {ToastContainer, toast} from "react-toastify";
import {BsBagHeart, BsCart, BsPersonCircle} from "react-icons/bs";
import apiClient from "../../services/apiClient.tsx";
import endpoints from "../../services/endpoints.tsx";
import {setAccessToken} from "../../services/tokenStore.tsx";

const VendorSignIn = () => {

    const [greeting, setGreeting] = useState('');
    const [currDate] = useState(new Date());
    const navigate = useNavigate();

    const formData = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            try {
                /*return: response will have a jwt string*/
                // we need to convert jwt and find the role
                const response = await apiClient.post(endpoints.auth.brandLogin, values)
                if (response) {
                    setAccessToken(response.data.access)
                    toast.success('Sign in successfully.', {autoClose: 2000});
                    setTimeout(() => {
                        navigate('/vendor');
                        window.location.reload();
                    }, 2500);
                } else toast.warning('Sign in failed.');
            } catch (err) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                toast.error(err);
                console.log(err)
            }
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Your email is invalid').required('Your Customer email is required'),
            password: Yup.string().min(6, 'Your password must be at least 6 characters').required('Your password is required'),
        })
    })

    useEffect(() => {
        if (currDate.getHours() >= 0 && currDate.getHours() <= 10) {
            setGreeting('Welcome to LOLI Shopping')
        } else if (currDate.getHours() > 10 && currDate.getHours() <= 12) {
            setGreeting('Check your order now, or you will miss something important.')
        } else if (currDate.getHours() > 12 && currDate.getHours() <= 17) {
            setGreeting('Live stream is the best way to sales')
        } else {
            setGreeting('Sometimes is different to get something strange...')
        }
    }, []);

    return (
        <div className="w-screen min-h-screen bg-white flex jus-center items-center flex-col relative">
            <div
                className={'bg-[var(--bg-color)] w-full max-w-[calc(100vw-40px)] text-white font-bold p-2 flex justify-between items-center flex-row rounded-b-lg'}>
                <div className={'text-2xl w-[70%]'}>
                    <Link to={'/'} style={{color: "white"}}>Welcome to Loli shopping,
                        vendor</Link>
                </div>
                <div className={'flex flex-row flex-wrap justify-center items-center w-[30%]'}>
                    <Tooltip title={'love list'}>
                        <div className={'text-[var(--text-color)] p-3'}>
                            <BsBagHeart size={20}/>
                        </div>
                    </Tooltip>
                    <Tooltip title={'shopping cart'}>
                        <div className={'text-[var(--text-color)] p-3'}>
                            <BsCart size={20}/>
                        </div>
                    </Tooltip>
                    <Tooltip title={'your Customer'}>
                        <div className={'text-[var(--text-color)] p-3'}>
                            <BsPersonCircle size={20}/>
                        </div>
                    </Tooltip>
                </div>
            </div>
            <div
                className={'w-[80%] rounded-lg shadow-lg shadow-gray-600 p-2 flex justify-center items-center flex-col my-5'}>
                <div
                    className={'text-white bg-[var(--bg-color)] p-4 rounded-lg min-w-full max-w-full min-h-[200px] flex items-center jus-center text-center text-lg'}>
                    <h3>
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
                <div className={'flex justify-center items-center'}>
                    <form className={''} onSubmit={formData.handleSubmit}>
                        <h3 style={{color: 'var(--text-color)'}}>Vendor, sign in and check your new orders now...</h3>

                        <fieldset className={'mt-2.5 rounded-lg border-1 border-gray-500'}>
                            <legend className={'text-[var(--text-color)]'}>Your email</legend>
                            <input className={'p-2 outline-0 w-full'} type='text' name={'email'}
                                   placeholder={'We want to take an authentication'}
                                   onChange={formData.handleChange}
                                   onBlur={formData.handleBlur}
                            />
                        </fieldset>
                        {formData.errors.email && formData.touched.email && (
                            <p className={'show-errors'}><small
                                style={{color: 'red', fontStyle: 'italic'}}>{formData.errors.email}</small>
                            </p>)}

                        <fieldset className={'mt-2.5 rounded-lg border-1 border-gray-500'}>
                            <legend className={'text-[var(--text-color)]'}>Your password</legend>
                            <input className={'p-2 outline-0 w-full'} type='text' name={'password'}
                                   placeholder={'From 6 characters or above'}
                                   onChange={formData.handleChange}
                                   onBlur={formData.handleBlur}
                            />
                        </fieldset>
                        {formData.errors.password && formData.touched.password && (
                            <p className={'show-errors'}><small
                                style={{color: 'red', fontStyle: 'italic'}}>{formData.errors.password}</small>
                            </p>)}

                        <div className={'flex flex-col justify-center items-center'}>
                            <div className={'flex justify-center item-center flex-row'}>
                                <button
                                    className={'rounded-full border-2 border-[var(--bg-color-btn-2)] px-2 py-3 m-2.5 text-[var(--text-color)]'}
                                    type={'submit'}>Submit
                                </button>
                                <button
                                    className={'rounded-full border-2 border-[var(--bg-color-btn-2)] px-2 py-3 m-2.5 text-[var(--text-color)]'}
                                    onClick={() => {
                                        navigate(-1)
                                    }}>Cancel
                                </button>
                            </div>
                            <Link to={'/register-new-vendor'}>You are new? Register here</Link>
                        </div>
                    </form>
                </div>
            </div>
            <div className={'footer'}></div>
            <ToastContainer/>
        </div>
    )
}
export default VendorSignIn