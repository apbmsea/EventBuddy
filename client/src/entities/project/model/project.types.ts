import type { User } from '@shared/types/user.type';

export interface Project {
	id: string;
	title: string;
	description: string;
	deadline: string;
	owner: User;
	members: User[];
	archived: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface GetProjectsParams {
	search?: string;
}
