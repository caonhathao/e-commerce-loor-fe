import SectionCards from "@/components/ui-custom/admin/dashboard/section-cards";
import SectionOrderStatusChart from "@/components/ui-custom/admin/dashboard/section-order-status-chart";
import SectionRevenueChart from "@/components/ui-custom/admin/dashboard/section-revenue-chart";


const AdminDashboard = () => {
  return (
    <div className={"flex-1 p-2 w-full h-screen overflow-y-auto"}>
      <div className="w-full h-full flex flex-col justify-start items-center gap-4">
        {/* Showing KPI/CARDS */}
        <SectionCards />
        {/* Revenue chart */}
        <SectionRevenueChart />
        <SectionOrderStatusChart/>
      </div>
    </div>
  );
};
export default AdminDashboard;
