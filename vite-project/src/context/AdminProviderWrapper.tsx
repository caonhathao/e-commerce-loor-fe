import { Outlet } from "react-router-dom";
import { AdminProvider } from "../context/AdminContext.tsx";

const VendorProviderWrapper = () => {
    return (
        <AdminProvider>
            <Outlet />
        </AdminProvider>
    );
};

export default VendorProviderWrapper;
