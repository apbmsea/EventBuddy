import type { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'typed-redux-saga';
import type { VerifyPayload } from './verify.types';
import { verify } from '../api/verify.api';
import { verifyFailure, verifyRequest, verifySuccess } from './verifySlice';
import { isHandledError } from '@shared/utils/isHandeledError';
import { loginRequest } from '@features/auth/login/model/loginSlice';

function* verifySaga(action: PayloadAction<VerifyPayload>) {
	try {
		const response = yield* call(verify, action.payload);
		yield* put(
			loginRequest({
				email: '',
				password: '',
				token: response.token
			})
		);
		yield* put(verifySuccess());
	} catch (error: unknown) {
		if (isHandledError(error)) {
			yield* put(verifyFailure(error.data.errors));
		} else {
			console.error("Verify error:", error);
		}
	}
}

export function* watchVerify() {
	yield* takeLatest(verifyRequest.type, verifySaga);
}
