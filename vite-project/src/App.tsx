import './App.css'

import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext.tsx";
import AppRouters from "./routers/AppRouters.tsx";
import {ToastContainer} from "react-toastify";

function App() {

    return(
        <BrowserRouter>
            <AuthProvider>
                <AppRouters/>
            </AuthProvider>
            <ToastContainer/>
        </BrowserRouter>
    )
}

export default App;
