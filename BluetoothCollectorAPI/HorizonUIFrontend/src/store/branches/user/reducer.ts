import { Reducer, AnyAction } from "redux";
import { UserActionType } from "./enums";
import { UserState, UserAction } from "./interfaces";

export const initialState: UserState = {
  error: false,
  loading: true,
  users: [],
};

const userReducer = (
  state: UserState | undefined = initialState,
  { type, payload }: UserAction
): UserState => {
  switch (type) {
    case UserActionType.GET_ALL_REQUEST:
    case UserActionType.GET_BY_ID_REQUEST:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case UserActionType.GET_ALL_FAILED:
    case UserActionType.GET_BY_ID_FAILED:
      return {
        ...state,
        ...payload,
        error: true,
        loading: false,
      };
    case UserActionType.GET_ALL_SUCCESS:
    case UserActionType.GET_BY_ID_SUCCESS:
      return {
        ...state,
        ...payload,
        error: false,
        loading: false,
      };

    default:
      return state;
  }
};

export default userReducer;
