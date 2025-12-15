import type { Role } from '@shared/types/role.types';

export interface User {
	email: string;
	password?: string;
	name?: string;
	description?: string;
	role: Role;
}
