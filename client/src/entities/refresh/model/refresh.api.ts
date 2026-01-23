import { $refresh } from '@shared/api/instance';

export async function refresh() {
	const response = await $refresh.post('/auth/refresh');
	return response.data;
}
