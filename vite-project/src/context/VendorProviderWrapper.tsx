import { Outlet } from "react-router-dom";
import { VendorProvider } from "../context/VendorContext.tsx";

const VendorProviderWrapper = () => {
    return (
        <VendorProvider>
            <Outlet />
        </VendorProvider>
    );
};

export default VendorProviderWrapper;
