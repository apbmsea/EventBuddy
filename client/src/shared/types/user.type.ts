import type { Role } from '@shared/types/role.types';

export interface User {
	id: string;
	email: string;
	password?: string;
	name: string;
	avatarUrl?: string;
	role: Role;
	settings?: {
		notifications: {
			system: {
				enabled: boolean;
				view: 'TOP' | 'BOTTOM';
				duration: number;
				autoClear: boolean;
				maxVisible: number;
			};
		};
	};
}
