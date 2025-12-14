import { call, put, takeLatest } from 'typed-redux-saga';
import { refresh } from '@entities/refresh';
import { refreshFailure, refreshRequest, refreshSuccess } from './refreshSlice';
import { setUser } from '@entities/user';

export function* refreshSaga() {
	try {
		const response = yield* call(refresh);
		const { user, accessToken } = response;
		yield* put(setUser(user));
		yield localStorage.setItem('accessToken', accessToken);
		yield* put(refreshSuccess());
	} catch (error: unknown) {
		console.error('Refresh error:', error);
		yield* put(refreshFailure());
	}
}

export function* watchRefresh() {
	yield* takeLatest(refreshRequest.type, refreshSaga);
}
