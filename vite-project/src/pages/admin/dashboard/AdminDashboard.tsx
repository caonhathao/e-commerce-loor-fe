import SectionCards from "@/components/ui-custom/admin/dashboard/section-cards";
import SectionOrderStatusChart from "@/components/ui-custom/admin/dashboard/section-order-status-chart";
import SectionRevenueChart from "@/components/ui-custom/admin/dashboard/section-revenue-chart";
import SectionTopProductsChart from "@/components/ui-custom/admin/dashboard/section-top-products-chart";
import SectionTopSellerChart from "@/components/ui-custom/admin/dashboard/section-top-seller-chart";

const AdminDashboard = () => {
  return (
    <div className={"flex-1 p-2 w-full h-full overflow-y-auto"}>
      <div className="w-full h-full flex flex-col justify-start items-center gap-6 p-4 bg-[hsl(var(--background))] rounded-xl shadow">
        {/* Showing KPI/CARDS */}
        <SectionCards />
        {/* Revenue chart */}
        <SectionRevenueChart />
        <div className="w-full grid grid-cols-3 grid-rows-1 gap-4">
          <SectionOrderStatusChart />
          <SectionTopSellerChart />
          <SectionTopProductsChart />
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
