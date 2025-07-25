import {createContext, ReactNode, useContext, useState} from "react";
import {vendorType} from "../utils/vendor.data-types.tsx";

interface VendorContextType {
    vendor: vendorType | null | undefined;
    setVendor: (value: vendorType | null | undefined) => void;
}

const VendorContext = createContext<VendorContextType | undefined>(undefined);

export const VendorProvider = ({children}: { children: ReactNode }) => {
    const [vendor, setVendor] = useState<vendorType | null | undefined>(null);
    // useEffect(() => {
    //     console.log(user)
    // },[user])
    return (
        <VendorContext.Provider value={{vendor, setVendor}}>
            {children}
        </VendorContext.Provider>
    )
}

export const useVendor = () => {
    const context = useContext(VendorContext);
    if (!context) {
        throw new Error("useVendor must be used within a VendorProvider");
    }
    return context;
}