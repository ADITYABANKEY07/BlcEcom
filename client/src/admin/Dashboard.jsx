import React, { useState } from "react";

const NAV_ITEMS = [
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    label: "Dashboard",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    label: "Orders",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    label: "Products",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Customers",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    label: "Analytics",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Settings",
  },
];

const orders = [
  { id: "#1001", user: "Aditya",  avatar: "A", product: "iPhone 16 Case",     amount: "₹999", status: "Completed", date: "Apr 28" },
  { id: "#1002", user: "Rahul",   avatar: "R", product: "Samsung S25 Cover",  amount: "₹799", status: "Pending",   date: "Apr 28" },
  { id: "#1003", user: "Priya",   avatar: "P", product: "Pixel Case",         amount: "₹899", status: "Cancelled", date: "Apr 27" },
  { id: "#1004", user: "Sneha",   avatar: "S", product: "OnePlus 12 Case",    amount: "₹649", status: "Completed", date: "Apr 27" },
  { id: "#1005", user: "Vikram",  avatar: "V", product: "Redmi Note Cover",   amount: "₹449", status: "Pending",   date: "Apr 26" },
];

const avatarColors = {
  A: { background: "#EDE9FE", color: "#6D28D9" },
  R: { background: "#E0F2FE", color: "#0369A1" },
  P: { background: "#FCE7F3", color: "#9D174D" },
  S: { background: "#D1FAE5", color: "#065F46" },
  V: { background: "#FEF3C7", color: "#92400E" },
};

const STATUS_STYLE = {
  Completed: { background: "#D1FAE5", color: "#065F46", dot: "#10B981" },
  Pending:   { background: "#FEF3C7", color: "#92400E", dot: "#F59E0B" },
  Cancelled: { background: "#FEE2E2", color: "#991B1B", dot: "#EF4444" },
};

const StatusBadge = ({ status }) => {
  const s = STATUS_STYLE[status] || {};
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ background: s.background, color: s.color }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
      {status}
    </span>
  );
};

