import React from "react";
import {
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaRupeeSign,
} from "react-icons/fa";

const Overview = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-black text-white p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-10">BaseLayer Admin</h2>

        <nav className="space-y-4 text-sm">
          <p className="hover:text-gray-300 cursor-pointer">Dashboard</p>
          <p className="hover:text-gray-300 cursor-pointer">Products</p>
          <p className="hover:text-gray-300 cursor-pointer">Orders</p>
          <p className="hover:text-gray-300 cursor-pointer">Users</p>
        </nav>
      </aside>

      {/* MAIN */}
      <div className="flex-1">

        {/* TOPBAR */}
        <div className="bg-white px-6 py-4 shadow flex justify-between items-center">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <p className="text-sm text-gray-500">Admin Panel</p>
        </div>

        {/* CONTENT */}
        <div className="p-6">

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

            {/* Revenue */}
            <div className="bg-white p-5 rounded-xl shadow flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Revenue</p>
                <h2 className="text-xl font-semibold mt-1">₹45,000</h2>
              </div>
              <FaRupeeSign className="text-2xl text-green-500" />
            </div>

            {/* Orders */}
            <div className="bg-white p-5 rounded-xl shadow flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Orders</p>
                <h2 className="text-xl font-semibold mt-1">320</h2>
              </div>
              <FaShoppingCart className="text-2xl text-blue-500" />
            </div>

            {/* Users */}
            <div className="bg-white p-5 rounded-xl shadow flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Users</p>
                <h2 className="text-xl font-semibold mt-1">1,240</h2>
              </div>
              <FaUsers className="text-2xl text-purple-500" />
            </div>

            {/* Products */}
            <div className="bg-white p-5 rounded-xl shadow flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Products</p>
                <h2 className="text-xl font-semibold mt-1">85</h2>
              </div>
              <FaBox className="text-2xl text-orange-500" />
            </div>

          </div>

          {/* TABLE */}
          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="text-gray-500 border-b">
                    <th className="py-2">Order ID</th>
                    <th>User</th>
                    <th>Product</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody className="text-gray-700">
                  <tr className="border-b">
                    <td className="py-3">#1001</td>
                    <td>Aditya</td>
                    <td>iPhone 16 Case</td>
                    <td>₹999</td>
                    <td className="text-green-500">Completed</td>
                  </tr>

                  <tr className="border-b">
                    <td className="py-3">#1002</td>
                    <td>Rahul</td>
                    <td>Samsung S25 Cover</td>
                    <td>₹799</td>
                    <td className="text-yellow-500">Pending</td>
                  </tr>

                  <tr>
                    <td className="py-3">#1003</td>
                    <td>Priya</td>
                    <td>Pixel Case</td>
                    <td>₹899</td>
                    <td className="text-red-500">Cancelled</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Overview;