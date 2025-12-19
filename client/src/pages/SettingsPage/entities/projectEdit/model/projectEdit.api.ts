import { $api } from '@shared/api/instance';
import type { EditProjectPayload } from './projectEdit.types';

export async function editProject(id: string, data: EditProjectPayload) {
	const response = await $api.put(`/projects/${id}`, data);
	return response.data;
}
