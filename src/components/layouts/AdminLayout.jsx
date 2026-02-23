import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../admin/AdminSidebar";
import AdminTopbar from "../admin/AdminTopbar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-[#07090f] text-slate-100">
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex min-h-screen flex-1 flex-col">
          <AdminTopbar />
          <main className="flex-1 px-6 pb-10 pt-6 md:px-10">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;








