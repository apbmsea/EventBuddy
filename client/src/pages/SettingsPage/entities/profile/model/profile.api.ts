import { $api } from '@shared/api/instance';
import type { User } from '@entities/user';

export async function updateProfile(data: User) {
	const response = await $api.put('/users/me', data);
	return response.data;
}
