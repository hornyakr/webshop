import * as actions from "../constants";

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.USER_REGISTER_REQUEST:
      return { loading: true };
    case actions.USER_REGISTER_SUCCESS:
      return { loading: false, registerInfo: action.payload };
    case actions.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case actions.USER_REGISTER_REMOVE:
      return {};
    default:
      return state;
  }
};

export const userSignInReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.USER_SIGNIN_REQUEST:
      return { loading: true };
    case actions.USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case actions.USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case actions.USER_SIGNIN_SIGNOUT:
      return {};
    default:
      return state;
  }
};
