import {
  addToCartStart,
  addToCartSuccess,
  addToCartFailure,
  removeFromCartStart,
  removeFromCartSuccess,
  removeFromCartFailure,
} from "../redux/cart/cartSlice";

export const addToCart = (userId, productId, quantity) => async (dispatch) => {
  try {
    dispatch(addToCartStart());
    const res = await fetch("/server/cart/add-to-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, productId, quantity }),
    });
    const data = await res.json();
    dispatch(addToCartSuccess(data));
  } catch (err) {
    dispatch(addToCartFailure(err.message));
  }
};

export const handleRemovefromCart = (userId, productId) => {
  try {
    dispatch(removeFromCartStart());
    // const res = await fetch
    dispatch(removeFromCartSuccess(productId));
  } catch (err) {
    dispatch(removeFromCartFailure("Failed to remove item from the cart!!!"));
  }
};
