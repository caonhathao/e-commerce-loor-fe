import {Suspense} from "react";
import Loading from "../components/loading/Loading.tsx";
import PublicRouters from "./PublicRouters.tsx";
import {Routes} from "react-router-dom";
import VendorRouters from "./VendorRouters.tsx";

const AppRouters = () => {
    return (
        <Suspense fallback={<Loading/>}>
            <Routes>
                {PublicRouters()}

                {VendorRouters()}

            </Routes>
        </Suspense>
    )
}

export default AppRouters