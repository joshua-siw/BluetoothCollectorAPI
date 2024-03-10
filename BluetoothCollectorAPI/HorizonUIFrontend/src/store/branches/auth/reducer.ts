import { Reducer, AnyAction } from "redux";
import { AuthState, AuthAction } from "./interfaces";
import { Role } from "../user/interfaces";
import { AuthActionType } from "./enums";
import {
  TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  TOKEN_THRESHOLD_KEY,
} from "../../../utilities";

export const initialState: AuthState = {
  token: localStorage.getItem(TOKEN_KEY) || "",
  locale: "en",
  loading: false,
  threshold: Number(localStorage.getItem(TOKEN_THRESHOLD_KEY)) || 0,
  loginError: "",
  logoutError: "",
  signupError: "",
  refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY) || "",
  passwordResetError: "",
  role: [Role.User],
};

const authReducer = (
  state: AuthState | undefined = initialState, // Set default value to initialState
  { type, payload }: AuthAction
): AuthState => {
  switch (type) {
    case AuthActionType.LOGIN_REQUEST:
    case AuthActionType.LOGOUT_REQUEST:
    case AuthActionType.SIGNUP_REQUEST:
    case AuthActionType.SET_LOCALE_REQUEST:
    case AuthActionType.PASSWORD_RESET_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AuthActionType.LOGIN_FAILED:
    case AuthActionType.LOGOUT_FAILED:
    case AuthActionType.SIGNUP_FAILED:
    case AuthActionType.SET_LOCALE_FAILED:
    case AuthActionType.PASSWORD_RESET_FAILED:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case AuthActionType.LOGIN_SUCCESS:
    case AuthActionType.LOGOUT_SUCCESS:
    case AuthActionType.SIGNUP_SUCCESS:
    case AuthActionType.SET_LOCALE_SUCCESS:
    case AuthActionType.PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case AuthActionType.RESET_AUTH:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
