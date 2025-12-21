import { $api } from '@shared/api/instance';
import type { Member } from '../../member/model/member.types';

interface GetMembersParams {
	projectId: string;
	search: string;
	sort: string;
}

export async function getMembers({
	projectId,
	search,
	sort
}: GetMembersParams): Promise<Member[]> {
	const response = await $api.get<Member[]>(
		`/projects/${projectId}/members`,
		{
			params: { search, sort }
		}
	);

	return response.data;
}
