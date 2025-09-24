import AppSidebar from "@/components/ui-custom/admin/dashboard/app-sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="w-full h-screen flex flex-row justify-around items-center">
      <AppSidebar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
