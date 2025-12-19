import { $api } from '@shared/api/instance';
import type { CreateProjectPayload } from './projectCreate.types';

export async function createProject(data: CreateProjectPayload) {
	const response = await $api.post(`/projects/`, data);
	return response.data;
}
