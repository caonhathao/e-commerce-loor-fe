import {Suspense} from "react";
import Loading from "../components/loading/Loading.tsx";
import PublicRouters from "./PublicRouters.tsx";
import {Routes} from "react-router-dom";
import VendorRouters from "./VendorRouters.tsx";
import UserRouters from "./UserRouters.tsx";
import RedirectByRole from "./RedirectByRole.tsx";

const AppRouters = () => {
    return (
        <Suspense fallback={<Loading/>}>
            <RedirectByRole/>
            <Routes>
                {PublicRouters()}
                {VendorRouters()}
                {UserRouters()}
            </Routes>
        </Suspense>
    )
}

export default AppRouters