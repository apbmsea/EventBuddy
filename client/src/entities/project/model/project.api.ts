import { $api } from '@shared/api/instance';

export async function getProject(id: string) {
	const response = await $api.get(`/projects/${id}`);
	return response.data;
}
