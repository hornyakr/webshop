import Axios from "axios";
import * as actions from "../constants";

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: actions.ORDER_CREATE_REQUEST, payload: order });
  try {
    const {
      userSignIn: { userInfo },
    } = getState();
    const { data } = await Axios.post("/api/orders", order, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: actions.ORDER_CREATE_SUCCESS, payload: data.order });
    dispatch({ type: actions.CART_REMOVE_ALL });
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: actions.ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: actions.ORDER_DETAILS_REQUEST, payload: orderId });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: actions.ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actions.ORDER_DETAILS_FAIL, payload: message });
  }
};