const StatCard = ({ label, value, trend, accent }) => (
  <div
    className="rounded-2xl p-5 relative overflow-hidden group cursor-default"
    style={{ background: "#1E293B", border: "1px solid #334155" }}
  >
    <div
      className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500"
      style={{ background: accent }}
    />
    <div className="relative">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center mb-4 text-sm shadow"
        style={{ background: accent + "22", border: `1px solid ${accent}44` }}
      >
        <span style={{ color: accent }}>
          {label === "Revenue" ? "₹" : label === "Orders" ? "🛒" : label === "Customers" ? "👥" : "📦"}
        </span>
      </div>
      <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#64748B" }}>
        {label}
      </p>
      <p className="text-2xl font-bold tracking-tight" style={{ color: "#F1F5F9" }}>{value}</p>
      <p className="text-xs mt-1.5 font-semibold" style={{ color: accent }}>{trend}</p>
    </div>
  </div>
);

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [activeTab, setActiveTab] = useState("all");

  const filtered =
    activeTab === "all"
      ? orders
      : orders.filter((o) => o.status.toLowerCase() === activeTab);

  return (
    <div
      className="flex min-h-screen"
      style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: "#0F172A" }}
    >

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Topbar — dark to match */}
        <header
          className="h-14 sm:h-16 flex items-center justify-between px-4 sm:px-6 md:px-8 sticky top-0 z-10"
          style={{ background: "#0F172A", borderBottom: "1px solid #1E293B" }}
        >
          <div>
            <h1 className="text-base font-bold tracking-tight" style={{ color: "#F1F5F9" }}>Dashboard</h1>
            <p className="text-xs" style={{ color: "#475569" }}>Wednesday, 29 April 2026</p>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="hidden sm:flex items-center gap-2 rounded-xl px-3 py-2"
              style={{ background: "#1E293B", border: "1px solid #334155" }}
            >
              <svg className="w-3.5 h-3.5" style={{ color: "#475569" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                className="bg-transparent text-xs outline-none w-32"
                style={{ color: "#94A3B8" }}
                placeholder="Search..."
              />
            </div>
            <div className="relative">
              <button
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
                style={{ background: "#1E293B", border: "1px solid #334155" }}
              >
                <svg className="w-4 h-4" style={{ color: "#64748B" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <span
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                style={{ background: "#EF4444", border: "2px solid #0F172A" }}
              />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-auto" style={{ background: "#0F172A" }}>

          {/* Welcome */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight" style={{ color: "#F1F5F9" }}>
              Good morning, Admin 👋
            </h2>
            <p className="text-sm mt-1" style={{ color: "#64748B" }}>
              Here's what's happening with your store today.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <StatCard label="Revenue"   value="₹45,000" trend="↑ 12.5% vs last month" accent="#10B981" />
            <StatCard label="Orders"    value="320"     trend="↑ 8.2% this week"      accent="#6366F1" />
            <StatCard label="Customers" value="1,240"   trend="↑ 3.1% new users"      accent="#A78BFA" />
            <StatCard label="Products"  value="85"      trend="5 added this week"      accent="#F59E0B" />
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">

            {/* Bar chart */}
            <div
              className="lg:col-span-2 rounded-2xl p-6"
              style={{ background: "#1E293B", border: "1px solid #334155" }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold" style={{ color: "#F1F5F9" }}>Revenue overview</h3>
                  <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>Last 7 days performance</p>
                </div>
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: "#064E3B", color: "#6EE7B7" }}
                >
                  ↑ 12.5%
                </span>
              </div>
              <div className="flex items-end gap-2 h-36">
                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                    <div
                      className="w-full rounded-lg transition-all duration-200 cursor-pointer"
                      style={{
                        height: `${h}%`,
                        background: i === 5
                          ? "linear-gradient(180deg,#6366F1,#8B5CF6)"
                          : "#334155",
                      }}
                      onMouseEnter={(e) => {
                        if (i !== 5) e.currentTarget.style.background = "#6366F133";
                      }}
                      onMouseLeave={(e) => {
                        if (i !== 5) e.currentTarget.style.background = "#334155";
                      }}
                    />
                    <span className="text-xs font-medium" style={{ color: "#475569" }}>
                      {["M","T","W","T","F","S","S"][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Order status */}
            <div
              className="rounded-2xl p-6"
              style={{ background: "#1E293B", border: "1px solid #334155" }}
            >
              <h3 className="font-semibold mb-0.5" style={{ color: "#F1F5F9" }}>Order status</h3>
              <p className="text-xs mb-6" style={{ color: "#64748B" }}>All time breakdown</p>
              <div className="space-y-5">
                {[
                  { label: "Completed", count: 184, pct: 58, bar: "#10B981", badge: { background: "#064E3B", color: "#6EE7B7" } },
                  { label: "Pending",   count: 89,  pct: 28, bar: "#F59E0B", badge: { background: "#451A03", color: "#FCD34D" } },
                  { label: "Cancelled", count: 47,  pct: 14, bar: "#EF4444", badge: { background: "#450A0A", color: "#FCA5A5" } },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="font-medium" style={{ color: "#94A3B8" }}>{s.label}</span>
                      <span
                        className="font-semibold px-1.5 py-0.5 rounded-md"
                        style={s.badge}
                      >
                        {s.count}
                      </span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: "#0F172A" }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${s.pct}%`, background: s.bar }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 flex items-center justify-between" style={{ borderTop: "1px solid #334155" }}>
                <p className="text-xs" style={{ color: "#64748B" }}>Total orders</p>
                <p className="text-xl font-bold" style={{ color: "#F1F5F9" }}>320</p>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: "#1E293B", border: "1px solid #334155" }}
          >
            {/* Table header */}
            <div
              className="px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              style={{ borderBottom: "1px solid #334155" }}
            >
              <div>
                <h3 className="font-semibold" style={{ color: "#F1F5F9" }}>Recent Orders</h3>
                <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>Latest 5 transactions</p>
              </div>
              <div
                className="flex gap-1 p-1 rounded-xl"
                style={{ background: "#0F172A" }}
              >
                {["all", "completed", "pending", "cancelled"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all duration-200"
                    style={
                      activeTab === tab
                        ? { background: "linear-gradient(135deg,#6366F1,#8B5CF6)", color: "#FFF" }
                        : { background: "transparent", color: "#475569" }
                    }
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ background: "#0F172A" }}>
                    {["Order ID","Customer","Product","Date","Amount","Status"].map((h) => (
                      <th
                        key={h}
                        className="text-left text-xs font-semibold uppercase tracking-wider px-6 py-3"
                        style={{ color: "#475569" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((order) => (
                    <tr
                      key={order.id}
                      className="transition-colors duration-150"
                      style={{ borderTop: "1px solid #0F172A" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#273348")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <td className="px-6 py-4 text-sm font-semibold" style={{ color: "#94A3B8" }}>{order.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                            style={avatarColors[order.avatar]}
                          >
                            {order.avatar}
                          </div>
                          <span className="text-sm font-medium" style={{ color: "#CBD5E1" }}>{order.user}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm" style={{ color: "#64748B" }}>{order.product}</td>
                      <td className="px-6 py-4 text-sm" style={{ color: "#475569" }}>{order.date}</td>
                      <td className="px-6 py-4 text-sm font-bold" style={{ color: "#F1F5F9" }}>{order.amount}</td>
                      <td className="px-6 py-4"><StatusBadge status={order.status} /></td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center text-sm py-12" style={{ color: "#475569" }}>
                        No orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div
              className="px-6 py-4 flex items-center justify-between"
              style={{ borderTop: "1px solid #334155", background: "#172033" }}
            >
              <p className="text-xs" style={{ color: "#475569" }}>
                Showing {filtered.length} of {orders.length} orders
              </p>
              <button
                className="text-xs font-semibold transition-colors"
                style={{ color: "#818CF8" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#A5B4FC")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#818CF8")}
              >
                View all orders →
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
