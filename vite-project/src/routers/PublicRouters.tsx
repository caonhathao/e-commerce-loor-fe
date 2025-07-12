import {Route} from "react-router-dom";
import Layout from "../layout/Layout.tsx";
import Home from "../pages/Global/Home.tsx";
import VendorOffer from "../pages/Brand/public/VendorOffer.tsx";
import SignUp from "../pages/Customer/public/SignUp.tsx";
import UserSignIn from "../pages/Customer/public/UserSignIn.tsx";
import Account from "../pages/Global/Account.tsx";
import VendorSignUp from "../pages/Brand/public/VendorSignUp.tsx";
import VendorSignIn from "../pages/Brand/public/VendorSignIn.tsx";
import NotFound from "../pages/Global/NotFound.tsx";
import ProductDetail from "../pages/Global/ProductDetail.tsx";

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
            <Route path="/user-sign-up" element={<SignUp/>}/>
            <Route path="/user-sign-in" element={<UserSignIn/>}/>
            <Route path="/register-new-vendor" element={<VendorSignUp/>}/>
            <Route path="/sign-in-vendor" element={<VendorSignIn/>}/>
        </>
    )
}

export default PublicRouters