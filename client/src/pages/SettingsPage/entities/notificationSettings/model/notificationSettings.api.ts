import { $api } from '@shared/api/instance';
import type { NotificationSettingPaload } from './notificationSettings.types';

export async function updateNotificationSettings(
	data: NotificationSettingPaload
) {
	const response = await $api.put('/users/me/settings/notification', data);
	return response.data;
}
