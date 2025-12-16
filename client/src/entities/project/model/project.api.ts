import { $api } from '@shared/api/instance';

export async function getProjects() {
	const response = await $api.get('/projects');
	return response.data;
}
