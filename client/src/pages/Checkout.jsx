import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { clearCart } from "../cartSlice";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // CHECKOUT MODE (with smart fallback)
  const rawCheckoutMode = localStorage.getItem("checkoutMode");

  // REDUX CART
  const reduxCart = useSelector((state) => state.mycart.cart);

  // BUY NOW DATA
  const buyNowData = JSON.parse(localStorage.getItem("buyNowProduct")) || [];

  // ✅ SMART MODE DETECTION: resolve mode based on availability of data to prevent stale modes
  const resolvedMode = (rawCheckoutMode === "buyNow" && buyNowData.length > 0)
    ? "buyNow"
    : (reduxCart.length > 0 ? "cart" : null);

  // FINAL DATA
  const cartData = resolvedMode === "buyNow" ? buyNowData : reduxCart;

useEffect(() => {

  // ✅ AUTH GUARD: redirect to login if not authenticated
  const token = localStorage.getItem("token");
  if (!token) {
    localStorage.setItem("redirectAfterLogin", "/checkout");
    navigate("/login", { state: { from: "/checkout" } });
    return;
  }

  // BUY NOW FLOW
  if (
    resolvedMode === "buyNow" &&
    buyNowData.length > 0
  ) {

    return;
  }

  // CART FLOW
  if (
    resolvedMode === "cart" &&
    reduxCart.length > 0
  ) {

    return;
  }

  // ✅ ALSO ALLOW: if we have ANY data, don't redirect
  if (buyNowData.length > 0 || reduxCart.length > 0) {
    return;
  }

  // TRULY EMPTY — redirect home
  navigate("/");

}, []);
  // SUBTOTAL
  const subtotal = cartData.reduce(
    (acc, item) => acc + (item.discountPrice || item.price) * (item.qty || 1),

    0,
  );
  const [delivery, setDelivery] = useState("standard");
  const [payment, setPayment] = useState("card");
  const [coupon, setCoupon] = useState("");
  const [couponMsg, setCouponMsg] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "Madhya Pradesh",
    pincode: "",
    country: "India",
  });
  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleContact = (e) => {
    setContactInfo({
      ...contactInfo,
      [e.target.name]: e.target.value,
    });
  };
  const handleShipping = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const shippingCost =
    delivery === "express" ? 199 : delivery === "overnight" ? 349 : 0;

  const total = Math.round(subtotal + shippingCost - discount);

  const deliveryOptions = [
    {
      id: "standard",
      label: "Standard Delivery",
      sub: "5–7 Business Days",
      price: "Free",
    },
    {
      id: "express",
      label: "Express Delivery",
      sub: "2–3 Business Days",
      price: "₹199.00",
    },
    {
      id: "overnight",
      label: "Overnight Delivery",
      sub: "Next Business Day",
      price: "₹349.00",
    },
  ];

  const paymentOptions = [
    {
      id: "card",
      label: "Credit / Debit Card",
      sub: "Visa · Mastercard · Rupay",
    },
    { id: "upi", label: "UPI", sub: "GPay · PhonePe · Paytm" },
    {
      id: "cod",
      label: "Cash on Delivery",
      sub: "Pay when your order arrives",
    },
  ];

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "SAVE10") {
      setDiscount(subtotal * 0.1);
      setCouponMsg({ text: "✓ 10% discount applied", success: true });
    } else if (coupon.toUpperCase() === "FREE") {
      setCouponMsg({ text: "✓ Free shipping applied", success: true });
    } else {
      setDiscount(0);
      setCouponMsg({ text: "Invalid coupon code", success: false });
    }
  };

  const handlePayment = async () => {
    try {
      const api = `${import.meta.env.VITE_API_URL}/payment/createorder`;

      // 1. Create the order on your backend/Razorpay
      const response = await axios.post(api, {
        amount: Number(total),
      });

      const order = response.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: "BaseLayer",
        description: "Order Payment",
        order_id: order.id,

        handler: async function (response) {
          try {
            // ✅ VERIFY PAYMENT FIRST
            console.log(options);
            console.log(order);
            const verifyApi = `${import.meta.env.VITE_API_URL}/payment/verifypayment`;

            const verifyResponse = await axios.post(verifyApi, {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            // ✅ IF PAYMENT VERIFIED
            if (verifyResponse.data.success) {
              const saveOrderApi = `${import.meta.env.VITE_API_URL}/user/saveorder`;

              const user = JSON.parse(localStorage.getItem("user"));

              const saveResponse = await axios.post(saveOrderApi, {
                // ✅ USER ID
                userId: user?._id,

                products: cartData.map((item) => ({
                  productId: item._id,
                  title: item.title,
                  price: item.price,
                  qty: item.qty,
                  image: item.defaultImage,
                })),

                contactInfo,

                shippingInfo,

                amount: Number(total),

                paymentMethod: "Razorpay",

                paymentStatus: "Paid",

                orderStatus: "Processing",

                razorpayOrderId: response.razorpay_order_id,

                razorpayPaymentId: response.razorpay_payment_id,

                razorpaySignature: response.razorpay_signature,
              });

              if (saveResponse.status === 200 || saveResponse.status === 201) {
                alert("Payment Successful & Order Saved!");

                // CHECK ACTIVE FLOW
// BUY NOW FLOW
if (
  resolvedMode === "buyNow"
) {

  localStorage.removeItem(
    "buyNowProduct"
  );

}

// CART FLOW
else {

  dispatch(clearCart());

}

// CLEAR MODE
localStorage.removeItem(
  "checkoutMode"
);

                // SUCCESS PAGE
                navigate("/success", {
                  state: {
                    order: saveResponse.data.order,
                  },
                });
              }
            } else {
              alert("Payment verification failed");
            }
          } catch (saveError) {
            console.error("Error:", saveError);

            alert(
              "Payment completed but order save failed. Please contact support.",
            );
          }
        },

        prefill: {
          name:
            contactInfo.firstName && contactInfo.lastName
              ? `${contactInfo.firstName} ${contactInfo.lastName}`
              : "Customer",

          email: contactInfo.email?.trim() || "customer@gmail.com",

          contact:
            contactInfo.phone?.replace(/\D/g, "")?.slice(-10) || "9876543210",
        },
        theme: {
          color: "#f97316",
        },
      };

      console.log(order);

      console.log(options);

      const razor = new window.Razorpay(options);
      razor.on("payment.failed", function (response) {
        console.log(response.error);

        alert("Payment Failed");
      });
      razor.open();
    } catch (error) {
      console.error("Payment Initialization Error:", error);
      alert("Could not initialize payment. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white font-mono px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-10 text-black">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 border-b border-gray-200 pb-4 mb-6 sm:mb-8 flex-wrap">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-widest">
          Checkout
        </h1>
        <div className="flex items-center gap-2 sm:ml-auto">
          {/* Step: Cart (done) */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black flex items-center justify-center text-white text-[10px]">
              ✓
            </div>
            <span className="text-[10px] tracking-widest uppercase text-gray-400">
              Cart
            </span>
          </div>
          <div className="w-7 h-px bg-gray-200" />
          {/* Step: Details (active) */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-orange-500 flex items-center justify-center text-white text-[10px]">
              2
            </div>
            <span className="text-[10px] tracking-widest uppercase text-black">
              Details
            </span>
          </div>
          <div className="w-7 h-px bg-gray-200" />
          {/* Step: Confirm */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 border border-gray-200 flex items-center justify-center text-gray-400 text-[10px]">
              3
            </div>
            <span className="text-[10px] tracking-widest uppercase text-gray-400">
              Confirm
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 sm:gap-8">
        {/* LEFT COLUMN */}
        <div>
          {/* Contact */}
          <div className="border border-gray-200 p-4 sm:p-6 mb-6">
            <p className="text-[10px] tracking-[2px] uppercase text-gray-400 mb-4 pb-3 border-b border-gray-100">
              Contact Information
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <Field
                label="First Name"
                placeholder="John"
                type="text"
                name="firstName"
                value={contactInfo.firstName}
                onChange={handleContact}
              />
              <Field
                label="Last Name"
                placeholder="Doe"
                type="text"
                name="lastName"
                value={contactInfo.lastName}
                onChange={handleContact}
              />
            </div>
            <div className="mb-3">
              <Field
                label="Email Address"
                placeholder="john@example.com"
                type="email"
                name="email"
                value={contactInfo.email}
                onChange={handleContact}
              />
            </div>
            <Field
              label="Phone Number"
              placeholder="+91 98765 43210"
              type="tel"
              name="phone"
              value={contactInfo.phone}
              onChange={handleContact}
            />
          </div>

          {/* Shipping */}
          <div className="mb-3">
            <Field
              label="Address"
              placeholder="123 Main Street"
              name="address"
              value={shippingInfo.address}
              onChange={handleShipping}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <Field
              label="City"
              placeholder="Indore"
              name="city"
              value={shippingInfo.city}
              onChange={handleShipping}
            />

            <div>
              <label className="block text-[10px] tracking-[1.5px] uppercase text-gray-400 mb-1.5">
                State
              </label>

              <select
                name="state"
                value={shippingInfo.state}
                onChange={handleShipping}
                className="w-full h-9 border border-gray-200 px-3 font-mono text-xs text-black outline-none focus:border-orange-500 bg-white appearance-none"
              >
                <option>Madhya Pradesh</option>
                <option>Maharashtra</option>
                <option>Gujarat</option>
                <option>Delhi</option>
                <option>Karnataka</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field
              label="Pin Code"
              placeholder="452001"
              name="pincode"
              value={shippingInfo.pincode}
              onChange={handleShipping}
            />

            <div>
              <label className="block text-[10px] tracking-[1.5px] uppercase text-gray-400 mb-1.5">
                Country
              </label>

              <select
                name="country"
                value={shippingInfo.country}
                onChange={handleShipping}
                className="w-full h-9 border border-gray-200 px-3 font-mono text-xs text-black outline-none focus:border-orange-500 bg-white appearance-none"
              >
                <option>India</option>
                <option>USA</option>
                <option>UK</option>
              </select>
            </div>
          </div>

          {/* Delivery */}
          <div className="border border-gray-200 p-4 sm:p-6 mb-6">
            <p className="text-[10px] tracking-[2px] uppercase text-gray-400 mb-4 pb-3 border-b border-gray-100">
              Delivery Method
            </p>
            <div className="flex flex-col gap-3">
              {deliveryOptions.map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setDelivery(opt.id)}
                  className={`flex items-center gap-3 p-3 border cursor-pointer transition-colors ${
                    delivery === opt.id
                      ? "border-orange-500"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
                      delivery === opt.id
                        ? "border-orange-500"
                        : "border-gray-300"
                    }`}
                  >
                    {delivery === opt.id && (
                      <div className="w-2 h-2 rounded-full bg-orange-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-black">
                      {opt.label}
                    </p>
                    <p className="text-[10px] tracking-widest text-gray-400 mt-0.5">
                      {opt.sub}
                    </p>
                  </div>
                  <p className="text-xs font-medium text-black">{opt.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment */}
          {/* <div className="border border-gray-200 p-6 mb-6">
            <p className="text-[10px] tracking-[2px] uppercase text-gray-400 mb-4 pb-3 border-b border-gray-100">
              Payment
            </p>
            <div className="flex flex-col gap-3 mb-4">
              {paymentOptions.map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setPayment(opt.id)}
                  className={`flex items-center gap-3 p-3 border cursor-pointer transition-colors ${
                    payment === opt.id ? "border-orange-500" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
                    payment === opt.id ? "border-orange-500" : "border-gray-300"
                  }`}>
                    {payment === opt.id && <div className="w-2 h-2 rounded-full bg-orange-500" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-black">{opt.label}</p>
                    {opt.sub && <p className="text-[10px] tracking-widest text-gray-400 mt-0.5">{opt.sub}</p>}
                  </div>
                </div>
              ))}
            </div>

            {payment === "card" && (
              <div>
                <div className="mb-3">
                  <Field label="Card Number" placeholder="1234  5678  9012  3456" />
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Field label="Expiry Date" placeholder="MM / YY" />
                  <Field label="CVV" placeholder="•••" />
                </div>
                <Field label="Name on Card" placeholder="John Doe" />
              </div>
            )}

            {payment === "upi" && (
              <div>
                <Field label="UPI ID" placeholder="yourname@upi" />
              </div>
            )}
          </div> */}
        </div>

        {/* RIGHT COLUMN — Order Summary */}
        <div>
          <div className="border border-gray-200 bg-gray-50 p-4 sm:p-6 sticky top-4">
            <h2
              className="font-black uppercase tracking-widest text-xl mb-4 pb-3 border-b border-gray-200"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "22px",
                letterSpacing: "2px",
              }}
            >
              Order Summary
            </h2>

            {cartData.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 py-3 border-b border-gray-100"
              >
                <img
                  src={
  item.defaultImage ||

  item.image ||

  item.images?.[0]
}
                  alt={item.title}
                  className="w-11 h-11 object-cover border border-gray-200 bg-gray-100 flex-shrink-0"
                />
                <div className="flex-1">
                  <p className="text-xs font-medium text-black">{item.title}</p>
                  <p className="text-[10px] tracking-widest text-gray-400 mt-0.5">
                    {(item.price * item.qty).toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </p>
                </div>
                <p className="text-xs font-medium text-black">
                  {(item.price * item.qty).toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </p>
              </div>
            ))}

            {/* Coupon */}
            <div className="flex gap-2 mt-4 mb-1">
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Coupon code"
                className="flex-1 h-9 border border-gray-200 px-3 font-mono text-xs text-black bg-white outline-none focus:border-orange-500"
              />
              <button
                onClick={applyCoupon}
                className="h-9 px-4 bg-black text-white font-mono text-[10px] tracking-widest uppercase hover:bg-gray-800 transition-colors"
              >
                Apply
              </button>
            </div>
            {couponMsg && (
              <p
                className={`text-[10px] tracking-wide mb-2 ${couponMsg.success ? "text-green-600" : "text-red-500"}`}
              >
                {couponMsg.text}
              </p>
            )}

            {/* Totals */}
            <div className="flex justify-between text-[11px] tracking-widest uppercase text-gray-400 py-1.5 mt-2">
              <span>Subtotal</span>
              <span>₹{Number(subtotal).toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-[11px] tracking-widest uppercase text-gray-400 py-1.5">
              <span>Shipping</span>
              <span>
                {shippingCost === 0
                  ? "Free"
                  : `₹${Number(shippingCost).toLocaleString("en-IN")}`}
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-[11px] tracking-widest uppercase text-green-600 py-1.5">
                <span>Discount</span>
                <span>-₹{Number(discount).toLocaleString("en-IN")}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-semibold tracking-widest uppercase text-black py-3 border-t border-gray-200 mt-2">
              <span>Total</span>₹{Number(total).toLocaleString("en-IN")}
            </div>

            <button
              onClick={handlePayment}
              className="w-full mt-4 py-3 cursor-pointer bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-black uppercase tracking-widest text-lg transition-all"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "20px",
              }}
            >
              Place Order
            </button>

            <div className="flex items-center justify-center gap-2 mt-3 text-[10px] tracking-widest uppercase text-gray-400">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              Secured with SSL Encryption
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable field component
const Field = ({ label, ...props }) => {
  return (
    <div>
      <label className="block text-[10px] tracking-[1.5px] uppercase text-gray-400 mb-1.5">
        {label}
      </label>

      <input
        {...props}
        className="w-full h-9 border border-gray-200 px-3 font-mono text-xs text-black outline-none focus:border-orange-500"
      />
    </div>
  );
};

export default Checkout;
