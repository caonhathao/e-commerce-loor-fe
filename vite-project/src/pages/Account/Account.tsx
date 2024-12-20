import '../../assets/css/pages/account/Account.css'
import {Link} from "react-router-dom";
import accountImg from '../../assets/img/VendorOffer/img1.png'
import vendorImg from '../../assets/img/VendorOffer/img2.png'

const Account = () => {
    return (
        <div className={'account-container'}>
            <div className="account-content">
                <div className={'for-customer-account'} style={{animationFillMode: 'forwards', animationDelay: '0s'}}>
                    <img style={{width:'30%'}} src={accountImg} alt={'logo'}/>
                    <h3>For customer's account</h3>
                    <div className={'customer-login'}><Link to={'/sign-in'}>Sign in</Link></div>
                    <div className={'customer-register'}><Link to={'/sign-up'}>Create new account</Link></div>
                </div>
                <div className={'for-vendor-account'} style={{animationFillMode: 'forwards', animationDelay: '1s'}}>
                    <img style={{width:'30%'}} src={vendorImg} alt={'logo'}/>
                    <h3>For vendor's account</h3>
                    <div className={'vendor-login'}><Link to={'/sign-in-vendor'}>Sign in</Link></div>
                    <div className={'vendor-register'}><Link to={'/register-new-vendor'}>Create new account</Link></div>
                </div>
            </div>
        </div>
    )
}
export default Account