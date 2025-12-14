import type { Role } from "@shared/types/role.types";

export interface RegistrationPayload {
	email: string;
	password: string;
	role: Role;
}