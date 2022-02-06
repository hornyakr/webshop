import * as actions from "../constants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case actions.CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case actions.CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case actions.CART_REMOVE_ALL:
      return {
        ...state,
        cartItems: [],
      };
    case actions.CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case actions.CART_REMOVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: null,
      };
    case actions.CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
