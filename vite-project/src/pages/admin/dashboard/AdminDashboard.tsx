import SectionCards from "@/components/ui-custom/admin/dashboard/section-cards";


const AdminDashboard = () => {
  return (
    <div className={"flex-1 p-2 w-full h-full"}>
      <div className="w-full h-full flex flex-col justify-start items-center gap-4">
        {/* Showing KPI/CARDS */}
        <SectionCards />
      </div>
    </div>
  );
};
export default AdminDashboard;
