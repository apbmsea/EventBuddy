import type { Role } from '@shared/types/role.types';

export interface ProfilePayload {
	name: string;
	email: string;
	password: string;
	role: Role;
}
