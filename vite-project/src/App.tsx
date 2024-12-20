import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignUp from "./pages/Customer/SignUp.tsx";
import Layout from "./conmponents/Layout.tsx";
import SignIn from "./pages/Customer/SignIn.tsx";
import VendorOffer from "./pages/Brand/VendorOffer.tsx";
import VendorSignUp from "./pages/Brand/VendorSignUp.tsx";
import VendorSignIn from "./pages/Brand/VendorSignIn.tsx";
import Account from "./pages/Account/Account.tsx";
import {useEffect, useState} from "react";
import VendorLayout from "./conmponents/VendorLayout.tsx";

function App() {
    const [roleName, setRoleName] = useState('');

    useEffect(() => {
        setRoleName(sessionStorage.getItem("currRole") ?? 'ROLE_CUSTOMER');
    }, []);

    return (
        <BrowserRouter basename='/'>
            {(roleName === 'ROLE_CUSTOMER') ? (
                <Routes>
                    <Route path={'/'} element={<Layout child={null}/>}/>
                    <Route path={'/sell-on-loli'} element={<Layout child={<VendorOffer/>}/>}/>
                    <Route path="/sign-up" element={<SignUp/>}/>
                    <Route path="/sign-in" element={<SignIn/>}/>
                    <Route path={'/register-new-vendor'} element={<VendorSignUp/>}/>
                    <Route path={'/sign-in-vendor'} element={<VendorSignIn/>}/>
                    <Route path={'/account'} element={<Layout child={<Account/>}/>}/>
                </Routes>
            ) : (
                <Routes>
                    <Route path={'/vendor-manage'} element={<VendorLayout child={null}/>}/>
                </Routes>
            )}
        </BrowserRouter>
    )
}

export default App
