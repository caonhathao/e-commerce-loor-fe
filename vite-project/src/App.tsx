import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignUp from "./pages/Customer/SignUp.tsx";
import Layout from "./layout/Layout.tsx";
import SignIn from "./pages/Customer/SignIn.tsx";
import VendorOffer from "./pages/Brand/VendorOffer.tsx";
import VendorSignUp from "./pages/Brand/VendorSignUp.tsx";
import VendorSignIn from "./pages/Brand/VendorSignIn.tsx";
import Account from "./pages/Account/Account.tsx";
import {useEffect, useState} from "react";
import VendorLayout from "./layout/VendorLayout.tsx";
import VendorHome from "./pages/Brand/Admin/VendorHome.tsx";
import JWTDecode from "./security/JWTDecode.tsx";
import VendorManager from "./pages/Brand/Admin/VendorManager.tsx";
import NewProduct from "./components/vendor/Control/NewProduct.tsx";
import {ToastContainer} from "react-toastify";
import Loading from "./components/loading/Loading.tsx";
import UpdateProduct from "./components/vendor/Control/UpdateProduct.tsx";
import {ProductProvider} from "./context/ProductContext.tsx";
import VendorProfile from "./pages/Brand/Admin/VendorProfile.tsx";
import VendorOrders from "./pages/Brand/Admin/VendorOrders.tsx";
import Home from "./pages/Home.tsx";

function App() {
    const [roleName, setRoleName] = useState<string>('');


    useEffect(() => {
        if (sessionStorage.getItem('userToken') === null) setRoleName("ROLE_CUSTOMER");
        else {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setRoleName(JWTDecode(sessionStorage.getItem('userToken'))["role"]);
        }
    }, []);

    if (roleName === '') return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <Loading/>
        </div>
    )

    return (
        <>
            {roleName === 'ROLE_CUSTOMER' ?
                <BrowserRouter basename={'/'}>
                    <Routes>
                        <Route path={'/'} element={<Layout child={<Home/>}/>}/>
                        <Route path={'/sell-on-loli'} element={<Layout child={<VendorOffer/>}/>}/>
                        <Route path="/sign-up" element={<SignUp/>}/>
                        <Route path="/sign-in" element={<SignIn/>}/>
                        <Route path={'/register-new-vendor'} element={<VendorSignUp/>}/>
                        <Route path={'/sign-in-vendor'} element={<VendorSignIn/>}/>
                        <Route path={'/account'} element={<Layout child={<Account/>}/>}/>
                    </Routes>
                </BrowserRouter>
                : <BrowserRouter basename={'/vendor'}>
                    <ProductProvider>  {/* Bọc toàn bộ Routes */}
                        <Routes>
                            <Route path={'/'} element={<VendorLayout child={<VendorHome/>}/>}/>
                            <Route path={'/manage'} element={<VendorLayout child={<VendorManager/>}/>}/>
                            <Route path={'/manager/create'} element={<VendorLayout child={<NewProduct/>}/>}/>
                            <Route path={'/manager/e/:id'} element={<VendorLayout child={<UpdateProduct/>}/>}/>
                            <Route path={'/orders'} element={<VendorLayout child={<VendorOrders/>}/>}/>
                            <Route path={'/support'} element={<VendorLayout child={null}/>}/>
                            <Route path={'/shop-info'} element={<VendorLayout child={<VendorProfile/>}/>}/>
                        </Routes>
                    </ProductProvider>
                </BrowserRouter>
            }
            <ToastContainer/>
        </>
    )
}

export default App
