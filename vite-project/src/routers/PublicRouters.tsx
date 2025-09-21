import {Route} from "react-router-dom";
import Layout from "../layout/Layout.tsx";
import Home from "../pages/global/Home.tsx";
import VendorOffer from "../pages/vendor/public/VendorOffer.tsx";
import UserSignUp from "../pages/guest/public/UserSignUp.tsx";
import UserSignIn from "../pages/guest/public/UserSignIn.tsx";
import Account from "../pages/global/Account.tsx";
import VendorSignUp from "../pages/vendor/public/VendorSignUp.tsx";
import VendorSignIn from "../pages/vendor/public/VendorSignIn.tsx";
import NotFound from "../pages/global/NotFound.tsx";
import ProductDetail from "../pages/global/ProductDetail.tsx";
import AdminSignIn from "@/pages/admin/account/AdminSignIn.tsx";
import AdminSignUp from "@/pages/admin/account/AdminSignUp.tsx";

const PublicRouters = () => {
    return (
        <>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path="sell-on-loli" element={<VendorOffer/>}/>
                <Route path="account" element={<Account/>}/>
                <Route path={'product-detail/:id'} element={<ProductDetail/>}/>
                <Route path={'*'} element={<NotFound/>}/>
            </Route>
            <Route path="/user-sign-up" element={<UserSignUp/>}/>
            <Route path="/user-sign-in" element={<UserSignIn/>}/>
            <Route path="/register-new-vendor" element={<VendorSignUp/>}/>
            <Route path="/sign-in-vendor" element={<VendorSignIn/>}/>
            <Route path="/admin-sign-in" element={<AdminSignIn/>}/>
            <Route path="/admin-sign-up" element={<AdminSignUp/>}/>
        </>
    )
}

export default PublicRouters