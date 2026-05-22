import React, { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ GET ORDER FROM NAVIGATE STATE
  const order = location.state?.order;

  const confettiRef = useRef(null);

  // ✅ IF USER REFRESHES PAGE
  if (!order) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            Order not found
          </h2>

          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-orange-500 text-white"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  // ✅ TOTALS
  const subtotal =
    order?.products?.reduce(
      (acc, item) => acc + item.price * item.qty,
      0,
    ) || 0;

  const discount = subtotal * 0.1;

  const total = order.amount;

  const orderId = order._id;

  const today = new Date(order.createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // ✅ CONFETTI
  useEffect(() => {
    const svg = confettiRef.current;
    if (!svg) return;

    const colors = [
      "#f97316",
      "#111111",
      "#e5e5e5",
      "#fbbf24",
      "#6b7280",
    ];

    for (let i = 0; i < 28; i++) {
      const el = document.createElementNS(
        "http://www.w3.org/2000/svg",
        i % 3 === 0 ? "circle" : "rect",
      );

      const angle = Math.random() * Math.PI * 2;
      const dist = 55 + Math.random() * 45;

      const x = 100 + Math.cos(angle) * dist;
      const y = 100 + Math.sin(angle) * dist;

      const color =
        colors[Math.floor(Math.random() * colors.length)];

      if (i % 3 === 0) {
        el.setAttribute("cx", x);
        el.setAttribute("cy", y);
        el.setAttribute("r", 3 + Math.random() * 3);
      } else {
        const size = 4 + Math.random() * 5;

        el.setAttribute("x", x);
        el.setAttribute("y", y);
        el.setAttribute("width", size);
        el.setAttribute("height", size);

        el.setAttribute(
          "transform",
          `rotate(${Math.random() * 90},${x},${y})`,
        );
      }

      el.setAttribute("fill", color);
      el.setAttribute("opacity", "0");

      svg.appendChild(el);

      el.animate(
        [
          {
            opacity: 0,
            transform: "translate(0,0) scale(0)",
          },
          {
            opacity: 1,
            transform: `translate(${(Math.random() - 0.5) * 60}px,${-30 - Math.random() * 60}px) scale(1)`,
          },
          {
            opacity: 0,
            transform: `translate(${(Math.random() - 0.5) * 100}px,${30 + Math.random() * 60}px) scale(0.5)`,
          },
        ],
        {
          duration: 900 + Math.random() * 600,
          delay: 300 + Math.random() * 300,
          easing: "ease-out",
          fill: "forwards",
        },
      );
    }
  }, []);

  const trackSteps = [
    { label: "Placed", status: "done" },
    { label: "Processing", status: "active" },
    { label: "Shipped", status: "pending" },
    { label: "Delivered", status: "pending" },
  ];

  return (
    <div className="min-h-screen bg-white font-mono text-black flex flex-col items-center px-3 sm:px-4 md:px-6 py-8 sm:py-10 md:py-12">
      {/* Animated Check */}
      <div className="relative mb-8">
        <svg
          ref={confettiRef}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[200px] overflow-visible pointer-events-none"
        />

        <div
          className="w-[90px] h-[90px] rounded-full border-2 border-orange-500 flex items-center justify-center"
          style={{
            animation:
              "pop 0.4s cubic-bezier(0.36,0.07,0.19,0.97) both",
          }}
        >
          <svg
            className="w-9 h-9"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f97316"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 60,
              strokeDashoffset: 60,
              animation: "draw 0.5s 0.3s ease forwards",
            }}
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>

      {/* Title */}
      <span className="text-[10px] tracking-[2px] uppercase text-orange-500 bg-orange-50 border border-orange-200 px-4 py-1 mb-4">
        Order Confirmed
      </span>

      <h1
        className="text-center text-black leading-none mb-2"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(28px, 6vw, 48px)",
          letterSpacing: "4px",
        }}
      >
        Thank You!
      </h1>

      <p className="text-xs text-gray-400 tracking-wide text-center mb-10">
        Your order has been placed and is being processed.
        <br />
        You'll receive a confirmation email shortly.
      </p>

      {/* Order Card */}
      <div className="w-full max-w-xl border border-gray-200 mb-6">
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-200 bg-gray-50">
          <div>
            <p className="text-[10px] tracking-[2px] uppercase text-gray-400">
              Order ID
            </p>

            <p className="text-sm font-medium text-black mt-1">
              {orderId}
            </p>
          </div>

          <div className="text-right">
            <p className="text-[10px] tracking-[2px] uppercase text-gray-400">
              Date
            </p>

            <p className="text-sm font-medium text-black mt-1">
              {today}
            </p>
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="px-5">
          {order.products.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-none"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-12 h-12 object-cover border border-gray-200 bg-gray-100 flex-shrink-0"
              />

              <div className="flex-1">
                <p className="text-xs font-medium text-black">
                  {item.title}
                </p>

                <p className="text-[10px] text-gray-400 tracking-widest mt-0.5">
                  Qty {item.qty}
                </p>
              </div>

              <p className="text-xs font-medium text-black">
                ₹
                {(item.price * item.qty).toLocaleString(
                  "en-IN",
                )}
              </p>
            </div>
          ))}
        </div>

        {/* TOTALS */}
        <div className="px-5 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-between text-[10px] tracking-widest uppercase text-gray-400 py-1">
            <span>Subtotal</span>

            <span>
              ₹{subtotal.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex justify-between text-[10px] tracking-widest uppercase text-gray-400 py-1">
            <span>Shipping</span>

            <span>Free</span>
          </div>

          <div className="flex justify-between text-[10px] tracking-widest uppercase text-gray-400 py-1">
            <span>Discount</span>

            <span>
              -₹{discount.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex justify-between text-sm font-semibold tracking-widest uppercase text-black py-3 border-t border-gray-200 mt-2">
            <span>Total Paid</span>

            <span>
              ₹{Number(total).toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>

      {/* INFO GRID */}
      <div className="w-full max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-px bg-gray-200 border border-gray-200 mb-6">
        {[
          {
            label: "Ship To",
            val: `${order?.contactInfo?.firstName || ""} ${order?.contactInfo?.lastName || ""}`,
            sub: `${order?.shippingInfo?.address || ""}
${order?.shippingInfo?.city || ""}
${order?.shippingInfo?.state || ""}`,
          },

          {
            label: "Payment",
            val: "Razorpay",
            sub: order?.paymentStatus || "Paid",
          },

          {
            label: "Delivery Method",
            val: "Standard Delivery",
            sub: "Order Processing",
          },

          {
            label: "Contact",
            val: order?.contactInfo?.email || "",
            sub: order?.contactInfo?.phone || "",
          },
        ].map((cell, i) => (
          <div key={i} className="bg-white p-4">
            <p className="text-[9px] tracking-[2px] uppercase text-gray-400 mb-1.5">
              {cell.label}
            </p>

            <p className="text-xs font-medium text-black">
              {cell.val}
            </p>

            <p className="text-[10px] text-gray-400 tracking-wide mt-1 whitespace-pre-line">
              {cell.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Tracking */}
      <div className="w-full max-w-xl border border-gray-200 p-5 mb-6">
        <p className="text-[10px] tracking-[2px] uppercase text-gray-400 mb-4">
          Order Tracking
        </p>

        <div className="flex items-start">
          {trackSteps.map((step, i) => (
            <div
              key={i}
              className="flex flex-col items-center flex-1 relative"
            >
              {i < trackSteps.length - 1 && (
                <div
                  className={`absolute top-[14px] left-1/2 w-full h-0.5 z-0 ${
                    step.status === "done"
                      ? "bg-orange-500"
                      : "bg-gray-200"
                  }`}
                />
              )}

              <div
                className={`relative z-10 w-7 h-7 rounded-full border-2 flex items-center justify-center mb-2 text-[10px] ${
                  step.status === "done"
                    ? "bg-orange-500 border-orange-500 text-white"
                    : step.status === "active"
                      ? "border-orange-500 text-orange-500 bg-white"
                      : "border-gray-200 text-gray-300 bg-white"
                }`}
              >
                {step.status === "done" ? "✓" : i + 1}
              </div>

              <span
                className={`text-[9px] tracking-widest uppercase text-center ${
                  step.status === "pending"
                    ? "text-gray-400"
                    : "text-black"
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* BUTTONS */}
      <div className="w-full max-w-xl flex gap-3 flex-wrap">
        <button className="flex-1 min-w-[130px] py-3 border border-gray-200 bg-white font-mono text-[10px] tracking-[2px] uppercase text-black hover:border-black transition-colors cursor-pointer">
          Download Invoice
        </button>

        <button className="flex-1 min-w-[130px] py-3 border border-gray-200 bg-white font-mono text-[10px] tracking-[2px] uppercase text-black hover:border-black transition-colors cursor-pointer">
          Track Order
        </button>

        <button
          onClick={() => navigate("/home")}
          className="flex-1 min-w-[130px] py-3 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white tracking-widest uppercase transition-all cursor-pointer"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "18px",
            letterSpacing: "3px",
          }}
        >
          Continue Shopping
        </button>
      </div>

      {/* KEYFRAMES */}
      <style>{`
        @keyframes pop {
          0% {
            transform: scale(0);
            opacity: 0;
          }

          70% {
            transform: scale(1.1);
          }

          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Success;