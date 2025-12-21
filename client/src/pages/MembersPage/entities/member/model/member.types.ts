export interface Member {
	name: string;
	email: string;
	accesses: 'OWNER' | 'ADMIN' | 'MEMBER' | 'VISITOR' | 'INVITE';
	tag?: string;
}

export interface InviteMemberPayload {
	projectId: string;
	email: string;
}
