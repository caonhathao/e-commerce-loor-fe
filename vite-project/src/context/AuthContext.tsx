import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {getAccessToken} from "../services/tokenStore.tsx";
import JWTDecode from "../security/JWTDecode.tsx";

type User = {
    id: string;
    role: string;
    locked: boolean;
}
type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    // login: (token: string, userData: User) => void;
    logout: () => void;
    hasRole: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const isAuthenticated = !!user

    useEffect(() => {
        console.log('here')
        if (getAccessToken()) {
            try {
                const decode: { exp: number } = JWTDecode(getAccessToken());
                const isTokenExpired = decode.exp < Date.now();

                if (!isTokenExpired) {
                    setUser(JWTDecode(getAccessToken()));
                } else logout();
            } catch (e) {
                console.log(e)
                logout();
            }
        }
        setIsLoading(false);
    }, []);

    const logout = () => {
        localStorage.removeItem('access_token');
    }

    const hasRole = (role: string) => {
        return user?.role === role;
    }

    useEffect(() => {
        console.log('user:', user)
        console.log('isLoaded:', isLoading)
        console.log('isAuthenticated:', isAuthenticated)
    }, [user, isLoading, isAuthenticated]);

    return (
        <AuthContext.Provider
            value={{user, isAuthenticated, isLoading, logout, hasRole}}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

