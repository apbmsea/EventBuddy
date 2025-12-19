import type { Role } from '@shared/types/role.types';

export interface RegistrationPayload {
	name: string;
	email: string;
	password: string;
	role: Role;
}
