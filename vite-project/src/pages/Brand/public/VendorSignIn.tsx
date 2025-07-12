import {useEffect, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Tooltip} from "@mui/material";
import Typewriter from "typewriter-effect";
import {Link, useNavigate} from "react-router-dom";
import '../../../assets/css/pages/customer/SignUp.css'
import {ToastContainer, toast} from "react-toastify";
import {
    BsArrowThroughHeartFill,
    BsEyeFill,
    BsEyeSlash,
    BsInfoCircle
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
                        // window.location.reload();
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
        <div className="w-screen min-h-screen bg-white flex jus-center items-center flex-col relative">
            <div
                className={'bg-[var(--secondary-background)] w-full max-w-[calc(100vw-40px)] text-white font-bold p-2 flex justify-between items-center flex-row rounded-b-lg'}>
                <div className={'text-2xl w-[80%]'}>
                    <Link to={'/'} className={'text-[var(--text-color)]'}>
                        Chào mừng bạn đến với
                        <div
                            className={'text-[var(--accent-color)] w-fit flex flex-row gap-2 justify-center items-center'}>
                            LOLITA SHOPPING
                            <BsArrowThroughHeartFill size={20} color={'var(--accent-color)'}/>
                        </div>
                    </Link>
                </div>
                <div className={'flex flex-row flex-wrap justify-center items-center w-fit gap-2'}>
                    <Tooltip title={'Điều khoản'}>
                        <div
                            className={'text-[var(--text-color)] p-3 border-2 border-[var(--accent-color)] rounded-lg'}>
                            <BsInfoCircle size={20}/>
                        </div>
                    </Tooltip>
                </div>
            </div>
            <div
                className={'w-[80%] rounded-lg shadow-lg shadow-gray-600 p-2 flex justify-center items-center flex-col my-5'}>
                <div
                    className={'text-[var(--text-color)] bg-[var(--main-color)] p-4 rounded-lg min-w-full max-w-full min-h-[200px] flex items-center justify-center text-center text-lg'}>
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
                <div className={'flex justify-center items-center'}>
                    <form className={'bg-[var(--primary-background)]'} onSubmit={formData.handleSubmit}>
                        <h3 style={{color: 'var(--text-color)'}}>Nhà bán hàng ơi, hãy đăng nhập và kiểm tra <strong>hộp
                            thư</strong> của bạn đi nào:)</h3>

                        <fieldset className={'mt-2.5 rounded-lg border-1 border-[var(--border-color)]'}>
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
                            className={'mt-2.5 rounded-lg border-1  border-[var(--border-color)] flex flex-row gap-2 justify-center items-center'}>
                            <input className={'p-2 outline-0 w-full border-r-2 border-[var(--border-color)]'}
                                   type={showPass ? 'test' : 'password'} name={'password'}
                                   placeholder={'Mật khẩu'}
                                   onChange={formData.handleChange}
                                   onBlur={formData.handleBlur}
                            />
                            <button type={'button'}
                                    className={'p-1 m-1 border-2 border-[var(--accent-color)] rounded-full'}
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
                                    className={'bg-[var(--btn-primary-bg)] rounded-full border-2 border-[var(--bg-color-btn-2)] px-2 py-3 m-2.5 text-[var(--text-color)]'}
                                    type={'submit'}>Xác nhận
                                </button>
                                <button
                                    className={'rounded-full border-2 border-[var(--btn-secondary-text)] px-2 py-3 m-2.5 text-[var(--text-color)]'}
                                    onClick={() => {
                                        navigate(-1)
                                    }}>Hủy
                                </button>
                            </div>
                            <Link to={'/register-new-vendor'}>Bạn là người mới sao? Đăng kí ở đây nè</Link>
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