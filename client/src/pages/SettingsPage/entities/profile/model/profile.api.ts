import { $api } from '@shared/api/instance';
import type { ProfilePayload } from './profile.types';

export async function updateProfile(data: ProfilePayload) {
	const response = await $api.put('/users/me', data);
	return response.data;
}
