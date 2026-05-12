import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { qntInc, qntDec, removeCart } from "../cartSlice";
import { useNavigate } from "react-router-dom";

const AddToCart = () => {
  const cartData = useSelector((state) => state.mycart.cart);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const subtotal = cartData.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  return (
    <div className="min-h-screen bg-white font-mono px-6 py-10">
      {/* Header */}
      <div className="flex items-baseline gap-4 border-b border-gray-200 pb-4 mb-8">
        <h1 className="text-5xl font-black uppercase tracking-widest text-black">
          Your Cart
        </h1>
        <span className="text-xs tracking-widest text-gray-400 uppercase">
          {cartData.length} Item{cartData.length !== 1 ? "s" : ""}
        </span>
      </div>

      {cartData.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-14 h-14 bg-orange-500 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <p className="text-2xl font-black uppercase tracking-widest text-gray-300">
            Cart is Empty
          </p>
          <p className="text-xs tracking-widest text-gray-300 uppercase">
            Add some items to get started
          </p>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto border border-gray-200">
            <table className="w-full min-w-[750px] border-collapse">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {[
                    "#",
                    "Title",
                    "Brand",
                    "Model",
                    "Category",
                    "Price",
                    "Quantity",
                    "Total",
                    "",
                  ].map((h, i) => (
                    <th
                      key={i}
                      className="text-left text-[10px] tracking-[2px] uppercase text-gray-400 font-medium px-4 py-3 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {cartData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
                  >
                    {/* Image */}
                    <td className="px-4 py-3">
                      <img
                        src={item.defaultImage}
                        alt={item.title}
                        className="w-14 h-14 object-cover border border-gray-200 bg-gray-100"
                      />
                    </td>

                    {/* Title */}
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-black">
                        {item.title}
                      </span>
                    </td>

                    {/* Brand */}
                    <td className="px-4 py-3">
                      <span className="text-[10px] tracking-widest uppercase px-2 py-1 bg-gray-100 border border-gray-200 text-gray-500">
                        {item.brand}
                      </span>
                    </td>

                    {/* Model */}
                    <td className="px-4 py-3 text-xs tracking-wider text-gray-400">
                      {item.model}
                    </td>

                    {/* Category */}
                    <td className="px-4 py-3">
                      <span className="text-[10px] tracking-widest uppercase px-2 py-1 bg-gray-100 border border-gray-200 text-gray-500">
                        {item.category}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-sm font-medium text-black">
                      {Number(item.price).toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </td>

                    {/* Quantity Controls */}
                    <td className="px-4 py-3">
                      <div className="flex items-center border border-gray-200 w-fit">
                        <button
                          onClick={() => dispatch(qntDec({ id: item._id }))}
                          className="w-8 h-8 bg-gray-100 text-gray-600 cursor-pointer text-lg flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors duration-150"
                        >
                          −
                        </button>
                        <span className="w-9 h-8 flex items-center justify-center text-sm text-black border-x border-gray-200 bg-white">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => dispatch(qntInc({ id: item._id }))}
                          className="w-8 h-8 bg-gray-100 text-gray-600 cursor-pointer text-lg flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors duration-150"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    {/* Total */}
                    <td className="px-4 py-3 text-sm font-semibold text-black">
                      {Number(item.price * item.qty).toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </td>

                    {/* Remove */}
                    <td className="px-4 py-3">
                      <button
                        onClick={() => dispatch(removeCart({ id: item._id }))}
                        className="text-[10px] cursor-pointer tracking-widest uppercase px-3 py-1 border border-gray-200 text-gray-400 hover:border-orange-500 hover:text-orange-500 transition-colors duration-150"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Summary */}
          <div className="flex justify-end mt-8">
            <div className="border border-gray-200 bg-gray-50 p-6 min-w-[280px]">
              <div className="flex justify-between text-[11px] tracking-widest uppercase text-gray-400 py-2">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[11px] tracking-widest uppercase text-gray-400 py-2">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-sm font-semibold tracking-widest uppercase text-black py-3 border-t border-gray-200 mt-2">
                <span>Total</span>
                <span>
                  {Number(subtotal).toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </span>{" "}
              </div>
              <button
                onClick={() => {
                  const token = localStorage.getItem("token");

                  if (!token) {
                    // ✅ SAVE WHERE USER WANTS TO GO
                    localStorage.setItem("redirectAfterLogin", "/checkout");

                    // ✅ GO LOGIN
                    navigate("/login");
                  } else {
                    navigate("/checkout");
                  }
                }}
                className="w-full mt-4 px-2 py-3 cursor-pointer bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-lg font-black uppercase tracking-widest transition-all duration-150"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AddToCart;
