import { call, put, takeLatest } from 'typed-redux-saga';
import { deleteUser, getUser } from '@entities/user/model/user.api';
import {
	deleteUserFailure,
	deleteUserRequest,
	deleteUserSuccess,
	getUserFailure,
	getUserRequest,
	getUserSuccess
} from './userSlice';
import { logoutRequest } from '@features/logout';

export function* getUserSaga() {
	try {
		const response = yield* call(getUser);
		yield* put(getUserSuccess(response));
	} catch (error: unknown) {
		yield* put(getUserFailure());
		console.error('Get User error:', error);
	}
}

export function* deleteUserSaga() {
	try {
		yield* call(deleteUser);
		yield* put(deleteUserSuccess());
		yield* put(logoutRequest());
	} catch (error: unknown) {
		yield* put(deleteUserFailure());
		console.error('Delete User error:', error);
	}
}

export function* watchUser() {
	yield* takeLatest(getUserRequest.type, getUserSaga);
	yield* takeLatest(deleteUserRequest.type, deleteUserSaga);
}
