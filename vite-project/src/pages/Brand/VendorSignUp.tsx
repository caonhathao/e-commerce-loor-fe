import {useEffect, useState} from "react";
import {useFormik} from "formik";
import axios from "axios";
import * as Yup from "yup";
import {Tooltip} from "@mui/material";
import Typewriter from "typewriter-effect";
import {Link} from "react-router-dom";
import '../../assets/css/pages/customer/SignUp.css'
import {ToastContainer, toast} from "react-toastify";

const VendorSignUp = () => {

    const [greeting, setGreeting] = useState('');
    const [currDate] = useState(new Date());

    const formData = useFormik({
        initialValues: {
            brand_name: '',
            email: '',
            password: '',
            confirmPassword: '',
            numberphone: ''
        },
        onSubmit: async (values) => {
            try {
                const url = import.meta.env.VITE_API_HOST + import.meta.env.VITE_SERVER_PORT + import.meta.env.VITE_API_BRAND_REGISTER;
                const response = await axios.post(url, values);
                console.log(response.data);
                toast.success(response.data.message);
            } catch (err) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                toast.error(err.response.data.message);
                console.log(err)
            }
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Your email is invalid').required('Your Customer email is required'),
            password: Yup.string().min(6, 'Your password must be at least 6 characters').required('Your password is required'),
            confirmPassword: Yup.string().oneOf(
                [Yup.ref('password')], 'Passwords dost not match'
            ).required('Your confirm password is required'),
            numberphone: Yup.string().min(10, "Wrong phone number").max(12, 'Wrong phone number').required('Your phone number is required'),
        })
    })

    useEffect(() => {
        if (currDate.getHours() >= 0 && currDate.getHours() <= 10) {
            setGreeting('Welcome to LOLI Shopping')
        } else if (currDate.getHours() > 10 && currDate.getHours() <= 12) {
            setGreeting('Check you notification now, your customer want to be helped')
        } else if (currDate.getHours() > 12 && currDate.getHours() <= 17) {
            setGreeting('Live stream is the best way to sales')
        } else {
            setGreeting('Sometimes is different to get something strange...')
        }
    }, []);

    return (
        <div className="sign-in-container">
            <div className={'header'}>
                <div className={'header-banner'}><Link to={'/'}>Welcome to Loli shopping, vendor</Link></div>
                <div className={'header-toolbar'}>
                    <Tooltip title={'love list'}>
                        <div className={'feature-btn'}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                 className="bi bi-bag-heart" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                      d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M14 14V5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1M8 7.993c1.664-1.711 5.825 1.283 0 5.120-5.825-3.85-1.664-6.843 0-5.120"/>
                            </svg>
                        </div>
                    </Tooltip>
                    <Tooltip title={'shopping cart'}>
                        <div className={'feature-btn'}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                 className="bi bi-cart" viewBox="0 0 16 16">
                                <path
                                    d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                            </svg>
                        </div>
                    </Tooltip>
                    <Tooltip title={'your Customer'}>
                        <div className={'feature-btn'}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                 className="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                <path fill-rule="evenodd"
                                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                            </svg>
                        </div>
                    </Tooltip>
                </div>
            </div>
            <div className={'sign-in-content'}>
                <div className={'sign-in-banner'}>
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
                <div className={'sign-in-form'}>
                    <form className={'form-css'} onSubmit={formData.handleSubmit}>
                        <h3 style={{color: 'orange'}}>Vendor, we need your information...</h3>
                        <fieldset className={'fieldset-css'}>
                            <legend className={'legend-css'}>Brand name</legend>
                            <input className={'input-css'} type='text' name={'brand_name'}
                                   placeholder={'You can set your brand name later.'}
                                   onChange={formData.handleChange}
                                   onBlur={formData.handleBlur}
                            />
                        </fieldset>

                        <fieldset className={'fieldset-css'}>
                            <legend className={'legend-css'}>Your email</legend>
                            <input className={'input-css'} type='text' name={'email'}
                                   placeholder={'We want to take an authentication'}
                                   onChange={formData.handleChange}
                                   onBlur={formData.handleBlur}
                            />
                        </fieldset>
                        {formData.errors.email && formData.touched.email && (
                            <p className={'show-errors'}><small
                                style={{color: 'red', fontStyle: 'italic'}}>{formData.errors.email}</small>
                            </p>)}

                        <fieldset className={'fieldset-css'}>
                            <legend className={'legend-css'}>Your phone number</legend>
                            <input className={'input-css'} type='text' name={'numberphone'}
                                   placeholder={'We need to contact to you'}
                                   onChange={formData.handleChange}
                                   onBlur={formData.handleBlur}
                            />
                        </fieldset>
                        {formData.errors.numberphone && formData.touched.numberphone && (
                            <p className={'show-errors'}><small
                                style={{color: 'red', fontStyle: 'italic'}}>{formData.errors.numberphone}</small>
                            </p>)}

                        <fieldset className={'fieldset-css'}>
                            <legend className={'legend-css'}>Your password</legend>
                            <input className={'input-css'} type='text' name={'password'}
                                   placeholder={'From 6 characters or above'}
                                   onChange={formData.handleChange}
                                   onBlur={formData.handleBlur}
                            />
                        </fieldset>
                        {formData.errors.password && formData.touched.password && (
                            <p className={'show-errors'}><small
                                style={{color: 'red', fontStyle: 'italic'}}>{formData.errors.password}</small>
                            </p>)}

                        <fieldset className={'fieldset-css'}>
                            <legend className={'legend-css'}>Confirm your password</legend>
                            <input className={'input-css'} type='text' name={'confirmPassword'}
                                   placeholder={'Do not forget your password'}
                                   onChange={formData.handleChange}
                                   onBlur={formData.handleBlur}
                            />
                        </fieldset>
                        {formData.errors.confirmPassword && formData.touched.confirmPassword && (
                            <p className={'show-errors'}><small
                                style={{color: 'red', fontStyle: 'italic'}}>{formData.errors.confirmPassword}</small>
                            </p>)}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column'
                        }}>
                            <div className={'option-btns'}>
                                <button className={'feature-btn'} type={'submit'}>Submit</button>
                                <button className={'feature-btn'}>Cancel</button>
                            </div>
                            <Link to={'/sign-in-vendor'}>You are our member? Login in here</Link>
                        </div>
                    </form>
                </div>
            </div>
            <div className={'footer'}></div>
            <ToastContainer/>
        </div>
    )
}
export default VendorSignUp