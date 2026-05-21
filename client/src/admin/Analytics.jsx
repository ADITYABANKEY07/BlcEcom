import { useState, useEffect, useRef } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area,
} from "recharts";
import {
  TrendingUp, ShoppingBag, Users, CheckCircle2, Package, Truck,
  XCircle, Clock, ArrowUpRight, ArrowDownRight, BarChart2, Filter,
  Star, MapPin, RefreshCw,
} from "lucide-react";
import axios from "axios";

// ─── PALETTE ──────────────────────────────────────────────────────────────────
const C = {
  bg:       "#080C14",
  surface:  "#0D1321",
  card:     "#111827",
  border:   "#1F2937",
  border2:  "#374151",
  text:     "#F9FAFB",
  muted:    "#6B7280",
  dim:      "#374151",
  indigo:   "#6366F1",
  violet:   "#8B5CF6",
  cyan:     "#22D3EE",
  emerald:  "#10B981",
  amber:    "#F59E0B",
  rose:     "#F43F5E",
  blue:     "#3B82F6",
};


// ─── HELPERS ──────────────────────────────────────────────────────────────────
const fmtINR = (v) => `₹${Number(v).toLocaleString("en-IN")}`;

const STATUS_CFG = {
  Delivered:  { bg: "#064E3B", color: "#6EE7B7", dot: C.emerald },
  Processing: { bg: "#451A03", color: "#FCD34D", dot: C.amber },
  Shipped:    { bg: "#1E3A5F", color: "#93C5FD", dot: C.blue },
  Cancelled:  { bg: "#450A0A", color: "#FCA5A5", dot: C.rose },
};

const PAY_CFG = {
  Paid:    { bg: "#064E3B", color: "#6EE7B7" },
  Pending: { bg: "#451A03", color: "#FCD34D" },
  Failed:  { bg: "#450A0A", color: "#FCA5A5" },
};

const FILTER_OPTIONS = [
  "Today",
  "7 Days",
  "30 Days",
  "12 Months",
];

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

const Badge = ({ label, cfg }) => (
  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
    style={{ background: cfg.bg, color: cfg.color }}>
    <span className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.dot || cfg.color }} />
    {label}
  </span>
);

const Skeleton = ({ h = "h-4", w = "w-full", rounded = "rounded-lg" }) => (
  <div className={`${h} ${w} ${rounded} animate-pulse`} style={{ background: C.border }} />
);

const GlowCard = ({ children, accent = C.indigo, className = "" }) => (
  <div
    className={`relative rounded-2xl p-5 overflow-hidden transition-all duration-300 hover:-translate-y-0.5 ${className}`}
    style={{
      background: `linear-gradient(135deg, ${C.card} 0%, #131B2E 100%)`,
      border: `1px solid ${C.border}`,
      boxShadow: `0 0 0 1px ${C.border}, 0 4px 24px rgba(0,0,0,0.4)`,
    }}
    onMouseEnter={(e) => { e.currentTarget.style.borderColor = accent + "66"; e.currentTarget.style.boxShadow = `0 0 0 1px ${accent}33, 0 8px 32px rgba(0,0,0,0.5), 0 0 40px ${accent}11`; }}
    onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = `0 0 0 1px ${C.border}, 0 4px 24px rgba(0,0,0,0.4)`; }}
  >
    {/* corner glow */}
    <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-5 pointer-events-none"
      style={{ background: accent }} />
    {children}
  </div>
);

const SectionTitle = ({ icon: Icon, title, sub }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
      style={{ background: "linear-gradient(135deg,#6366F1,#8B5CF6)" }}>
      <Icon size={16} color="#fff" />
    </div>
    <div>
      <h2 className="font-bold text-sm tracking-tight" style={{ color: C.text }}>{title}</h2>
      {sub && <p className="text-xs mt-0.5" style={{ color: C.muted }}>{sub}</p>}
    </div>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-4 py-3 text-xs shadow-2xl"
      style={{ background: "#1C2333", border: `1px solid ${C.border2}`, color: C.text }}>
      <p className="font-semibold mb-1" style={{ color: C.muted }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>{p.name}: <strong>{p.name === "Revenue" ? fmtINR(p.value) : p.value}</strong></p>
      ))}
    </div>
  );
};

