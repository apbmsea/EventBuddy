import type { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'typed-redux-saga';
import type { RegistrationPayload } from '@pages/RegisterPage/ui/entities/registration';
import { registration } from '@pages/RegisterPage/ui/entities/registration';

import {
	registrationFailure,
	registrationRequest,
	registrationSuccess
} from './registrationSlice';
import { isHandledError } from '@shared/utils/isHandeledError';
import { navigateTo } from '@shared/utils/navigate';

export function* registrationSaga(action: PayloadAction<RegistrationPayload>) {
	try {
		yield* call(registration, action.payload);
		yield* put(registrationSuccess());
		yield* call(navigateTo, '/auth/verify');
	} catch (error: unknown) {
		if (isHandledError(error)) {
			yield* put(registrationFailure(error.data?.errors || {}));
		} else {
			yield* put(registrationFailure({}));
			console.error('Registration error:', error);
		}
	}
}

export function* watchRegistration() {
	yield* takeLatest(registrationRequest.type, registrationSaga);
}
