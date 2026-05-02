import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./admin/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1">
        <Outlet />
      </div>

    </div>
  );
};

export default AdminLayout;