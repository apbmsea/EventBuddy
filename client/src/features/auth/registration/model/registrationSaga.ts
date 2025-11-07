import type { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'typed-redux-saga';
import type { RegistrationPayload } from './registration.types';
import { registration } from '../api/registration.api';

import {
	registrationFailure,
	registrationRequest,
	registrationSuccess
} from './registrationSlice';
import { isHandledError } from '@shared/utils/isHandeledError';
import { setVerifyEmail } from '@features/auth/verify';
import { navigateTo } from '@shared/utils/navigate';

function* registrationSaga(action: PayloadAction<RegistrationPayload>) {
	try {
		yield* call(registration, action.payload);
		yield* put(registrationSuccess());
		yield* put(setVerifyEmail(action.payload.email));
		yield* call(navigateTo, '/auth/verify');
	} catch (error: unknown) {
		if (isHandledError(error)) {
			yield* put(registrationFailure(error.data.errors));
		} else {
			yield* put(registrationFailure({}));
			console.error('Registration error:', error);
		}
	}
}

export function* watchRegistration() {
	yield* takeLatest(registrationRequest.type, registrationSaga);
}
