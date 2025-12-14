import { call, put, takeLatest } from 'typed-redux-saga';
import { logout } from '@entities/logout';
import { logoutFailure, logoutRequest, logoutSuccess } from './logoutSlice';

export function* logoutSaga() {
	try {
		yield* call(logout);
		localStorage.removeItem('accessToken');
		yield* put(logoutSuccess());
	} catch (error: unknown) {
		console.error('Logout error:', error);
		yield* put(logoutFailure());
	}
}

export function* watchLogout() {
	yield* takeLatest(logoutRequest.type, logoutSaga);
}
