import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "../components/loading/Loading.tsx";
import RedirectByRole from "./RedirectByRole.tsx";

import VendorRouters from "./VendorRouters.tsx";
import UserRouters from "./UserRouters.tsx";
import PublicRouters from "./PublicRouters.tsx";
import VendorProviderWrapper from "../context/VendorProviderWrapper.tsx";
import UserProviderWrapper from "../context/UserProviderWrapper.tsx";

const AppRouters = () => {
    return (
        <Suspense fallback={<Loading />}>
            <RedirectByRole />
            <Routes>
                {PublicRouters()}

                <Route element={<VendorProviderWrapper />}>
                    {VendorRouters()}
                </Route>

                <Route element={<UserProviderWrapper />}>
                    {UserRouters()}
                </Route>
            </Routes>
        </Suspense>
    );
};

export default AppRouters;
