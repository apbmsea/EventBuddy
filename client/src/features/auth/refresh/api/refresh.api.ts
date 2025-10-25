import { $api } from '@shared/api/instance';

export async function refresh() {
	const response = await $api.post('/refresh');
	return response.data;
}
