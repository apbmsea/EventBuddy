import { $api } from '@shared/api/instance';
import type { Member } from '../../member/model/member.types';

export async function getMembers(projectId: string): Promise<Member[]> {
	const response = await $api.get<Member[]>(`/projects/${projectId}/members`);
	return response.data;
}
