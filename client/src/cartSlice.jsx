import { createSlice } from "@reduxjs/toolkit";

const getCartFromStorage = () => {
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
};

const cartSlice = createSlice({
  name: "myCart",
  initialState: {
    cart: getCartFromStorage(),
  },

  reducers: {
    // ✅ ADD TO CART
    addToCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item._id === action.payload._id,
      );

      if (existingItem) {
        alert("Product already added to cart");
      } else {
        state.cart.push({
          ...action.payload,
          qty: 1, // 🔥 IMPORTANT FIX
        });
      }
      localStorage.setItem("cart", JSON.stringify(state.cart)); // ✅ SAVE
      // if (!existingItem) {
      //   state.cart.push({
      //     ...action.payload,
      //     qty: 1,
      //   })
      // }
    },

    // ✅ INCREASE
    qntInc: (state, action) => {
      const item = state.cart.find((item) => item._id === action.payload.id);

      if (item) {
        item.qty = (item.qty || 0) + 1; // 🔥 SAFE FIX
      }
      localStorage.setItem("cart", JSON.stringify(state.cart)); // ✅ SAVE
    },

    // ✅ DECREASE
    qntDec: (state, action) => {
      const item = state.cart.find((item) => item._id === action.payload.id);

      if (item && item.qty > 1) {
        item.qty -= 1;
      }
      localStorage.setItem("cart", JSON.stringify(state.cart)); // ✅ SAVE
    },

    // ✅ REMOVE
    removeCart: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item._id !== action.payload.id, // 🔥 FIXED
      );
      localStorage.setItem("cart", JSON.stringify(state.cart)); // ✅ SAVE
    },
        // ✅ CLEAR CART
clearCart: (state) => {
  state.cart = [];

  localStorage.removeItem("cart");
},
  },
});

export const { addToCart, qntInc, qntDec, removeCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
