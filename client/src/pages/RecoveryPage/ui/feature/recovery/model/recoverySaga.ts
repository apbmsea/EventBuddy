import type { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'typed-redux-saga';
import type { RecoveryPayload } from '@pages/RecoveryPage/ui/entities/recovery';
import { recovery } from '@pages/RecoveryPage/ui/entities/recovery';
import {
	recoveryFailure,
	recoveryRequest,
	recoverySuccess
} from './recoverySlice';
import { isHandledError } from '@shared/utils/isHandeledError';
import { setVerifyEmail } from '@pages/VerifyPage/ui/feature/verify/model/verifySlice';
import { navigateTo } from '@shared/utils/navigate';

export function* recoverySaga(action: PayloadAction<RecoveryPayload>) {
	try {
		yield* call(recovery, action.payload);
		yield* put(recoverySuccess());
		yield* put(setVerifyEmail(action.payload.email));
		yield* call(navigateTo, '/verify');
	} catch (error: unknown) {
		if (isHandledError(error)) {
			yield* put(recoveryFailure(error.data?.errors || {}));
		} else {
			yield* put(recoveryFailure({}));
			console.error('Recovery error:', error);
		}
	}
}

export function* watchRecovery() {
	yield* takeLatest(recoveryRequest.type, recoverySaga);
}
