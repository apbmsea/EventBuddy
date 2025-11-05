import { $api } from '@shared/api/instance';
import type { LoginPayload } from '../model/login.types';

export async function login(data: LoginPayload) {
	if (data.token) {
		const response = await $api.post(
			'/auto-login',
			{ email: '', password: '' },
			{
				params: {
					token: data.token
				}
			}
		);
		return response.data;
	} else {
		const response = await $api.post('/login', data);
		return response.data;
	}
}
