import { $api } from '@shared/api/instance';

export async function logout() {
	await $api.post('/logout');
}
