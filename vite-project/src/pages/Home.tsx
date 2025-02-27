import testImg from '../assets/img/1099451.jpg'
import * as Bs from 'react-icons/bs'
const Home = () => {
    return (
        <div className={'w-full h-full'}>
            <div className={'flex flex-row flex-wrap justify-start items-center m-2'}>
                {/*this is a card: show product*/}
                <div className={'w-50 h-70 shadow-lg shadow-gray-600 rounded-lg p-2'}>
                    {/*this is for picture*/}
                    <div className={'h-3/5 flex flex-col justify-center items-center'}>
                        <img src={testImg} alt="pciture"/>
                    </div>
                    {/*this is for description*/}
                    <div className={'h-2/5'}>
                        <div className={'text-base p-1'}>Thảm lót chuột cỡ lớn - Thanh Gươm Diệt Quỷ</div>
                        <div className={'text-sm p-1'}>600.000</div>
                        <div className={'text-xs flex flex-row justify-start items-center p-1'}>
                            <div><Bs.BsStarFill color={'yellow'}/></div>
                            <div>5.0</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;