import { $api } from '@shared/api/instance';

export async function getUser() {
	const response = await $api.get('/users/me');
	return response.data;
}

export async function deleteUser() {
	const response = await $api.delete('/users/me');
	return response.data;
}
