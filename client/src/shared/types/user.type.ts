import type { Role } from '@shared/types/role.types';

export interface User {
	id: string;
	email: string;
	password?: string;
	name: string;
	avatarUrl?: string;
	role: Role;
}
