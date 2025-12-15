import { $api } from '@shared/api/instance';

export async function getUser() {
	const response = await $api.post('/users/me');
	return response.data;
}

export async function deleteUser() {
	const response = await $api.delete('/users/me');
	return response.data;
}
