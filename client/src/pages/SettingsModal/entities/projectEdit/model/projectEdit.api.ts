import type { Project } from '@entities/project';
import { $api } from '@shared/api/instance';

export async function editProject(id: string, data: Project) {
	const response = await $api.put(`/projects/${id}`, data);
	return response.data;
}
