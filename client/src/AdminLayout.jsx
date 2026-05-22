import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./admin/AdminSidebar";
import { Menu, X } from "lucide-react";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-x-hidden">
      
      {/* Mobile toggle button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-3 left-3 z-[1001] w-10 h-10 rounded-xl bg-[#1E293B] text-white flex items-center justify-center shadow-lg"
      >
        {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* SIDEBAR */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-[1000]
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <AdminSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/40 z-[999]"
        />
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 min-w-0 overflow-x-hidden">
        <Outlet />
      </div>

    </div>
  );
};

export default AdminLayout;