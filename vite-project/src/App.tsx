import './App.css'
import React, {Suspense, useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";

import Layout from "./layout/Layout.tsx";
import VendorLayout from "./layout/VendorLayout.tsx";
import JWTDecode from "./security/JWTDecode.tsx";
import Loading from "./components/loading/Loading.tsx";
import {ProductProvider} from "./context/ProductContext.tsx";
import {getAccessToken} from "./services/tokenStore.tsx";

// Lazy-loaded pages/components
const SignUp = React.lazy(() => import("./pages/Customer/SignUp.tsx"));
const SignIn = React.lazy(() => import("./pages/Customer/SignIn.tsx"));
const VendorOffer = React.lazy(() => import("./pages/Brand/VendorOffer.tsx"));
const VendorSignUp = React.lazy(() => import("./pages/Brand/VendorSignUp.tsx"));
const VendorSignIn = React.lazy(() => import("./pages/Brand/VendorSignIn.tsx"));
const Account = React.lazy(() => import("./pages/Account/Account.tsx"));
const VendorHome = React.lazy(() => import("./pages/Brand/Vendor/VendorHome.tsx"));
const VendorManager = React.lazy(() => import("./pages/Brand/Vendor/VendorManager.tsx"));
const NewProduct = React.lazy(() => import("./components/vendor/Control/NewProduct.tsx"));
const UpdateProduct = React.lazy(() => import("./components/vendor/Control/UpdateProduct.tsx"));
const VendorProfile = React.lazy(() => import("./pages/Brand/Vendor/VendorProfile.tsx"));
const VendorOrders = React.lazy(() => import("./pages/Brand/Vendor/VendorOrders.tsx"));
const Home = React.lazy(() => import("./pages/Home.tsx"));
const VendorVariant = React.lazy(() => import("./pages/Brand/Product/VendorVariant.tsx"));
const UpdateVariant = React.lazy(() => import("./components/vendor/Control/UpdateVariant.tsx"));
const NewVariant = React.lazy(() => import("./components/vendor/Control/NewVariant.tsx"));

function App() {
    const [roleName, setRoleName] = useState<string>('');


    useEffect(() => {
        if (getAccessToken() !== '') {
            const res = JWTDecode(getAccessToken())
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setRoleName(res["role"])
        } else setRoleName('ROLE_CUSTOMER')
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
                    <Suspense fallback={<Loading/>}>
                        <Routes>
                            <Route path={'/'} element={<Layout child={<Home/>}/>}/>
                            <Route path={'/sell-on-loli'} element={<Layout child={<VendorOffer/>}/>}/>
                            <Route path="/sign-up" element={<SignUp/>}/>
                            <Route path="/sign-in" element={<SignIn/>}/>
                            <Route path={'/register-new-vendor'} element={<VendorSignUp/>}/>
                            <Route path={'/sign-in-vendor'} element={<VendorSignIn/>}/>
                            <Route path={'/account'} element={<Layout child={<Account/>}/>}/>
                        </Routes>
                    </Suspense>
                </BrowserRouter>
                : <BrowserRouter basename={'/vendor'}>
                    <ProductProvider>  {/* Bọc toàn bộ Routes */}
                        <Suspense fallback={<Loading/>}>
                            <Routes>
                                <Route path={'/'} element={<VendorLayout child={<VendorHome/>}/>}/>
                                <Route path={'/manage'} element={<VendorLayout child={<VendorManager/>}/>}/>
                                <Route path={'/manager/create'} element={<VendorLayout child={<NewProduct/>}/>}/>
                                <Route path={'/manager/show-variant/:id'}
                                       element={<VendorLayout child={<VendorVariant/>}/>}/>
                                <Route path={'/manager/show-variant/create-new-variant/:id'}
                                       element={<VendorLayout child={<NewVariant/>}/>}/>
                                <Route path={'/manager/show-variant/update-main-description/:id'}
                                       element={<VendorLayout child={<UpdateProduct/>}/>}/>
                                <Route path={'/manager/show-variant/update-variant-description/:id'}
                                       element={<VendorLayout child={<UpdateVariant/>}/>}/>
                                <Route path={'/orders'} element={<VendorLayout child={<VendorOrders/>}/>}/>
                                <Route path={'/support'} element={<VendorLayout child={null}/>}/>
                                <Route path={'/shop-info'} element={<VendorLayout child={<VendorProfile/>}/>}/>
                            </Routes>
                        </Suspense>
                    </ProductProvider>
                </BrowserRouter>
            }
            <ToastContainer/>
        </>
    )
}

export default App
