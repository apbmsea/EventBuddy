import { createEnum, type ValueOf } from '@shared/utils/enum';

export const Role = createEnum({
	INDIVIDUAL: 'Для себя',
	COMPANY: 'Для бизнеса'
});

export type Role = ValueOf<typeof Role>;
