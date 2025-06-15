import banner from '../../assets/img/11-1712.png'
import '../../assets/css/components/Header.css'
import {Link} from "react-router-dom";
import {Tooltip} from "@mui/material";
import {BsBasket, BsPerson, BsSearch} from "react-icons/bs";

const Header = () => {
    return (
        <div className={'w-full min-h-[200px] flex justify-center items-center'}>
            <div className={'p-3 flex justify-between flex-col items-center'}>
                <div className={'header-content-banner'}>
                    <img src={banner} alt="banner"/>
                </div>
                <div className={'w-[90%] my-2'}>
                    <ul className={'flex flex-row flex-wrap justify-between items-center'}>
                        <li><Link to={'/feedback'}>FEEDBACK</Link></li>
                        <li><Link to={'/app'}>SAVE MORE ON APP</Link></li>
                        <li><Link to={'/sell-on-loli'}>SELL ON LOLI</Link></li>
                        <li><Link to={'/customer-care'}>CUSTOMER CARE</Link></li>
                        <li><Link to={'/track-my-order'}>TRACK MY ORDER</Link></li>
                        <li><Link to={'/account'}>ACCOUNT</Link></li>
                        <li><Link to={'/get-voucher'}>GET MORE VOUCHERS</Link></li>
                    </ul>
                </div>
                <div className={'flex justify-around items-center w-full flex-row'}>
                    <div className={'w-[10%] text-center'}>
                        <Tooltip title={'cart'}>
                            <button type={'button'}
                                    className={'text-[var(--title-color-1)] border-2 border-[var(--bg-color)] p-2 rounded-full'}>
                                <BsBasket size={25}/>
                            </button>
                        </Tooltip>
                    </div>
                    <div className={'max-w-[80%]'}>
                        <form
                            className={'w-full flex justify-around items-center flex-row  border-2 border-[var(--title-color-1)] rounded-full p-2'}>
                            <fieldset className={'w-[80%]'}>
                                <input className={'outline-0'} type='text' name='keyword' placeholder='type anything'/>
                            </fieldset>
                            <button className={'w-[10%]'} type="submit">
                                <BsSearch size={20} color={'var(--title-color-1)'}/>
                            </button>
                        </form>
                    </div>
                    <div className={'w-[10%]'}>
                        <button
                            className={'text-[var(--title-color-1)] border-2 border-[var(--bg-color)] p-2 rounded-full'}>
                            <BsPerson size={25}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;