import {createContext, ReactNode, useContext, useState} from "react";
import {adminType} from "../utils/admin.data-types.tsx";

interface AdminContextType {
    vendor: adminType | null | undefined;
    setVendor: (value: adminType | null | undefined) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({children}: { children: ReactNode }) => {
    const [vendor, setVendor] = useState<adminType | null | undefined>(null);
    // useEffect(() => {
    //     console.log(user)
    // },[user])
    return (
        <AdminContext.Provider value={{vendor, setVendor}}>
            {children}
        </AdminContext.Provider>
    )
}

export const useVendor = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error("useVendor must be used within a VendorProvider");
    }
    return context;
}