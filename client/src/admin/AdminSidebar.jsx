import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    path: "/apanel/dashboard",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 12l2-2 7-7 7 7 2 2M5 10v10h3m8-10v10h3M9 21v-6h6v6"
        />
      </svg>
    ),
  },
  {
    label: "Orders",
    path: "/apanel/adminorders",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
    ),
  },
  {
    label: "Product Listing",
    path: "/apanel/addproduct",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4M4 7v10l8 4"
        />
      </svg>
    ),
  },
  {
    label: "Products",
    path: "/apanel/allproduct",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16m8-8H4"
        />
      </svg>
    ),
  },
  {
    label: "Customers",
    path: "/apanel/customers",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2M7 20H2v-2a3 3 0 015.356-1.857M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    label: "Analytics",
    path: "/apanel/analytics",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 19V6m6 13V10m6 9V4M3 19v-4"
        />
      </svg>
    ),
  },
  // {
  //   label: "Settings",
  //   path: "/apanel/settings",
  //   icon: (
  //     <svg
  //       className="w-4 h-4"
  //       fill="none"
  //       viewBox="0 0 24 24"
  //       stroke="currentColor"
  //       strokeWidth={2}
  //     >
  //       <path
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         d="M12 8a4 4 0 100 8 4 4 0 000-8zm8 4a8 8 0 11-16 0 8 8 0 0116 0z"
  //       />
  //     </svg>
  //   ),
  // },
];

const AdminSidebar = () => {
  const [activeNav, setActiveNav] = useState("Dashboard");
  let navigate = useNavigate();

  let handleLogOut = async () => {
    try {
      const api = `${import.meta.env.VITE_API_URL}/admin/adminlogout`;

      // Add withCredentials: true here
      const res = await axios.get(api, { withCredentials: true });

      console.log(res.data);
      navigate("/admin-login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <aside
      className="w-64 flex-shrink-0 flex flex-col"
      style={{ background: "#0F172A", borderRight: "1px solid #1E293B" }}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-800">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mr-3">
          <span className="text-white font-bold text-sm">A</span>
        </div>
        <div>
          <p className="font-bold text-sm text-white">AdminPanel</p>
          <p className="text-xs text-gray-400">Store Manager</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = activeNav === item.label;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={() => setActiveNav(item.label)}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition"
              style={({ isActive: routeActive }) => ({
                background:
                  routeActive || isActive
                    ? "linear-gradient(135deg,#6366F1,#8B5CF6)"
                    : "transparent",
                color: routeActive || isActive ? "#fff" : "#94A3B8",
              })}
            >
              {item.icon}
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 bg-gray-800 p-3 rounded-xl">
          <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs font-bold">
            AD
          </div>
          <div>
            <p className="text-xs text-gray-200">admin@gmail.com</p>
            <p className="text-xs text-gray-400">Administrator</p>
          </div>
        </div>
      </div>
      {/* LOGOUT BUTTON */}
      <button
        onClick={handleLogOut}
        className="w-full flex items-center justify-center cursor-pointer gap-2 px-3 py-2 rounded-xl text-sm 
    bg-purple-500 hover:bg-purple-600 text-white transition"
      >
        Logout
      </button>
    </aside>
  );
};

export default AdminSidebar;
