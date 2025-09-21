import { AdminProvider } from "@/context/AdminContext";
import ProtectedRouter from "./ProtectedRouter";
import { Route } from "react-router-dom";
import AdminLayout from "@/layout/AdminLayout";
import AdminDashdoard from "@/pages/admin/dashboard/AdminDashboard";

const AdminRouters = () => {
  return (
    <>
      <Route
        path={"/admin"}
        element={<ProtectedRouter requiredRoles={["ROLE_ADMIN"]} />}
      >
        <Route
          element={
            <AdminProvider>
                <AdminLayout />
            </AdminProvider>
          }
        >
          <Route index element={<AdminDashdoard />} />
          
        </Route>
      </Route>
    </>
  );
};

export default AdminRouters;
