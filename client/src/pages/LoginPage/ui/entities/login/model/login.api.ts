import { $api } from '@shared/api/instance';
import type { LoginPayload } from '../model/login.types';

export async function login(data: LoginPayload) {
	const response = await $api.post('/auth/login', data);
	return response.data;
}
