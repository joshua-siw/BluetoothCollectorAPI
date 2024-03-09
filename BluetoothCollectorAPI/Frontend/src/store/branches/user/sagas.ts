import { AnyAction } from 'redux';
import { put, call, takeLatest, CallEffect, PutEffect, ForkEffect } from 'redux-saga/effects';

import { UserAction } from './interfaces';
import { UserActionType } from './enums';
import { post } from '@utilities/api';

type UserSagaEffect = Generator<CallEffect<any> | PutEffect<UserAction>>;
type UserSagaForkEffect = Generator<ForkEffect<void>>;

export function* getUsersEffect(action: AnyAction): UserSagaEffect {
	try {
		const { pageNumber, pageSize } = action.payload;
		const responseData: any = yield call(post, 'User/GetPagedListUser', { pageNumber, pageSize });
		const data = responseData.data.data;
		const payload = {
			users: data.users,
			pageNumber: data.pageNumber,
			pageSize: data.pageSize,
			totalPages: data.totalPages,
			totalItems: data.totalItems
		};

		yield put({ type: UserActionType.GET_ALL_SUCCESS, payload });
	} catch (error: any) {
		yield put({
			type: UserActionType.GET_ALL_FAILED,
			payload: {
				error
			}
		});
	}
}

export function* getUsersSaga(): UserSagaForkEffect {
	yield takeLatest(UserActionType.GET_ALL_REQUEST, getUsersEffect);
}
