import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";

const StatusBadge = ({ status }) => {
  const s = status === "Active"
    ? { background: "#064E3B", color: "#6EE7B7", dot: "#10B981" }
    : { background: "#451A03", color: "#FCD34D", dot: "#F59E0B" };
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold" style={s}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
      {status}
    </span>
  );
};

export default function Customers() {
const [customers, setCustomers] =
  useState([]);

const [search, setSearch] =
  useState("");

const [filter, setFilter] =
  useState("all");

const [selected, setSelected] =
  useState(null);

  useEffect(() => {

  const loadCustomers = async () => {

    try {

      const api =
        `${import.meta.env.VITE_API_URL}/admin/orders`;

      const res =
        await axios.get(api);

      setCustomers(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  loadCustomers();

}, []);

const filtered = useMemo(() => {

  return customers.filter((c) => {

    const fullName =
      `${c.contactInfo?.firstName || ""} ${c.contactInfo?.lastName || ""}`;

    const matchSearch =

      fullName
        .toLowerCase()
        .includes(search.toLowerCase())

      ||

      c.contactInfo?.email
        ?.toLowerCase()
        .includes(search.toLowerCase())

      ||

      c.shippingInfo?.city
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchFilter =

      filter === "all"

      ||

      c.orderStatus
        ?.toLowerCase()
        === filter;

    return (
      matchSearch &&
      matchFilter
    );

  });

}, [customers, search, filter]);

  return (
<div className="flex-1 flex flex-col min-w-0 min-h-screen" style={{ background: "#0F172A", fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>

  {/* Topbar */}
  <header
    className="h-14 sm:h-16 flex items-center justify-between px-4 sm:px-6 md:px-8 sticky top-0 z-10"
    style={{
      background: "#0F172A",
      borderBottom: "1px solid #1E293B",
    }}
  >
    <div>
      <h1
        className="text-base font-bold tracking-tight"
        style={{ color: "#F1F5F9" }}
      >
        Customers
      </h1>

      <p
        className="text-xs"
        style={{ color: "#475569" }}
      >
        Manage your customer base
      </p>
    </div>
  </header>

  <main className="flex-1 p-3 sm:p-4 md:p-8">

    {/* Table card */}
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "#1E293B",
        border: "1px solid #334155",
      }}
    >

      {/* Toolbar */}
      <div
        className="px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        style={{
          borderBottom: "1px solid #334155",
        }}
      >

        {/* Search */}
        <div
          className="flex items-center gap-2 rounded-xl px-3 py-2 w-full sm:w-72"
          style={{
            background: "#0F172A",
            border: "1px solid #334155",
          }}
        >

          <svg
            className="w-4 h-4 flex-shrink-0"
            style={{ color: "#475569" }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          <input
            className="bg-transparent text-sm outline-none w-full"
            style={{ color: "#CBD5E1" }}
            placeholder="Search by name, email or city..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        {/* FILTER */}
        <div
          className="flex gap-1 p-1 rounded-xl flex-shrink-0"
          style={{
            background: "#0F172A",
          }}
        >

          {[
            "all",
            "processing",
            "shipped",
            "delivered",
            "cancelled",
          ].map((tab) => (

            <button
              key={tab}
              onClick={() =>
                setFilter(tab)
              }
              className="px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all duration-200"
              style={
                filter === tab

                  ? {
                      background:
                        "linear-gradient(135deg,#6366F1,#8B5CF6)",
                      color: "#FFF",
                    }

                  : {
                      background:
                        "transparent",
                      color: "#475569",
                    }
              }
            >

              {tab}

            </button>

          ))}

        </div>

      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr
              style={{
                background: "#0F172A",
              }}
            >

              {[
                "Customer",
                "Contact",
                "Location",
                "Orders",
                "Total Spent",
                "Status",
                "Joined",
              ].map((h) => (

                <th
                  key={h}
                  className="text-left text-xs font-semibold uppercase tracking-wider px-6 py-3"
                  style={{
                    color: "#475569",
                  }}
                >

                  {h}

                </th>

              ))}

            </tr>

          </thead>

          <tbody>

            {filtered.length === 0 ? (

              <tr>

                <td
                  colSpan={7}
                  className="text-center py-16 text-sm"
                  style={{
                    color: "#475569",
                  }}
                >

                  No customers found.

                </td>

              </tr>

            ) : (

              filtered.map((c, index) => (

                <tr
                  key={index}
                  className="transition-colors duration-150 cursor-pointer"
                  style={{
                    borderTop:
                      "1px solid #0F172A",
                  }}
                  onMouseEnter={(e) =>
                    (
                      e.currentTarget.style.background =
                        "#273348"
                    )
                  }
                  onMouseLeave={(e) =>
                    (
                      e.currentTarget.style.background =
                        "transparent"
                    )
                  }
                  onClick={() =>
                    setSelected(c)
                  }
                >

                  {/* CUSTOMER */}
                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{
                          background:
                            "#6366F1",
                          color: "#FFF",
                        }}
                      >

                        {
                          c.contactInfo
                            ?.firstName?.charAt(0)
                        }

                      </div>

                      <div>

                        <p
                          className="text-sm font-semibold"
                          style={{
                            color: "#F1F5F9",
                          }}
                        >

                          {
                            c.contactInfo
                              ?.firstName
                          }{" "}

                          {
                            c.contactInfo
                              ?.lastName
                          }

                        </p>

                        <p
                          className="text-xs"
                          style={{
                            color: "#475569",
                          }}
                        >

                          {
                            c._id.slice(-6)
                          }

                        </p>

                      </div>

                    </div>

                  </td>

                  {/* CONTACT */}
                  <td className="px-6 py-4">

                    <p
                      className="text-sm"
                      style={{
                        color: "#94A3B8",
                      }}
                    >

                      {
                        c.contactInfo
                          ?.email
                      }

                    </p>

                    <p
                      className="text-xs mt-0.5"
                      style={{
                        color: "#475569",
                      }}
                    >

                      {
                        c.contactInfo
                          ?.phone
                      }

                    </p>

                  </td>

                  {/* LOCATION */}
                  <td className="px-6 py-4">

                    <span
                      className="text-sm"
                      style={{
                        color: "#94A3B8",
                      }}
                    >

                      {
                        c.shippingInfo
                          ?.city
                      }

                    </span>

                  </td>

                  {/* ORDERS */}
                  <td className="px-6 py-4">

                    <span
                      className="text-sm font-semibold"
                      style={{
                        color: "#CBD5E1",
                      }}
                    >

                      {
                        c.products?.length
                      }

                    </span>

                  </td>

                  {/* TOTAL */}
                  <td className="px-6 py-4">

                    <span
                      className="text-sm font-bold"
                      style={{
                        color: "#F1F5F9",
                      }}
                    >

                      ₹
                      {Number(
                        c.amount
                      ).toLocaleString(
                        "en-IN"
                      )}

                    </span>

                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4">

                    <StatusBadge
                      status={
                        c.orderStatus
                      }
                    />

                  </td>

                  {/* DATE */}
                  <td
                    className="px-6 py-4 text-sm"
                    style={{
                      color: "#475569",
                    }}
                  >

                    {
                      new Date(
                        c.createdAt
                      ).toLocaleDateString()
                    }

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {/* FOOTER */}
      <div
        className="px-6 py-4 flex items-center justify-between"
        style={{
          borderTop:
            "1px solid #334155",
          background: "#172033",
        }}
      >

        <p
          className="text-xs"
          style={{
            color: "#475569",
          }}
        >

          Showing{" "}

          <span
            style={{
              color: "#94A3B8",
              fontWeight: 600,
            }}
          >

            {filtered.length}

          </span>

          {" "}of{" "}

          <span
            style={{
              color: "#94A3B8",
              fontWeight: 600,
            }}
          >

            {customers.length}

          </span>

          {" "}customers

        </p>

      </div>

    </div>

    {/* DETAIL POPUP */}
{selected && (

<div
  className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"

  onClick={() =>
    setSelected(null)
  }
>

<div
  className="w-full max-w-5xl rounded-2xl overflow-hidden"

  onClick={(e) =>
    e.stopPropagation()
  }>

      {/* HEADER */}
      <div
        className="px-6 py-5 flex items-start justify-between"
        style={{
          borderBottom: "1px solid #334155",
        }}
      >

        <div className="flex items-center gap-4">

          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold"
            style={{
              background: "#6366F122",
              color: "#818CF8",
            }}
          >

            {
              selected.contactInfo
                ?.firstName?.charAt(0)
            }

          </div>

          <div>

            <h3
              className="text-xl font-bold"
              style={{
                color: "#F1F5F9",
              }}
            >

              {
                selected.contactInfo
                  ?.firstName
              }{" "}

              {
                selected.contactInfo
                  ?.lastName
              }

            </h3>

            <p
              className="text-sm"
              style={{
                color: "#64748B",
              }}
            >

              {
                selected.contactInfo
                  ?.email
              }

            </p>

          </div>

        </div>

        {/* CLOSE */}
        <button
          onClick={() =>
            setSelected(null)
          }
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
          style={{
            background: "#0F172A",
            color: "#64748B",
          }}
        >

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
              d="M6 18L18 6M6 6l12 12"
            />

          </svg>

        </button>

      </div>

      {/* BODY */}
      <div className="p-6 overflow-y-auto max-h-[80vh]">

        {/* INFO GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

          {[
            {
              label: "Phone",
              value:
                selected.contactInfo
                  ?.phone,
            },

            {
              label: "City",
              value:
                selected.shippingInfo
                  ?.city,
            },

            {
              label: "State",
              value:
                selected.shippingInfo
                  ?.state,
            },

            {
              label: "Pincode",
              value:
                selected.shippingInfo
                  ?.pincode,
            },

            {
              label: "Country",
              value:
                selected.shippingInfo
                  ?.country,
            },

            {
              label: "Payment",
              value:
                selected.paymentMethod,
            },

            {
              label: "Payment Status",
              value:
                selected.paymentStatus,
            },

            {
              label: "Order Status",
              value:
                selected.orderStatus,
            },

            {
              label: "Total Amount",
              value:
                "₹" +
                Number(
                  selected.amount
                ).toLocaleString(
                  "en-IN"
                ),
            },

            {
              label: "Joined",
              value:
                new Date(
                  selected.createdAt
                ).toLocaleDateString(),
            },

            {
              label: "Order ID",
              value:
                selected
                  .razorpayOrderId,
            },

            {
              label: "Payment ID",
              value:
                selected
                  .razorpayPaymentId,
            },

          ].map((d) => (

            <div
              key={d.label}
              className="rounded-xl p-4"
              style={{
                background: "#0F172A",
              }}
            >

              <p
                className="text-xs mb-2"
                style={{
                  color: "#475569",
                }}
              >

                {d.label}

              </p>

              <p
                className="text-sm font-semibold break-words"
                style={{
                  color: "#CBD5E1",
                }}
              >

                {d.value}

              </p>

            </div>

          ))}

        </div>

        {/* SHIPPING ADDRESS */}
        <div
          className="rounded-2xl p-5 mb-6"
          style={{
            background: "#0F172A",
          }}
        >

          <h4
            className="text-sm font-bold mb-4 uppercase tracking-wider"
            style={{
              color: "#F1F5F9",
            }}
          >

            Shipping Address

          </h4>

          <p
            className="text-sm leading-7"
            style={{
              color: "#94A3B8",
            }}
          >

            {
              selected.shippingInfo
                ?.address
            }

            <br />

            {
              selected.shippingInfo
                ?.city
            }
            ,{" "}

            {
              selected.shippingInfo
                ?.state
            }

            {" - "}

            {
              selected.shippingInfo
                ?.pincode
            }

            <br />

            {
              selected.shippingInfo
                ?.country
            }

          </p>

        </div>

        {/* PRODUCTS */}
        <div>

          <h4
            className="text-sm font-bold mb-4 uppercase tracking-wider"
            style={{
              color: "#F1F5F9",
            }}
          >

            Ordered Products

          </h4>

          <div className="space-y-4">

            {selected.products?.map(
              (product, index) => (

                <div
                  key={index}
                  className="flex items-center gap-4 rounded-2xl p-4"
                  style={{
                    background:
                      "#0F172A",
                  }}
                >

                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-16 h-16 rounded-xl object-cover"
                  />

                  <div className="flex-1">

                    <h3
                      className="text-sm font-semibold"
                      style={{
                        color:
                          "#F1F5F9",
                      }}
                    >

                      {
                        product.title
                      }

                    </h3>

                    <p
                      className="text-xs mt-1"
                      style={{
                        color:
                          "#64748B",
                      }}
                    >

                      Quantity:
                      {" "}
                      {
                        product.qty
                      }

                    </p>

                  </div>

                  <div
                    className="text-sm font-bold"
                    style={{
                      color:
                        "#CBD5E1",
                    }}
                  >

                    ₹
                    {Number(
                      product.price
                    ).toLocaleString(
                      "en-IN"
                    )}

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      </div>

    </div>

  </div>

)}

  </main>

</div>
  );
}