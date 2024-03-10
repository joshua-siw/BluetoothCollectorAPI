// Import necessary dependencies and types
import { Reducer, combineReducers } from "redux";
import authReducer from "./branches/auth/reducer";
import userReducer from "./branches/user/reducer";
import { AuthState, AuthAction } from "./branches/auth/interfaces";
import { UserState, UserAction } from "./branches/user/interfaces";

const RootReducer = (): Reducer =>
  combineReducers({
    authReducer,
    userReducer,
  });
export default RootReducer;
