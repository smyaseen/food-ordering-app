/* eslint-disable no-case-declarations */
import { LOGIN_SUCCESS, LOGIN_ERROR, FORGOT_PASSWORD, MESSAGE, LOGOUT_SUCCESS } from '../../redux/ActionTypes';
// { isLoggedIn: false, token: '', name: '' }

const initialAuthState = { isLoggedIn: false, accessToken: '', refreshToken: '', name: '', role: '' };
const initialForgotPasswordState = { message: '', status: 0 };
const initialResponseMessageState = { message: '', status: 0 };

export const authReducer = (state = { isLoggedIn: false, user: {} }, action) => {
  switch (action.type) {
    case LOGOUT_SUCCESS:
      // return { isLoggedIn: '', accessToken: '', refreshToken: '', name: '' };
      return { isLoggedIn: '', user: '' };

    case LOGIN_SUCCESS:
      const { accessToken, refreshToken, name, role, id } = action.payload;

      return {
        ...state,
        isLoggedIn: true,
        accessToken,
        refreshToken,
        name,
        role,
        id,
      };
    case LOGIN_ERROR:
      // return { isLoggedIn: '', accessToken: '', refreshToken: '', name: '' };
      return { isLoggedIn: '', user: '' };

    default:
      return state;
  }
};

export const forgotPassword = (state = { ...initialForgotPasswordState }, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD:
      return {};

    default:
      return state;
  }
};

export const responseMessage = (state = { ...initialResponseMessageState }, action) => {
  switch (action.type) {
    case MESSAGE:
      const { message, status } = action.payload;

      return { ...state, message, status };

    default:
      return state;
  }
};
