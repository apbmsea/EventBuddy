import type { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'typed-redux-saga';
import { isHandledError } from '@shared/utils/isHandeledError';
import {
	notificationSettingsFailure,
	notificationSettingsRequest,
	notificationSettingsSuccess
} from './notificationSettingSlice';
import {
	updateNotificationSettings,
	type NotificationSettingPaload
} from '@pages/SettingsPage/entities/notificationSettings';
import { getUserRequest } from '@features/user';

export function* updateNotificationSettingsSaga(
	action: PayloadAction<NotificationSettingPaload>
) {
	try {
		yield* call(updateNotificationSettings, action.payload);
		yield* put(getUserRequest());
		yield* put(notificationSettingsSuccess());
	} catch (error: unknown) {
		if (isHandledError(error)) {
			yield* put(notificationSettingsFailure(error.data?.errors || {}));
		} else {
			yield* put(notificationSettingsFailure({}));
			console.error('Update Notification Setting error:', error);
		}
	}
}

export function* watchNotificationSettings() {
	yield* takeLatest(
		notificationSettingsRequest.type,
		updateNotificationSettingsSaga
	);
}
