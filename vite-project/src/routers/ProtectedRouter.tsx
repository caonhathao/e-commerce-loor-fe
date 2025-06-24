import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../context/AuthContext.tsx";
import Loading from "../components/loading/Loading.tsx";
import {useEffect} from "react";

interface ProtectedRouterProps {
    requiredRoles?: string[];
}

const ProtectedRouter = ({requiredRoles}: ProtectedRouterProps) => {
    const {isAuthenticated, hasRole, isLoading} = useAuth();

    useEffect(() => {
        console.log(isAuthenticated);
        console.log(hasRole('ROLE_USER'));

    }, [isAuthenticated, hasRole])

    if (isLoading) return <Loading/>;

    if (!isAuthenticated) {
        return <Navigate to="/account"/>
    }
    if (requiredRoles && requiredRoles.some((role) => hasRole(role))) {
        alert('ok')
        return <Navigate to="/account" replace/>;
    }else alert('ok')

    return <Outlet/>
}

export default ProtectedRouter;