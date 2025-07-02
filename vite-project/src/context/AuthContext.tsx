import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {getAccessToken, setAccessToken} from "../services/tokenStore.tsx";
import JWTDecode from "../security/JWTDecode.tsx";
import apiClient from "../services/apiClient.tsx";
import endpoints from "../services/endpoints.tsx";

type User = {
    id: string;
    role: string;
    locked: boolean;
    name: string;
}

type payload = {
    id: string;
    role: string;
    locked: boolean;
    name: string;
    iat: number;
    exp: number;
};

type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    logout: () => void;
    login: (token: string, userData: User) => void;
    hasRole: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const isAuthenticated = !!user

    useEffect(() => {

        const refreshToken = async () => {
            try {
                const response = await apiClient.get(endpoints.auth.refresh);
                if (response.status === 200) {
                    login(response.data.access, response.data.data);
                }
            } catch (e) {
                console.log(e);
                logout();
            } finally {
                setIsLoading(false)
            }
        }

        if (getAccessToken()) {
            try {
                const decode = JWTDecode(getAccessToken());
                if (decode) {
                    const res: payload = decode as payload;
                    const exp = res.exp
                    const isTokenExpired = exp * 1000 < Date.now() + 60 * 1000;

                    if (!isTokenExpired) {
                        setUser({
                            id: res.id,
                            role: res.role,
                            name: res.name,
                            locked: res.locked
                        });
                    } else {
                        refreshToken();
                    }
                }
            } catch (e) {
                console.log(e);
                alert('error')
                //logout();
            }
        }
        setIsLoading(false);
    }, []);

    const login = (token: string, userData: User) => {
        setAccessToken(token);
        setUser(userData);
    }

    const logout = () => {
        localStorage.removeItem('access_token');
    }

    const hasRole = (role: string) => {
        return user?.role === role;
    }

    return (
        <AuthContext.Provider
            value={{user, isAuthenticated, isLoading, login, logout, hasRole}}
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

