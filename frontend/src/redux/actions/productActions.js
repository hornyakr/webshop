import Axios from "axios";
import * as actions from "../constants";

export const listProducts = () => async (dispatch) => {
  dispatch({ type: actions.PRODUCT_LIST_REQUEST });
  try {
    const { data } = await Axios.get("/api/products");
    dispatch({ type: actions.PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: actions.PRODUCT_LIST_FAIL, payload: error.message });
  }
};

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: actions.PRODUCT_DETAILS_REQUEST, payload: productId });
  try {
    const { data } = await Axios.get(`/api/products/${productId}`);
    dispatch({ type: actions.PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actions.PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
