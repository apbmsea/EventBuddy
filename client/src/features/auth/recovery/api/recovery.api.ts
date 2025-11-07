import { $api } from '@shared/api/instance';
import type { RecoveryPayload } from '../model/recovery.types';

export async function recovery(data: RecoveryPayload) {
	const response = await $api.post('/recovery', data);
	return response.data;
}
