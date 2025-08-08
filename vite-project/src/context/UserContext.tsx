import {userType} from "../utils/user.data-types.tsx";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {fetchData} from "../utils/functions.utils.tsx";
import endpoints from "../services/endpoints.tsx";
import {useAuth} from "./AuthContext.tsx";

interface UserContextType {
    user: userType | null | undefined;
    setUser: (value: userType | null | undefined) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children}: { children: ReactNode }) => {
    const {isAuthenticated} = useAuth();
    const [user, setUser] = useState<userType | null | undefined>(null);
    useEffect(() => {
        if (!user && isAuthenticated) {
            console.log('fetch user data')
            fetchData(endpoints.user.getUserInfo, false, setUser, "Lấy dữ liệu thất bại!")
        }
        if (!isAuthenticated) {
            setUser(null)
        }
    }, [user, isAuthenticated])

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}