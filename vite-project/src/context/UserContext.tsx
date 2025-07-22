import {userType} from "../utils/user.data-types.tsx";
import {createContext, ReactNode, useContext, useState} from "react";

interface UserContextType {
    user: userType | null | undefined;
    setUser: (value: userType | null | undefined) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<userType | null | undefined>(null);
    // useEffect(() => {
    //     console.log(user)
    // },[user])
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