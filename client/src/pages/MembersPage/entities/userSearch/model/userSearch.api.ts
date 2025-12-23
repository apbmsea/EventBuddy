import { $api } from '@shared/api/instance';
import type { User } from '@shared/types/user.type';

export async function searchUser(query: string): Promise<User[]> {
	const response = await $api.get<User[]>(`/users`, {
		params: {
			search: query
		}
	});

	return response.data;
}
