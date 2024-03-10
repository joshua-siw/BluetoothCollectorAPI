// Import necessary dependencies and types
import { Reducer, combineReducers } from "redux";
import auth from "./branches/auth/reducer";
import user from "./branches/user/reducer";
import { AuthState, AuthAction } from "./branches/auth/interfaces";
import { UserState, UserAction } from "./branches/user/interfaces";

const RootReducer = (): Reducer =>
  combineReducers({
    auth,
    user,
  });
export default RootReducer;
