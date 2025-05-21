import '../../assets/css/pages/account/Account.css'
import {Link} from "react-router-dom";
import accountImg from '../../assets/img/VendorOffer/img1.png'
import vendorImg from '../../assets/img/VendorOffer/img2.png'

const Account = () => {
    return (
        <div className={'flex flex-col items-center justify-start w-full min-h-screen'}>
            <div className="flex flex-col items-center justify-start w-full">
                <div className={'w-[50%] p-3 rounded-lg text-center bg-[var(--bg-color)] flex flex-col justify-center items-center show-up-anim my-5'} style={{animationFillMode: 'forwards', animationDelay: '0s'}}>
                    <img style={{width:'30%'}} src={accountImg} alt={'logo'}/>
                    <h3 className={'text-white'}>For customer's account</h3>
                    <div className={'text-white'}><Link to={'/sign-in'}>Sign in</Link></div>
                    <div className={'text-white'}><Link to={'/sign-up'}>Create new account</Link></div>
                </div>
                <div className={'w-[50%] p-3 rounded-lg text-center bg-[var(--bg-color)] flex flex-col justify-center items-center show-up-anim my-5'} style={{animationFillMode: 'forwards', animationDelay: '1s'}}>
                    <img style={{width:'30%'}} src={vendorImg} alt={'logo'}/>
                    <h3 className={'text-white'}> For brand's account</h3>
                    <div className={'text-white'}><Link to={'/sign-in-vendor'}>Sign in</Link></div>
                    <div className={'text-white'}><Link to={'/register-new-vendor'}>Create new account</Link></div>
                </div>
            </div>
        </div>
    )
}
export default Account