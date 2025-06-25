import logo from '../../assets/img/loli.png'
import '../../assets/css/components/Header.css'
import {Link} from "react-router-dom";
import {Tooltip} from "@mui/material";
import {BsBasket, BsPerson, BsSearch} from "react-icons/bs";

const Header = () => {
    return (
        <div className={'w-full h-full flex justify-start items-start'}>
            <div className={'w-full h-full flex justify-between flex-col items-start'}>
                {/* Navigation */}
                <div className={'w-full bg-[var(--secondary-background)]'}>
                    <ul className={'p-2 flex flex-row flex-wrap justify-between items-center text-[var(--text-color)] text-sm'}>
                        <li><Link to={'/feedback'}>FEEDBACK</Link></li>
                        <li><Link to={'/app'}>SAVE MORE ON APP</Link></li>
                        <li><Link to={'/sell-on-loli'}>SELL ON LOLI</Link></li>
                        <li><Link to={'/customer-care'}>CUSTOMER CARE</Link></li>
                        <li><Link to={'/track-my-order'}>TRACK MY ORDER</Link></li>
                        <li><Link to={'/account'}>ACCOUNT</Link></li>
                        <li><Link to={'/get-voucher'}>GET MORE VOUCHERS</Link></li>
                    </ul>
                </div>

                {/* Logo và Tiêu đề */}
                <div className={'w-full flex flex-col sm:flex-row justify-between items-center bg-[var(--bg-color)]'}>
                    <div className={'flex flex-row justify-center items-center'}>
                        <div className='w-[30%] p-3 rounded-full'>
                            <img src={logo} alt='logo' className='w-[50%]'/>
                        </div>
                        <div className='w-[70%]'>
                            <p className='text-center font-bold text-[var(--main-color)] text-xl tracking-wide'><Link
                                to={'/'}>LOLI SHOPPING</Link></p>
                        </div>
                    </div>


                    {/* Search & Icons */}
                    <div className={'flex flex-row justify-around items-center w-full p-2'}>
                        <div className={'w-[10%] text-center'}>
                            <Tooltip title={'Cart'}>
                                <button
                                    type='button'
                                    className='text-[var(--main-color)] border-2 border-[var(--border-color)] p-2 rounded-full'>
                                    <BsBasket size={25}/>
                                </button>
                            </Tooltip>
                        </div>

                        <div className={'max-w-[80%]'}>
                            <form
                                className='w-full flex justify-around items-center border-2 border-[var(--main-color)] rounded-full p-2 bg-[var(--background)]'>
                                <fieldset className='w-[80%]'>
                                    <input
                                        className='outline-0 w-full text-[var(--text-color)] bg-transparent'
                                        type='text'
                                        name='keyword'
                                        placeholder='Type anything'
                                    />
                                </fieldset>
                                <button className='w-[10%]' type="submit">
                                    <BsSearch size={20} color={'var(--main-color)'}/>
                                </button>
                            </form>
                        </div>

                        <div className={'w-[10%] text-center'}>
                            <button
                                className='text-[var(--main-color)] border-2 border-[var(--border-color)] p-2 rounded-full'>
                                <BsPerson size={25}/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Header;