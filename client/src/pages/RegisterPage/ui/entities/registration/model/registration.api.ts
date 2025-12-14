import { $api } from '@shared/api/instance';
import type { RegistrationPayload } from '../model/registration.types';

export async function registration(data: RegistrationPayload) {
	const response = await $api.post('/register', data);
	return response.data;
}