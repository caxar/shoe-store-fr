import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "cart",
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addCartItems: (state, action) => {
      const items = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (items) {
        items.quanity++;
        items.attributes.price = items.quantityPrice * items.quanity;
      } else {
        state.cartItems.push({ ...action.payload, quanity: 1 });
      }
    },
    updateCartItems: (state, action) => {
      state.cartItems = state.cartItems.map((p) => {
        if (p.id === action.payload.id) {
          if (action.payload.key === "quantity") {
            p.attributes.price = p.quantityPrice * action.payload.val;
          }
          return { ...p, [action.payload.key]: action.payload.val };
        }
        return p;
      });
    },
    removeCartItems: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (p) => p.id !== action.payload.id
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCartItems, updateCartItems, removeCartItems } =
  cartSlice.actions;

export default cartSlice.reducer;
