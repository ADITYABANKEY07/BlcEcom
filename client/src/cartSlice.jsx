import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "myCart",
  initialState: {
    cart: [],
  },

  reducers: {
    // ✅ ADD TO CART
    addToCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        alert("Product already added to cart");
      } else {
        state.cart.push({
          ...action.payload,
          qty: 1, // 🔥 IMPORTANT FIX
        });
      }
    },

    // ✅ INCREASE
    qntInc: (state, action) => {
      const item = state.cart.find(
        (item) => item._id === action.payload.id
      );

      if (item) {
        item.qty = (item.qty || 0) + 1; // 🔥 SAFE FIX
      }
    },

    // ✅ DECREASE
    qntDec: (state, action) => {
      const item = state.cart.find(
        (item) => item._id === action.payload.id
      );

      if (item && item.qty > 1) {
        item.qty -= 1;
      }
    },

    // ✅ REMOVE
    removeCart: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item._id !== action.payload.id // 🔥 FIXED
      );
    },
  },
});

export const { addToCart, qntInc, qntDec, removeCart } = cartSlice.actions;
export default cartSlice.reducer;