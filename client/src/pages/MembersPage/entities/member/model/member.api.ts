import { $api } from '@shared/api/instance';
import type { InviteMemberPayload } from '../../member/model/member.types';

export async function inviteMember({ projectId, email }: InviteMemberPayload) {
	const response = await $api.post(`/projects/${projectId}/members`, email);
	return response.data;
}
