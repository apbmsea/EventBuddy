import { $api } from '@shared/api/instance';
import type {
	DeleteMemberPayload,
	InviteMemberPayload,
	UpdateMemberPayload
} from '../../member/model/member.types';

export async function inviteMember({ projectId, email }: InviteMemberPayload) {
	const response = await $api.post(`/projects/${projectId}/members`, email);
	return response.data;
}

export const updateMember = ({
	projectId,
	email,
	data
}: UpdateMemberPayload) => {
	return $api.patch(`/workspaces/${projectId}/members`, {
		email,
		...data
	});
};

export async function deleteMember({ projectId, email }: DeleteMemberPayload) {
	const response = await $api.delete(`/projects/${projectId}/members`, {
		data: email
	});
	return response.data;
}
