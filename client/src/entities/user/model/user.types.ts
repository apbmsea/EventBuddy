import type { Role } from "@shared/types/role.types";

export interface User {
	email: string;
	role: Role;
}
