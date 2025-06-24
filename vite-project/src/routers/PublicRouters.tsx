import {Route} from "react-router-dom";
import Layout from "../layout/Layout.tsx";
import Home from "../pages/Home.tsx";
import VendorOffer from "../pages/Brand/VendorOffer.tsx";
import SignUp from "../pages/Customer/SignUp.tsx";
import SignIn from "../pages/Customer/SignIn.tsx";
import Account from "../pages/Account/Account.tsx";
import VendorSignUp from "../pages/Brand/VendorSignUp.tsx";
import VendorSignIn from "../pages/Brand/VendorSignIn.tsx";
import NotFound from "../pages/Global/NotFound.tsx";

const PublicRouters = () => {
    return (
        <>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path="sell-on-loli" element={<VendorOffer/>}/>
                <Route path="sign-up" element={<SignUp/>}/>
                <Route path="sign-in" element={<SignIn/>}/>
                <Route path="account" element={<Account/>}/>
                <Route path={'*'} element={<NotFound/>}/>

            </Route>
            <Route path="/register-new-vendor" element={<VendorSignUp/>}/>
            <Route path="/sign-in-vendor" element={<VendorSignIn/>}/>
        </>
    )
}

export default PublicRouters