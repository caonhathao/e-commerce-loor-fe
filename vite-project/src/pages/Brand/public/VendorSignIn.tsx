import {useEffect, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import Typewriter from "typewriter-effect";
import {Link, useNavigate} from "react-router-dom";
import '../../../assets/css/pages/customer/SignUp.css'
import {ToastContainer, toast} from "react-toastify";
import {
    BsEyeFill,
    BsEyeSlash,
} from "react-icons/bs";
import apiClient from "../../../services/apiClient.tsx";
import endpoints from "../../../services/endpoints.tsx";
import {useAuth} from "../../../context/AuthContext.tsx";

const VendorSignIn = () => {
    const [showPass, setShowPass] = useState(false);
    const [greeting, setGreeting] = useState('');
    const [currDate] = useState(new Date());
    const navigate = useNavigate();

    const {login} = useAuth();

    const handleShowPassword = () => {
        setShowPass(!showPass);
    }

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
                if (response.status === 200) {
                    const {access, data} = response.data;
                    login(access, data);
                    toast.success('Sign in successfully.', {autoClose: 2000});
                    setTimeout(() => {
                        navigate('/vendor');
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
            setGreeting('Chào mừng bạn đến với LOLITA SHOPPING')
        } else if (currDate.getHours() > 10 && currDate.getHours() <= 12) {
            setGreeting('Kiểm tra đơn hàng của bạn ngay đi, hoặc bạn sẽ bỏ lỡ những điều quan trọng đó!')
        } else if (currDate.getHours() > 12 && currDate.getHours() <= 17) {
            setGreeting('Phát trực tiếp là cách tiếp thị tốt nhất đẻ quảng bá sản phẩm đến người tiêu dùng.')
        } else {
            setGreeting('Thi thoảng bạn nên thử một điều mới lạ nào đó đi...')
        }
    }, []);

    return (
        <div className="w-screen min-h-screen bg-white flex flex-col justify-between items-center relative">
            <div
                className={'bg-[var(--secondary-background)] w-full max-w-[calc(100vw-40px)] text-white font- flex flex-row justify-center'}>
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
            </div>
            <div
                className={'w-[80%] rounded-lg shadow-lg shadow-gray-600 flex flex-col justify-center items-center my-5 border-2 border-[rgb(var(--main-color))]'}>
                <div
                    className={'text-white bg-[rgb(var(--main-color))] p-4 rounded-t-lg min-w-full max-w-full min-h-[200px] flex items-center justify-center text-center text-lg'}>
                    <h3>
                        <Typewriter
                            options={{
                                strings: [greeting],
                                autoStart: true,
                                delay: 100,
                                loop: true,
                                cursor: '[]',
                            }}
                        />
                    </h3>
                </div>
                <div className={'flex justify-center items-center p-2'}>
                    <form className={'bg-[var(--primary-background)]'} onSubmit={formData.handleSubmit}>
                        <p className={'text-amber-600 italic'}>Nhà bán hàng ơi, hãy đăng nhập và kiểm tra <strong
                            className={'underline'}>hộp thư</strong> của bạn đi nào:)</p>

                        <fieldset className={'mt-2.5 rounded-lg border-1 border-[var(--border-color)] p-1'}>
                            <input className={'p-2 outline-0 w-full'} type='text' name={'email'}
                                   placeholder={'Email'}
                                   onChange={formData.handleChange}
                                   onBlur={formData.handleBlur}
                            />
                        </fieldset>
                        {formData.errors.email && formData.touched.email && (
                            <p className={'show-errors'}><small
                                style={{
                                    color: 'var(--text-error)',
                                    fontStyle: 'italic'
                                }}>{formData.errors.email}</small>
                            </p>)}

                        <fieldset
                            className={'mt-2.5 rounded-lg border-1  border-[var(--border-color)] flex flex-row gap-2 justify-center items-center p-1'}>
                            <input className={'p-2 outline-0 w-full border-r-2 border-[rgb(var(--border-color))]'}
                                   type={showPass ? 'test' : 'password'} name={'password'}
                                   placeholder={'Mật khẩu'}
                                   onChange={formData.handleChange}
                                   onBlur={formData.handleBlur}
                            />
                            <button type={'button'}
                                    className={'p-1 m-1 border-[1px] border-[rgb([var(--border-color))] rounded-full text-gray-600'}
                                    onClick={() => handleShowPassword()}>
                                {showPass ? <BsEyeSlash/> : <BsEyeFill/>
                                }</button>
                        </fieldset>
                        {formData.errors.password && formData.touched.password && (
                            <p className={'show-errors'}><small
                                style={{
                                    color: 'var(--text-error)',
                                    fontStyle: 'italic'
                                }}>{formData.errors.password}</small>
                            </p>
                        )}

                        <div className={'flex flex-col justify-center items-center'}>
                            <div className={'grid grid-cols-2 grid-rows-1 gap-2'}>
                                <button
                                    className={'rounded-full border-2 border-[rgb(var(--border-color))] px-2 py-3 m-2.5 text-[rgb(var(--text-color))]'}
                                    onClick={() => {
                                        navigate(-1)
                                    }}>Hủy
                                </button>
                                <button
                                    className={'bg-[rgb(var(--main-color))] rounded-full px-3 py-3 m-2.5 text-white'}
                                    type={'submit'}>Xác nhận
                                </button>
                            </div>
                            <p>
                                Bạn là người mới sao? Đăng kí
                                <Link to={'/register-new-vendor'} className={'underline text-blue-500'}>
                                    {' '}ở đây nè
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <div className={'w-full flex flex-col justify-center items-center gap-2'}>
                <div className={'w-full grid grid-cols-3 grid-rows-1 gap-4 px-2'}>
                    <button
                        className={'p-2 border-2 border-[rgb(var(--main-color))] rounded-full text-[rgb(var(--main-color))]'}>
                        Điều khoản
                    </button>
                    <button
                        className={'p-2 border-2 border-[rgb(var(--secondary-color))] rounded-full text-[rgb(var(--secondary-color))]'}>
                        Hướng dẫn
                    </button>
                    <button
                        className={'p-2 border-2 border-amber-600 rounded-full text-amber-600'}>
                        Thắc mắc
                    </button>
                </div>
                <div className={'w-full grid grid-cols-2 grid-rows-1 gap-4 px-2'}>
                    <button
                        className={'p-2 border-2 border-[rgb(var(--border-color))] rounded-full text-[rgb(var(--border-color))]'}>
                        Khiếu nại
                    </button>
                    <button
                        className={'p-2 border-2 border-red-400 rounded-full text-red-400'}>Góp
                        ý
                    </button>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}
export default VendorSignIn