import Header from "../components/modules/Header.tsx";
import '../assets/css/components/Layout.css'
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <div className={'bg-white w-full h-screen flex justify-center items-center'}>
            <div className={'w-full h-full flex flex-col justify-between items-center'}>
                <div className={'w-full'}>
                    <Header/>
                </div>
                <main className={'w-full'}>
                    <Outlet/>
                </main>
                <div className={'layout-footer'}></div>
            </div>
        </div>
    )
}
export default Layout