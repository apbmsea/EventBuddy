import type { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'typed-redux-saga';
import type { LoginPayload } from './login.types';
import { login } from '../api/login.api';
import { loginFailure, loginRequest, loginSuccess } from './loginSlice';
import { isHandledError } from '@shared/utils/isHandeledError';

function* loginSaga(action: PayloadAction<LoginPayload>) {
	try {
		yield* call(login, action.payload);
		yield* put(loginSuccess());
	} catch (error: unknown) {
		if (isHandledError(error)) {
			yield* put(loginFailure(error.data.errors));
		} else {
			console.error('Login error:', error);
		}
	}
}

export function* watchLogin() {
	yield* takeLatest(loginRequest.type, loginSaga);
}
