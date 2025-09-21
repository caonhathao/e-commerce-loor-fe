import '../assets/css/components/Layout.css'
import {Outlet} from "react-router-dom";

const AdminLayout = () => {
    return (
        <div className={'bg-white w-full h-screen flex justify-center items-center'}>
            <div className={'w-full h-full flex flex-col justify-between items-center'}>
                <main className={'w-full h-full'}>
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}
export default AdminLayout