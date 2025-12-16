import { $api } from '@shared/api/instance';
import type { GetProjectsParams, Project } from './project.types';

export async function getProjects(
	params: GetProjectsParams
): Promise<Project[]> {
	const response = await $api.get<Project[]>('/projects', {
		params
	});
	return response.data;
}
