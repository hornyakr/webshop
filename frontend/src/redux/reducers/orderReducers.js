import * as actions from "../constants";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.ORDER_CREATE_REQUEST:
      return { loading: true };
    case actions.ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case actions.ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case actions.ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { loading: true, order: {} },
  action
) => {
  switch (action.type) {
    case actions.ORDER_DETAILS_REQUEST:
      return { loading: true };
    case actions.ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case actions.ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
