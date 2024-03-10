import { loginSaga, logoutSaga, localeSaga, passwordResetSaga } from '@store/branches/auth/sagas';
import { getUsersSaga } from '@store/branches/user/sagas';

export default [loginSaga, logoutSaga, localeSaga, passwordResetSaga, getUsersSaga];
