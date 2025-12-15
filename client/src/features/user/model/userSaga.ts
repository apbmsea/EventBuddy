import type { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'typed-redux-saga';
import { isHandledError } from '@shared/utils/isHandeledError';
import { deleteUser, getUser, updateUser } from '@entities/user/model/user.api';
import {
	deleteUserFailure,
	deleteUserRequest,
	deleteUserSuccess,
	getUserFailure,
	getUserRequest,
	getUserSuccess,
	updateUserFailure,
	updateUserRequest,
	updateUserSuccess
} from './userSlice';
import type { User } from '@entities/user';
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

export function* updateUserSaga(action: PayloadAction<User>) {
	try {
		yield* call(updateUser, action.payload);
		yield* put(updateUserSuccess());
		yield* put(getUserRequest());
	} catch (error: unknown) {
		if (isHandledError(error)) {
			yield* put(updateUserFailure(error.data?.errors || {}));
		} else {
			yield* put(updateUserFailure({}));
			console.error('Update User error:', error);
		}
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
	yield* takeLatest(updateUserRequest.type, updateUserSaga);
	yield* takeLatest(deleteUserRequest.type, deleteUserSaga);
}
