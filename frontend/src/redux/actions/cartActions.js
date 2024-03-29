import Axios from "axios";
import * as actions from "../constants";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/products/${productId}`);
  dispatch({
    type: actions.CART_ADD_ITEM,
    payload: {
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      product: data._id,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => async (dispatch, getState) => {
  dispatch({ type: actions.CART_REMOVE_ITEM, payload: productId });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => async (dispatch) => {
  dispatch({
    type: actions.CART_SAVE_SHIPPING_ADDRESS,
    payload: {
      fullName: data.fullName,
      address: data.address,
      city: data.city,
      postalCode: data.postalCode,
      country: data.country,
    },
  });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => async (dispatch) => {
  dispatch({
    type: actions.CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });
};
