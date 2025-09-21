import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../context/AuthContext.tsx";
import Loading from "../components/loading/Loading.tsx";

interface ProtectedRouterProps {
    requiredRoles?: string[];
}

const ProtectedRouter = ({requiredRoles}: ProtectedRouterProps) => {
    const {isAuthenticated, hasRole, isLoading} = useAuth();

    if (isLoading) return <Loading/>;

    // if (!isAuthenticated) {
    //     return <Navigate to="/account" replace/>
    // }
    // if (requiredRoles && !requiredRoles.some((role) => hasRole(role))) {
    //     alert(requiredRoles)
    //     return <Navigate to="/account" replace/>;
    // }

    return <Outlet/>
}

export default ProtectedRouter;