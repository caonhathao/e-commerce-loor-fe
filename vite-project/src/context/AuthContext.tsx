import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {getAccessToken, markLoggingOut, removeAccessToken, setAccessToken} from "../services/tokenStore.tsx";
import JWTDecode from "../security/JWTDecode.tsx";
import apiClient from "../services/apiClient.tsx";
import endpoints from "../services/endpoints.tsx";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {postData} from "../utils/functions.utils.tsx";
import Cookies from "js-cookie";
import {io} from "socket.io-client";

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
    userAuth: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    logout: () => void;
    login: (token: string, userData: User) => void;
    hasRole: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const socket = io(endpoints.system.socketConnection, {
    withCredentials: true,
    transports: ['websocket', 'polling'],
});

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [userAuth, setUserAuth] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const isAuthenticated = !!userAuth
    const navigate = useNavigate();

    useEffect(() => {
        const refreshToken = async () => {
            try {
                const response = await apiClient.get(endpoints.auth.refresh);
                console.log('refresh token response: ', response)
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
                        setUserAuth({
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
        } else refreshToken()
        setIsLoading(false);
    }, []);

    useEffect(() => {
        console.log('user: ', userAuth)
        console.log('user role: ', userAuth?.role)
        console.log("is auth:", isAuthenticated)
    }, [userAuth])

    const login = (token: string, userData: User) => {
        const decoded = JWTDecode(token);
        if (decoded?.id) {
            socket.emit('register_user', decoded.id);
        }
        setAccessToken(token);
        console.log('user data login: ', userData)
        setUserAuth(userData);
    }

    const logout = async () => {
        markLoggingOut(); // cờ chặn refresh

        const token = getAccessToken();
        if (token) {
            try {
                await postData(endpoints.auth.logout, true); // chỉ gọi nếu có token
                removeAccessToken(); // luôn xóa cookie & localStorage
            } catch (e) {
                console.warn('Logout API failed, but proceeding to clear local data anyway');
                console.error(e);
            }
        }
        Cookies.remove('refresh')
        setUserAuth(null);

        toast.success('Đăng xuất thành công', {
            autoClose: 1000,
            onClose: () => navigate('/account')
        });

        setTimeout(() => {
            navigate('/account');
        }, 1200);
    };

    const hasRole = (role: string) => {
        return userAuth?.role === role;
    }

    return (
        <AuthContext.Provider
            value={{userAuth, isAuthenticated, isLoading, login, logout, hasRole}}
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

