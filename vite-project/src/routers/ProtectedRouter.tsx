import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/loading/Loading";

interface ProtectedRouterProps {
  requiredRoles?: string[];
}

const ProtectedRouter = ({ requiredRoles }: ProtectedRouterProps) => {
  const { isAuthenticated, hasRole, isLoading } = useAuth();

  // Trạng thái đang loading (chưa check xong token/role)
  if (isLoading) {
    console.log("ProtectedRouter is loading...");
    return <Loading />;
  }

  // Chưa đăng nhập
  if (!isAuthenticated) {
    console.log("ProtectedRouter: not authenticated, redirecting...");
    return <Navigate to="/" replace />;
  }

  // Có đăng nhập nhưng không đủ quyền
  if (requiredRoles?.length && !requiredRoles.some((role) => hasRole(role))) {
    console.log("ProtectedRouter: insufficient role, redirecting...");
    return <Navigate to="/" replace />; // hoặc trang báo lỗi quyền
  }

  // Nếu qua hết check → render route con
  return <Outlet />;
};

export default ProtectedRouter;
