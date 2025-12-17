import { $api } from '@shared/api/instance';
import type { User } from '@shared/types/user.type';

export async function updateProfile(data: User) {
	const response = await $api.put('/users/me', data);
	return response.data;
}
