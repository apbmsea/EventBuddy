import { $api } from '@shared/api/instance';

export async function refresh() {
	const response = await $api.post('/auth/refresh');
	return response.data;
}
