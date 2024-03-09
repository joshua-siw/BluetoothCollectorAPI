import { Reducer, combineReducers } from 'redux';

import auth from '@store/branches/auth/reducer';
import user from '@store/branches/user/reducer';

export default (): Reducer =>
	combineReducers({
		auth,
		user
	});
