import type { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'typed-redux-saga';
import type { LoginPayload } from '@pages/LoginPage/ui/entities/login';
import { login } from '@pages/LoginPage/ui/entities/login';
import { loginFailure, loginRequest, loginSuccess } from './loginSlice';
import { isHandledError } from '@shared/utils/isHandeledError';
import { setUser } from '@entities/user';
import { navigateTo } from '@shared/utils/navigate';

export function* loginSaga(action: PayloadAction<LoginPayload>) {
	try {
		const response = yield* call(login, action.payload);
		const { accessToken, user } = response;
		localStorage.setItem('accessToken', accessToken);
		yield* put(setUser(user));
		yield* put(loginSuccess());
		yield* call(navigateTo, '');
	} catch (error: unknown) {
		if (isHandledError(error)) {
			yield* put(loginFailure(error.data?.errors || {}));
		} else {
			yield* put(loginFailure({}));
			console.error('Login error:', error);
		}
	}
}

export function* watchLogin() {
	yield* takeLatest(loginRequest.type, loginSaga);
}
