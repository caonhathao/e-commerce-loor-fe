import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";

const RedirectByRole = () => {
    const { userAuth, isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            const currentPath = location.pathname;

            if (userAuth?.role === 'ROLE_VENDOR') {
                if (!currentPath.startsWith('/vendor')) {
                    navigate('/vendor', { replace: true });
                }
            } else {
                if (currentPath === '/' || currentPath.startsWith('/vendor')) {
                    navigate('/', { replace: true });
                }
            }
        }
    }, [userAuth, isAuthenticated, isLoading, location.pathname]);

    return null;
};

export default RedirectByRole;
