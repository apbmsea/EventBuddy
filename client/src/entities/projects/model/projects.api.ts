import { $api } from '@shared/api/instance';
import type { GetProjectsParams } from './projects.types';
import type { Project } from '@entities/project/model/project.types';

export async function getProjects(
	params: GetProjectsParams
): Promise<Project[]> {
	const response = await $api.get<Project[]>('/projects', {
		params
	});
	return response.data;
}
