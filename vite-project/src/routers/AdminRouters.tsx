import ProtectedRouter from "./ProtectedRouter";
import { Route } from "react-router-dom";
import AdminLayout from "@/layout/AdminLayout";
import AdminDashboard from "@/pages/admin/dashboard/AdminDashboard";

const AdminRouters = () => {
  return (
    <>
      <Route
        path={"/admin"}
        element={<ProtectedRouter requiredRoles={["ROLE_MANAGER"]} />}
      >
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
      </Route>
    </>
  );
};

export default AdminRouters;
