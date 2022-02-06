import * as actions from "../constants";

export const productListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case actions.PRODUCT_LIST_REQUEST:
      return { loading: true };
    case actions.PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case actions.PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { loading: true, product: {} },
  action
) => {
  switch (action.type) {
    case actions.PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case actions.PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case actions.PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
