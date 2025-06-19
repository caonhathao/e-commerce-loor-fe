import './App.css'
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Layout & common
import Layout from "./layout/Layout.tsx";
import VendorLayout from "./layout/VendorLayout.tsx";
import JWTDecode from "./security/JWTDecode.tsx";
import Loading from "./components/loading/Loading.tsx";
import { ProductProvider } from "./context/ProductContext.tsx";
import { getAccessToken } from "./services/tokenStore.tsx";

// Pages & components (direct imports)
import SignUp from "./pages/Customer/SignUp.tsx";
import SignIn from "./pages/Customer/SignIn.tsx";
import VendorOffer from "./pages/Brand/VendorOffer.tsx";
import VendorSignUp from "./pages/Brand/VendorSignUp.tsx";
import VendorSignIn from "./pages/Brand/VendorSignIn.tsx";
import Account from "./pages/Account/Account.tsx";
import VendorHome from "./pages/Brand/Vendor/VendorHome.tsx";
import VendorManager from "./pages/Brand/Vendor/VendorManager.tsx";
import NewProduct from "./components/vendor/Control/NewProduct.tsx";
import UpdateProduct from "./components/vendor/Control/UpdateProduct.tsx";
import VendorProfile from "./pages/Brand/Vendor/VendorProfile.tsx";
import VendorOrders from "./pages/Brand/Vendor/VendorOrders.tsx";
import Home from "./pages/Home.tsx";
import VendorVariant from "./pages/Brand/Product/VendorVariant.tsx";
import UpdateVariant from "./components/vendor/Control/UpdateVariant.tsx";
import NewVariant from "./components/vendor/Control/NewVariant.tsx";

function App() {
    const [roleName, setRoleName] = useState<string>('');

    useEffect(() => {
        if (getAccessToken() !== '') {
            const res = JWTDecode(getAccessToken());
            setRoleName(res["role"]);
        } else {
            setRoleName('ROLE_CUSTOMER');
        }
    }, []);

    if (roleName === '') return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <Loading />
        </div>
    );

    return (
        <>
            {roleName === 'ROLE_CUSTOMER' ? (
                <BrowserRouter basename={'/'}>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route path="sell-on-loli" element={<VendorOffer />} />
                            <Route path="sign-up" element={<SignUp />} />
                            <Route path="sign-in" element={<SignIn />} />
                            <Route path="account" element={<Account />} />
                        </Route>
                        <Route path="/register-new-vendor" element={<VendorSignUp />} />
                        <Route path="/sign-in-vendor" element={<VendorSignIn />} />
                    </Routes>
                </BrowserRouter>
            ) : (
                <BrowserRouter basename={'/vendor'}>
                    <ProductProvider>
                        <Routes>
                            <Route path="/" element={<VendorLayout />}>
                                <Route index element={<VendorHome />} />
                                <Route path="manage" element={<VendorManager />} />
                                <Route path="manager/create" element={<NewProduct />} />
                                <Route path="manager/show-variant/:id" element={<VendorVariant />} />
                                <Route path="manager/show-variant/create-new-variant/:id" element={<NewVariant />} />
                                <Route path="manager/show-variant/update-main-description/:id" element={<UpdateProduct />} />
                                <Route path="manager/show-variant/update-variant-description/:id" element={<UpdateVariant />} />
                                <Route path="orders" element={<VendorOrders />} />
                                <Route path="support" element={<div>Support Coming Soon</div>} />
                                <Route path="shop-info" element={<VendorProfile />} />
                            </Route>
                        </Routes>
                    </ProductProvider>
                </BrowserRouter>
            )}
            <ToastContainer />
        </>
    );
}

export default App;
