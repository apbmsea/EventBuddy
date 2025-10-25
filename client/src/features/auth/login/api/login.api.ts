import { $api } from '@shared/api/instance';
import type { LoginPayload } from '../model/login.types';

export async function login(data: LoginPayload) {
	if (data.authToken) {
		const response = await $api.post('/login', null, {
			params: {
				token: data.authToken
			}
		});
		return response.data;
	} else {
		const response = await $api.post('/login', data);
		return response.data;
	}
}
