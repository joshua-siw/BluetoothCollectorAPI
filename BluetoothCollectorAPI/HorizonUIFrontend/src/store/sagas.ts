import {
  loginSaga,
  logoutSaga,
  localeSaga,
  passwordResetSaga,
} from "./branches/auth/sagas";
import { getUsersSaga } from "./branches/user/sagas";

export default [
  loginSaga,
  logoutSaga,
  localeSaga,
  passwordResetSaga,
  getUsersSaga,
];
