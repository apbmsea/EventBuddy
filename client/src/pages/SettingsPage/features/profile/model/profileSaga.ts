import type { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'typed-redux-saga';
import { isHandledError } from '@shared/utils/isHandeledError';
import { updateProfile } from '@pages/SettingsPage/entities/profile/model/profile.api';
import { profileFailure, profileRequest, profileSuccess } from './profileSlice';
import { getUserRequest } from '@features/user';
import type { ProfilePayload } from '@pages/SettingsPage/entities/profile/model/profile.types';

export function* updateProfileSaga(action: PayloadAction<ProfilePayload>) {
	try {
		yield* call(updateProfile, action.payload);
		yield* put(profileSuccess());
		yield* put(getUserRequest());
	} catch (error: unknown) {
		if (isHandledError(error)) {
			yield* put(profileFailure(error.data?.errors || {}));
		} else {
			yield* put(profileFailure({}));
			console.error('Update Profile error:', error);
		}
	}
}

export function* watchProfile() {
	yield* takeLatest(profileRequest.type, updateProfileSaga);
}
