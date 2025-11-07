import type { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'typed-redux-saga';
import type { RecoveryPayload } from './recovery.types';
import { recovery } from '../api/recovery.api';
import {
	recoveryFailure,
	recoveryRequest,
	recoverySuccess
} from './recoverySlice';
import { isHandledError } from '@shared/utils/isHandeledError';
import { setVerifyEmail } from '@features/auth/verify';
import { navigateTo } from '@shared/utils/navigate';

function* recoverySaga(action: PayloadAction<RecoveryPayload>) {
	try {
		yield* call(recovery, action.payload);
		yield* put(recoverySuccess());
		yield* put(setVerifyEmail(action.payload.email));
		yield* call(navigateTo, '/verify');
	} catch (error: unknown) {
		if (isHandledError(error)) {
			yield* put(recoveryFailure(error.data.errors));
		} else {
			console.error('Recovery error:', error);
		}
	}
}

export function* watchRecovery() {
	yield* takeLatest(recoveryRequest.type, recoverySaga);
}