// ─── STAT CARD ─────────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, growth, accent, loading }) => (
  <GlowCard accent={accent}>
    {loading ? (
      <div className="space-y-3">
        <Skeleton h="h-9" w="w-9" rounded="rounded-xl" />
        <Skeleton h="h-3" w="w-20" />
        <Skeleton h="h-7" w="w-28" />
        <Skeleton h="h-3" w="w-16" />
      </div>
    ) : (
      <>
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: accent + "1A", border: `1px solid ${accent}33` }}>
            <Icon size={18} color={accent} />
          </div>
          <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg`}
            style={{ background: growth >= 0 ? "#064E3B" : "#450A0A", color: growth >= 0 ? "#6EE7B7" : "#FCA5A5" }}>
            {growth >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {Math.abs(growth)}%
          </div>
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: C.muted }}>{label}</p>
        <p className="text-2xl font-bold tracking-tight" style={{ color: C.text }}>{value}</p>
      </>
    )}
  </GlowCard>
);

// ─── MAIN DASHBOARD ────────────────────────────────────────────────────────────
const Analytics = () => {
const [filter, setFilter] =
  useState("12 Months");

const [loading, setLoading] =
  useState(true);

const [analytics, setAnalytics] =
  useState(null);
  const [spinning, setSpinning] = useState(false);
const chartData =
  analytics?.revenueData || [];

const stats = {

  rev:
    analytics?.totalRevenue || 0,

  orders:
    analytics?.totalOrders || 0,

  cust:
    analytics?.totalCustomers || 0,

  del:
    analytics?.deliveredOrders || 0,

  // ✅ FIXED GROWTH VALUES
  revG:
    analytics?.revGrowth || 0,

  ordG:
    analytics?.orderGrowth || 0,

  custG:
    analytics?.customerGrowth || 0,

  delG:
    analytics?.deliveryGrowth || 0,

};

useEffect(() => {

  FetchAnalytics();

}, []);

const FetchAnalytics = async () => {

  try {

    setLoading(true);

    const api =
      `${import.meta.env.VITE_API_URL}/analytics`;

    const res =
      await axios.get(api);

    setAnalytics(res.data);

  } catch (error) {

    console.log(error);

  } finally {

    setLoading(false);

  }
};


  const handleRefresh = () => {
    setSpinning(true);
    setLoading(true);
    setTimeout(() => { setLoading(false); setSpinning(false); }, 800);
  };

 const totalOrders =
analytics?.statusData?.reduce(
  (a, b) => a + b.value,
  0
) || 0;

  return (
    <div className="min-h-screen" style={{ background: C.bg, fontFamily: "'Sora','DM Sans',sans-serif" }}>

      {/* ── TOPBAR ── */}
      <div className="sticky top-0 z-20 px-8 h-16 flex items-center justify-between"
        style={{ background: C.bg + "EE", borderBottom: `1px solid ${C.border}`, backdropFilter: "blur(12px)" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black"
            style={{ background: "linear-gradient(135deg,#6366F1,#8B5CF6)", color: "#fff", letterSpacing: "-0.5px" }}>
            B
          </div>
          <div>
            <span className="font-bold text-sm tracking-tight" style={{ color: C.text }}>BLC Store</span>
            <span className="ml-2 text-xs px-2 py-0.5 rounded-md font-medium"
              style={{ background: "#312E81", color: "#A5B4FC" }}>Analytics</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1 p-1 rounded-xl" style={{ background: C.surface, border: `1px solid ${C.border}` }}>
            {FILTER_OPTIONS.map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
                style={filter === f
                  ? { background: "linear-gradient(135deg,#6366F1,#8B5CF6)", color: "#fff", boxShadow: "0 2px 12px rgba(99,102,241,0.4)" }
                  : { background: "transparent", color: C.muted }}>
                {f}
              </button>
            ))}
          </div>
          <button onClick={handleRefresh}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
            style={{ background: C.surface, border: `1px solid ${C.border}` }}>
            <RefreshCw size={14} color={C.muted}
              style={{ transition: "transform 0.6s", transform: spinning ? "rotate(360deg)" : "rotate(0deg)" }} />
          </button>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="px-8 py-8 max-w-[1440px] mx-auto space-y-8">

        {/* Page title */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: C.text }}>Analytics Overview</h1>
          <p className="text-sm mt-1" style={{ color: C.muted }}>Track your store's performance in real time</p>
        </div>

        {/* ── STAT CARDS ── */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard loading={loading} icon={TrendingUp}    label="Total Revenue"    value={`₹${Number(stats.rev).toLocaleString("en-IN")}`}                 growth={stats.revG}  accent={C.indigo}  />
          <StatCard loading={loading} icon={ShoppingBag}   label="Total Orders"     value={stats.orders} growth={stats.ordG}  accent={C.cyan}    />
          <StatCard loading={loading} icon={Users}         label="Total Customers"  value={stats.cust}   growth={stats.custG} accent={C.violet}  />
          <StatCard loading={loading} icon={CheckCircle2}  label="Delivered Orders" value={stats.del}    growth={stats.delG}  accent={C.emerald} />
        </div>

        {/* ── REVENUE CHART + ORDER STATUS ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

          {/* Revenue chart */}
          <div className="xl:col-span-2 rounded-2xl p-6"
            style={{ background: `linear-gradient(135deg,${C.card},#131B2E)`, border: `1px solid ${C.border}` }}>
            <div className="flex items-center justify-between mb-6">
              <SectionTitle icon={BarChart2} title="Revenue Analytics" sub={`Showing data for ${filter}`} />
              <div className="flex items-center gap-4 text-xs" style={{ color: C.muted }}>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 rounded-full inline-block" style={{ background: C.indigo }} />Revenue
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 rounded-full inline-block" style={{ background: C.cyan }} />Orders
                </span>
              </div>
            </div>

            {loading ? (
              <div className="h-56 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
                  style={{ borderColor: C.indigo, borderTopColor: "transparent" }} />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={C.indigo} stopOpacity={0.25} />
                      <stop offset="95%" stopColor={C.indigo} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="ordGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={C.cyan} stopOpacity={0.20} />
                      <stop offset="95%" stopColor={C.cyan} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
                  <XAxis dataKey="m" tick={{ fill: C.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: C.muted, fontSize: 11 }} axisLine={false} tickLine={false} width={50}
                    tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(0)}k` : v} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="rev"    name="Revenue" stroke={C.indigo} strokeWidth={2} fill="url(#revGrad)" dot={false} activeDot={{ r: 5, fill: C.indigo }} />
                  <Area type="monotone" dataKey="orders" name="Orders"  stroke={C.cyan}   strokeWidth={2} fill="url(#ordGrad)" dot={false} activeDot={{ r: 5, fill: C.cyan   }} />
                </AreaChart>
              </ResponsiveContainer>
            )}

            {/* Monthly mini-stats */}
            <div className="grid grid-cols-3 gap-3 mt-6 pt-5" style={{ borderTop: `1px solid ${C.border}` }}>
              {[
                { label: "Peak Month", value: "December", sub: "₹38,900" },
                { label: "Avg Monthly", value: "₹28,900", sub: "per month" },
                { label: "YoY Growth", value: "+22.3%", sub: "vs last year" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-xs mb-1" style={{ color: C.muted }}>{s.label}</p>
                  <p className="text-sm font-bold" style={{ color: C.text }}>{s.value}</p>
                  <p className="text-xs" style={{ color: C.muted }}>{s.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Order status pie */}
          <div className="rounded-2xl p-6"
            style={{ background: `linear-gradient(135deg,${C.card},#131B2E)`, border: `1px solid ${C.border}` }}>
            <SectionTitle icon={Package} title="Order Status" sub="All time breakdown" />

            {loading ? (
              <div className="flex justify-center my-4">
                <Skeleton h="h-40" w="w-40" rounded="rounded-full" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={analytics?.statusData || []} cx="50%" cy="50%" innerRadius={48} outerRadius={72}
                    paddingAngle={3} dataKey="value" strokeWidth={0}>
                    {analytics?.statusData || [].map((e, i) => (
                      <Cell
  key={i}

  fill={
    STATUS_CFG[e.name]?.dot ||
    C.indigo
  }

  opacity={0.9}
/>
                    ))}
                  </Pie>
                  <Tooltip formatter={(v, n) => [v, n]} contentStyle={{ background: "#1C2333", border: `1px solid ${C.border2}`, borderRadius: 10, fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            )}

            <div className="space-y-3 mt-2">
              {analytics?.statusData || [].map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="flex items-center gap-1.5 font-medium" style={{ color: "#CBD5E1" }}>
                      <span className="w-2 h-2 rounded-sm" style={{ background:
  STATUS_CFG[s.name]?.dot ||
  C.indigo }} />
                      {s.name}
                    </span>
                    <span className="font-semibold" style={{ color: C.muted }}>
                      {s.value} · {
  totalOrders > 0

    ? Math.round(
        (s.value / totalOrders) * 100
      )

    : 0
}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: C.border }}>
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${
  totalOrders > 0

    ? Math.round(
        (s.value / totalOrders) * 100
      )

    : 0
}%`,   background:
    STATUS_CFG[s.name]?.dot ||
    C.indigo }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── TOP PRODUCTS + RECENT ORDERS ── */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">

          {/* Top products */}
          <div className="xl:col-span-2 rounded-2xl overflow-hidden"
            style={{ background: `linear-gradient(135deg,${C.card},#131B2E)`, border: `1px solid ${C.border}` }}>
            <div className="px-6 pt-6 pb-4" style={{ borderBottom: `1px solid ${C.border}` }}>
              <SectionTitle icon={Star} title="Top Selling Products" sub="By revenue generated" />
            </div>
            <div className="divide-y" style={{ borderColor: C.border }}>
              {loading
                ? Array(5).fill(0).map((_, i) => (
                    <div key={i} className="px-6 py-4 flex items-center gap-3">
                      <Skeleton h="h-4" w="w-4" rounded="rounded" />
                      <div className="flex-1 space-y-2"><Skeleton h="h-3" /><Skeleton h="h-3" w="w-20" /></div>
                    </div>
                  ))
                : analytics?.topProducts?.map((p, i) => (
                    <div key={p.rank} className="px-6 py-4 flex items-center gap-4 group transition-colors"
                      style={{ background: "transparent" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#0D1321")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <span className="text-xs font-bold w-5 text-center" style={{ color: p.rank <= 3 ? C.violet : C.muted }}>
                        #{p.rank}
                      </span>
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{ background: C.indigo + "22", color: C.indigo, border: `1px solid ${C.indigo}33` }}
                      >
                        {p.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate" style={{ color: C.text }}>{p.name}</p>
                        <p className="text-xs mt-0.5" style={{ color: C.muted }}>{p.units} units</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold" style={{ color: C.text }}>{fmtINR(p.revenue)}</p>
                        <p className="text-xs font-semibold mt-0.5" style={{ color: p.change >= 0 ? C.emerald : C.rose }}>
                          {p.change >= 0 ? "↑" : "↓"} {Math.abs(p.change)}%
                        </p>
                      </div>
                    </div>
                  ))}
            </div>
          </div>

          {/* Recent orders */}
          <div className="xl:col-span-3 rounded-2xl overflow-hidden"
            style={{ background: `linear-gradient(135deg,${C.card},#131B2E)`, border: `1px solid ${C.border}` }}>
            <div className="px-6 pt-6 pb-4" style={{ borderBottom: `1px solid ${C.border}` }}>
              <SectionTitle icon={ShoppingBag} title="Recent Orders" sub="Latest transactions" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px]">
                <thead>
                  <tr style={{ background: C.bg }}>
                    {["Order","Customer","Amount","Payment","Status","Date"].map((h) => (
                      <th key={h} className="text-left text-xs font-semibold uppercase tracking-wider px-5 py-3"
                        style={{ color: C.muted }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading
                    ? Array(6).fill(0).map((_, i) => (
                        <tr key={i} style={{ borderTop: `1px solid ${C.border}` }}>
                          {Array(6).fill(0).map((__, j) => (
                            <td key={j} className="px-5 py-4"><Skeleton h="h-3" w="w-16" /></td>
                          ))}
                        </tr>
                      ))
                    : analytics?.recentOrders?.map((o) => (
                        <tr key={o._id.slice(-6)} style={{ borderTop: `1px solid ${C.border}` }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "#0D1321")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                          className="transition-colors cursor-default">
                          <td className="px-5 py-4 text-xs font-mono font-semibold" style={{ color: C.violet }}>#{o._id.slice(-6)}</td>
                          <td className="px-5 py-4 text-sm font-medium" style={{ color: "#CBD5E1" }}>{o.contactInfo?.firstName}</td>
                          <td className="px-5 py-4 text-sm font-bold" style={{ color: C.text }}>{fmtINR(o.amount)}</td>
                          <td className="px-5 py-4"><Badge label={o.paymentStatus} cfg={PAY_CFG[o.paymentStatus]} /></td>
                          <td className="px-5 py-4"><Badge label={o.orderStatus} cfg={STATUS_CFG[o.orderStatus]} /></td>
                          <td className="px-5 py-4 text-xs" style={{ color: C.muted }}>{new Date(o.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 flex justify-between items-center" style={{ borderTop: `1px solid ${C.border}`, background: "#0A0F1A" }}>
              <p className="text-xs" style={{ color: C.muted }}>Showing 6 of {stats.orders} orders</p>
              <button className="text-xs font-semibold transition-colors" style={{ color: C.indigo }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#A5B4FC")}
                onMouseLeave={(e) => (e.currentTarget.style.color = C.indigo)}>
                View all orders →
              </button>
            </div>
          </div>
        </div>

        {/* ── CUSTOMER ANALYTICS ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

          {/* Customer stats */}
          <div className="xl:col-span-1 grid grid-cols-2 gap-4 content-start">
            {[
  {
    icon: Users,

    label: "New Customers",

    value: loading
      ? "—"
      : analytics?.newCustomers || 0,

    accent: C.cyan,

    sub: "This period",
  },

  {
    icon: RefreshCw,

    label: "Repeat Customers",

    value: loading
      ? "—"
      : analytics?.repeatCustomers || 0,

    accent: C.violet,

    sub: "Returning",
  },

  {
    icon: CheckCircle2,

    label: "Avg Order Value",

    value: loading
      ? "—"
      : fmtINR(
          analytics?.avgOrderValue || 0
        ),

    accent: C.emerald,

    sub: "Per order",
  },

  {
    icon: TrendingUp,

    label: "Conv. Rate",

    value: loading
      ? "—"
      : `${analytics?.conversionRate || 0}%`,

    accent: C.amber,

    sub: "Store visits",
  },
].map((s) => (
              <GlowCard key={s.label} accent={s.accent}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: s.accent + "1A", border: `1px solid ${s.accent}33` }}>
                  <s.icon size={15} color={s.accent} />
                </div>
                <p className="text-lg font-bold" style={{ color: C.text }}>{s.value}</p>
                <p className="text-xs font-semibold mt-0.5" style={{ color: C.muted }}>{s.label}</p>
                <p className="text-xs mt-0.5" style={{ color: C.dim + "99" }}>{s.sub}</p>
              </GlowCard>
            ))}
          </div>

          {/* Top cities */}
          <div className="xl:col-span-2 rounded-2xl p-6"
            style={{ background: `linear-gradient(135deg,${C.card},#131B2E)`, border: `1px solid ${C.border}` }}>
            <SectionTitle icon={MapPin} title="Top Cities by Orders" sub="Customer geographical distribution" />
            <div className="space-y-4">
              {loading
                ? Array(5).fill(0).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between"><Skeleton h="h-3" w="w-24" /><Skeleton h="h-3" w="w-8" /></div>
                      <Skeleton h="h-2" />
                    </div>
                  ))
                : analytics?.topCities?.map((c, i) => (
                    <div key={c.city}>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold w-5 text-center" style={{ color: i < 3 ? C.violet : C.muted }}>
                            {i + 1}
                          </span>
                          <span className="font-semibold" style={{ color: "#CBD5E1" }}>{c.city}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span style={{ color: C.muted }}>{c.customers} orders</span>
                          <span className="font-bold w-8 text-right" style={{ color: C.text }}>{
  totalOrders > 0

    ? Math.round(
        (c.customers /
          totalOrders) *
          100
      )

    : 0
}%</span>
                        </div>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden" style={{ background: C.border }}>
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${
  totalOrders > 0

    ? Math.round(
        (c.customers /
          totalOrders) *
          100
      )

    : 0
}%`,
                            background: `linear-gradient(90deg, ${C.indigo}, ${C.violet})`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 pb-4 text-xs" style={{ color: C.muted, borderTop: `1px solid ${C.border}` }}>
          <span>BLC Store Analytics · Last updated just now</span>
          <span>Powered by <span style={{ color: C.indigo }}>BLC Admin v2.0</span></span>
        </div>
      </div>
    </div>
  );
}

export default Analytics