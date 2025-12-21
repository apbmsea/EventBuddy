export interface Member {
	name: string;
	email: string;
	accesses: 'OWNER' | 'ADMIN' | 'MEMBER' | 'VISITOR' | 'INVITE';
	tag?: string;
}
