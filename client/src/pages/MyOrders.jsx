import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const api = `${import.meta.env.VITE_API_URL}/user/getmyorders/${user?._id}`;
        const res = await axios.get(api);
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    if (user?._id) fetchOrders();
    else setLoading(false);
  }, []);

  // ── Not logged in ──
  if (!user) {
    return (
      <div className="min-h-screen bg-white font-mono flex flex-col items-center justify-center gap-4">
        <div className="w-14 h-14 bg-orange-500 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            viewBox="0 0 24 24"
          >
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <h1
          className="text-[28px] tracking-widest uppercase"
          style={{ fontFamily: "'Bebas Neue',sans-serif" }}
        >
          Please Login First
        </h1>
        <button
          onClick={() => navigate("/login")}
          className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white tracking-widest uppercase transition-colors"
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: "18px",
            letterSpacing: "3px",
          }}
        >
          Sign In
        </button>
      </div>
    );
  }

  const filtered =
    filter === "all" ? orders : orders.filter((o) => o.orderStatus === filter);

  const STATUS_STEPS = ["Processing", "Shipped", "Delivered"];

  const stepStatus = (orderStatus, stepLabel) => {
    const currentStep = STATUS_STEPS.indexOf(orderStatus);

    const step = STATUS_STEPS.indexOf(stepLabel);

    // ✅ DELIVERED = EVERYTHING DONE
    if (orderStatus === "Delivered") {
      return "done";
    }

    // ✅ PREVIOUS STEPS
    if (step < currentStep) {
      return "done";
    }

    // ✅ CURRENT STEP
    if (step === currentStep) {
      return "active";
    }

    // ✅ FUTURE STEP
    return "pending";
  };

  return (
    <div className="min-h-screen bg-white font-mono px-6 md:px-12 py-10 text-black">
      {/* Header */}
      <div className="flex items-flex-end justify-between flex-wrap gap-4 border-b border-gray-200 pb-4 mb-8">
        <div>
          <p className="text-[10px] tracking-[2px] uppercase text-orange-500 mb-1">
            Account
          </p>
          <h1
            className="leading-none text-black"
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "40px",
              letterSpacing: "3px",
            }}
          >
            My Orders
          </h1>
          <p className="text-[11px] text-gray-400 tracking-wide mt-1">
            Track and manage all your placed orders
          </p>
        </div>
        <div className="text-right">
          <span
            className="text-orange-500"
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "32px",
              letterSpacing: "2px",
            }}
          >
            {orders.length}
          </span>
          <p className="text-[10px] tracking-[2px] uppercase text-gray-400">
            Total Orders
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap mb-6">
        {["all", "Processing", "Shipped", "Delivered"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`h-8 px-4 border text-[10px] tracking-[1.5px] uppercase transition-colors cursor-pointer
              ${filter === f ? "bg-black border-black text-white" : "bg-white border-gray-200 text-gray-400 hover:border-gray-500 hover:text-black"}`}
          >
            {f === "all" ? "All" : f}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center h-64 gap-3 text-[11px] tracking-widest uppercase text-gray-400">
          <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          Loading orders...
        </div>
      ) : filtered.length === 0 ? (
        /* Empty */
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-14 h-14 bg-orange-500 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              viewBox="0 0 24 24"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </div>
          <p
            className="text-[28px] tracking-widest uppercase text-gray-300"
            style={{ fontFamily: "'Bebas Neue',sans-serif" }}
          >
            No Orders Found
          </p>
          <p className="text-[11px] text-gray-300 tracking-wide">
            You haven't placed any orders yet.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white tracking-widest uppercase transition-colors"
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "18px",
              letterSpacing: "3px",
            }}
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {filtered.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 overflow-hidden"
            >
              {/* Top meta row */}
              <div className="grid grid-cols-2 md:grid-cols-4 border-b border-gray-200">
                {[
                  {
                    label: "Order ID",
                    val: `#${order._id}`,
                    cls: "text-[11px]",
                  },
                  {
                    label: "Payment",
                    val: order.paymentStatus,
                    cls:
                      order.paymentStatus === "Paid"
                        ? "text-green-600"
                        : "text-red-500",
                  },
                  {
                    label: "Status",
                    val: order.orderStatus,
                    cls: "text-orange-500",
                  },
                  {
                    label: "Total",
                    val: `₹${Number(order.amount).toLocaleString("en-IN")}`,
                    cls: "text-[14px]",
                  },
                ].map(({ label, val, cls }, i) => (
                  <div
                    key={i}
                    className="px-5 py-4 border-r border-gray-200 last:border-r-0"
                  >
                    <p className="text-[9px] tracking-[2px] uppercase text-gray-400 mb-1">
                      {label}
                    </p>
                    <p className={`font-medium text-black ${cls}`}>
                      {label === "Payment" ? (
                        <span className="flex items-center gap-1.5">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${order.paymentStatus === "Paid" ? "bg-green-500" : "bg-red-500"}`}
                          />
                          {val}
                        </span>
                      ) : (
                        val
                      )}
                    </p>
                  </div>
                ))}
              </div>

              {/* Products */}
              <div className="px-5">
                {order.products.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-none"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-14 object-cover border border-gray-200 bg-gray-100 flex-shrink-0"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-black">
                        {item.title}
                      </p>
                      <p className="text-[10px] tracking-widest uppercase text-gray-400 mt-1">
                        Qty: {item.qty}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-black">
                      ₹{Number(item.price * item.qty).toLocaleString("en-IN")}
                    </p>
                  </div>
                ))}
              </div>

              {/* Footer: Address + Tracking */}
              <div className="grid grid-cols-1 md:grid-cols-2 border-t border-gray-200">
                {/* Shipping address */}
                <div className="px-5 py-4 border-b md:border-b-0 md:border-r border-gray-200">
                  <p className="text-[9px] tracking-[2px] uppercase text-gray-400 mb-3">
                    Shipping Address
                  </p>
                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    {order.contactInfo?.firstName} {order.contactInfo?.lastName}
                    <br />
                    {order.shippingInfo?.address}
                    <br />
                    {order.shippingInfo?.city}, {order.shippingInfo?.state}
                    <br />
                    {order.shippingInfo?.country} –{" "}
                    {order.shippingInfo?.pincode}
                    <br />
                    {order.contactInfo?.phone}
                  </p>
                </div>

                {/* Mini tracker */}
<div className="px-5 py-4">

  <p className="text-[9px] tracking-[2px] uppercase text-gray-400 mb-4">
    Order Tracking
  </p>

  <div className="flex items-start">

    {STATUS_STEPS.map((step, i) => {

      const currentIndex =
        STATUS_STEPS.indexOf(
          order.orderStatus
        );

      const isDone =
        i <= currentIndex;

      return (

        <div
          key={step}
          className="flex flex-col items-center flex-1 relative"
        >

          {/* LINE */}
          {i < STATUS_STEPS.length - 1 && (

            <div
              className={`absolute top-[10px] left-1/2 w-full h-px z-0

              ${
                i < currentIndex
                  ? "bg-orange-500"
                  : "bg-gray-200"
              }`}
            />

          )}

          {/* CIRCLE */}
          <div
            className={`relative z-10 w-5 h-5 rounded-full border flex items-center justify-center text-[8px] mb-1.5

            ${
              isDone

                ? "bg-orange-500 border-orange-500 text-white"

                : "border-gray-200 text-gray-300 bg-white"
            }`}
          >

            {
              isDone
                ? "✓"
                : i + 1
            }

          </div>

          {/* LABEL */}
          <span
            className={`text-[8px] tracking-wide uppercase text-center leading-tight

            ${
              isDone
                ? "text-black"
                : "text-gray-300"
            }`}
          >
            {step}
          </span>

        </div>
      );
    })}

  </div>

</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
