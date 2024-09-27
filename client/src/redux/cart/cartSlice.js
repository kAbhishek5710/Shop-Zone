import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  wishlistItems: [],
  loading: false,
  error: null,
};

const cartWishlistSlice = createSlice({
  name: "cartWishlist",
  initialState,
  reducers: {
    addToCartStart: (state) => {
      state.loading = true;
    },
    addToCartSuccess: (state, action) => {
      state.cartItems.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    addToCartFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeFromCartStart: (state) => {
      state.loading = true;
    },
    removeFromCartSuccess: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload
      );
      state.loading = false;
    },
    removeFromCartFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addToCartStart,
  addToCartSuccess,
  addToCartFailure,
  removeFromCartStart,
  removeFromCartFailure,
  removeFromCartSuccess,
} = cartWishlistSlice.actions;

export default cartWishlistSlice.reducer;
