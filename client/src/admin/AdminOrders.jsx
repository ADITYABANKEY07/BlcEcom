import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  // ✅ LOAD ORDERS
  const loadOrders = async () => {
    try {
      const api = `${import.meta.env.VITE_API_URL}/admin/orders`;

      const res = await axios.get(api);

      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // ✅ UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      const api = `${import.meta.env.VITE_API_URL}/admin/orderstatus/${id}`;

      await axios.post(api, {
        orderStatus: status,
      });

      loadOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-black">
          Orders
        </h1>

        <div className="text-sm text-gray-500">
          Total Orders: {orders.length}
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-sm">

        <table className="w-full text-sm">

          {/* TABLE HEAD */}
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Products</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Payment</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-b hover:bg-gray-50 transition"
              >
                {/* ORDER ID */}
                <td className="p-4 font-medium text-gray-800">
                  #{order._id.slice(-6)}
                </td>

                {/* CUSTOMER */}
                <td className="p-4">
                  <div>
                    <p className="font-medium">
                      {order.contactInfo?.firstName}{" "}
                      {order.contactInfo?.lastName}
                    </p>

                    <p className="text-xs text-gray-500">
                      {order.contactInfo?.email}
                    </p>
                  </div>
                </td>

                {/* PRODUCTS */}
                <td className="p-4">
                  <div className="space-y-2">
                    {order.products?.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-10 h-10 rounded object-cover bg-gray-100"
                        />

                        <div>
                          <p className="text-xs font-medium line-clamp-1">
                            {item.title}
                          </p>

                          <p className="text-[11px] text-gray-500">
                            Qty: {item.qty}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </td>

                {/* AMOUNT */}
                <td className="p-4 font-semibold">
                  ₹{Number(order.amount).toLocaleString("en-IN")}
                </td>

                {/* PAYMENT */}
                <td className="p-4">
                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                    {order.paymentStatus}
                  </span>
                </td>

                {/* STATUS */}
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs
                    ${
                      order.orderStatus === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.orderStatus === "Shipped"
                        ? "bg-blue-100 text-blue-700"
                        : order.orderStatus === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  `}
                  >
                    {order.orderStatus}
                  </span>
                </td>

                {/* DATE */}
                <td className="p-4 text-gray-500 text-xs">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                {/* ACTION */}
                <td className="p-4">
                  <select
                    value={order.orderStatus}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                    className="border rounded-lg px-2 py-1 text-xs outline-none"
                  >
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

        {/* EMPTY */}
        {orders.length === 0 && (
          <div className="py-20 text-center text-gray-400">
            No Orders Found
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;