export interface Member {
	name: string;
	email: string;
	accesses: 'OWNER' | 'ADMIN' | 'MEMBER' | 'VISITOR';
	tag?: string;
}

export interface InviteMemberPayload {
	projectId: string;
	email: string;
}

export interface UpdateMemberPayload {
	projectId: string;
	email: string;
	data: Partial<Pick<Member, 'accesses' | 'tag'>>;
}

export interface DeleteMemberPayload {
	projectId: string;
	email: string;
}
