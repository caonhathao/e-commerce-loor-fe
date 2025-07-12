import '../../assets/css/pages/account/Account.css'
import {Link} from "react-router-dom";
import accountImg from '../../assets/img/VendorOffer/img1.png'
import vendorImg from '../../assets/img/VendorOffer/img2.png'

const Account = () => {
    return (
        <div className={'flex flex-col items-center justify-start w-full min-h-screen'}>
            <div className="flex flex-col md:flex-row md:w-[80%] items-center justify-start md:justify-between w-full">
                <div
                    className={'w-[50%] md:w-[40%] p-3 rounded-lg text-center border-2 border-[var(--bg-color)] flex flex-col justify-center items-center show-up-anim my-5'}
                    style={{animationFillMode: 'forwards', animationDelay: '0s'}}>
                    <img style={{width: '30%'}} src={accountImg} alt={'logo'}/>
                    <h3 className={'text-[var(--text-color)] border-b-2 border-[(var(--bg-color)] font-bold'}>
                        Cho người tiêu dùng</h3>
                    <div className={'grid grid-cols-1 grid-rows-2 gap-2 mt-3'}>
                        <div
                            className={'text-[var(--text-color)] bg-[var(--btn-primary-bg)] p-2 border-2 border-[var(--border-color)] rounded-lg'}>
                            <Link to={'/user-sign-in'}>Đăng nhập</Link></div>
                        <div
                            className={'text-[var(--text-color)]  bg-[var(--secondary-background)] p-2 border-2 border-[var(--text-color)] rounded-lg'}>
                            <Link to={'/user-sign-up'}>Đăng ký</Link></div>
                    </div>
                </div>
                <div
                    className={'w-[50%] md:w-[40%] p-3 rounded-lg text-center border-2 border-[var(--bg-color)]  flex flex-col justify-center items-center show-up-anim my-5'}
                    style={{animationFillMode: 'forwards', animationDelay: '1s'}}>
                    <img style={{width: '30%'}} src={vendorImg} alt={'logo'}/>
                    <h3 className={'text-[var(--text-color)] border-b-2 border-[var(--bg-color)] font-bold'}> Cho nhà
                        bán hàng</h3>
                    <div className={'grid grid-cols-1 grid-rows-2 gap-2 mt-3'}>

                        <div
                            className={'text-[var(--text-color)] bg-[var(--btn-primary-bg)] p-2 border-2 border-[var(--border-color)] rounded-lg'}>
                            <Link to={'/sign-in-vendor'}>Đăng nhập</Link></div>
                        <div
                            className={'text-[var(--text-color)] bg-[var(--secondary-background)] p-2 border-2 border-[var(--text-color)] rounded-lg'}>
                            <Link to={'/register-new-vendor'}>Đăng ký</Link></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Account