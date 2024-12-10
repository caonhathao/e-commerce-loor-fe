import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignIn from "./pages/account/SignIn.tsx";
import Layout from "./conmponents/Layout.tsx";

function App() {
    return (
        <BrowserRouter basename='/'>
            <Routes>
                <Route path={'/'} element={<Layout child={null}/>}/>
                <Route path="/sign-in" element={<SignIn/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
