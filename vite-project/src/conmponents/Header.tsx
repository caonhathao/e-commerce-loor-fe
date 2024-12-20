import banner from '../assets/img/11-1712.png'
import logo from '../assets/img/loli.png'
import '../assets/css/components/Header.css'
import {Link} from "react-router-dom";
import {Tooltip} from "@mui/material";

const Header = () => {
    return (
        <div className={'header-container'}>
            <div className={'header-content'}>
                <div className={'header-content-banner'}>
                    <img src={banner} alt="banner"/>
                </div>
                <div className={'header-content-navbar'}>
                    <ul className={'header-navbar'}>
                        <li><Link to={'/feedback'}>FEEDBACK</Link></li>
                        <li><Link to={'/app'}>SAVE MORE ON APP</Link></li>
                        <li><Link to={'/sell-on-loli'}>SELL ON LOLI</Link></li>
                        <li><Link to={'/customer-care'}>CUSTOMER CARE</Link></li>
                        <li><Link to={'/track-my-order'}>TRACK MY ORDER</Link></li>
                        <li><Link to={'/account'}>ACCOUNT</Link></li>
                        <li><Link to={'/get-voucher'}>GET MORE VOUCHERS</Link></li>
                    </ul>
                </div>
                <div className={'header-content-search'}>
                    <div className={'search-logo'}>
                        <Link to={'/'}>
                            <img src={logo} alt="logo"/>
                        </Link>
                    </div>
                    <div className={'search-input'}>
                        <form className={'form-css'}>
                            <fieldset className={'fieldset-css'}>
                                <input className={'input-css'} type='text' name='keyword' placeholder='type anything'/>
                            </fieldset>
                            <button className={'feature-btn'} type="submit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                     className="bi bi-search" viewBox="0 0 16 16">
                                    <path
                                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                </svg>
                            </button>
                        </form>
                    </div>
                    <div className={'search-cart'} style={{'width': '10%'}} >
                        <Tooltip title={'cart'}>
                            <button className={'feature-btn'}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                     className="bi bi-cart" viewBox="0 0 16 16">
                                    <path
                                        d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                                </svg>
                            </button>
                        </Tooltip>
                    </div>
                    <div className={'search-ads'}>
                        <Link to={'/vouchers'}>
                            <img src={logo} alt="logo"/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;