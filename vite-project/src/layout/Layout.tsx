import Header from "../components/modules/Header.tsx";
import '../assets/css/components/Layout.css'

const Layout = ({child}) => {
    return (
        <div className={'bg-white w-full h-screen flex justify-center items-center'}>
            <div className={'w-full h-full flex flex-col justify-between items-center'}>
                <div className={'w-full'}>
                    <Header />
                </div>
                <div className={'w-full'}>
                    {child}
                </div>
                <div className={'layout-footer'}></div>
            </div>
        </div>
    )
}
export default Layout