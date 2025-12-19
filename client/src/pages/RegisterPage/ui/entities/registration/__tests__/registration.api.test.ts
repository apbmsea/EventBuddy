import { registration } from '../model/registration.api';
import { $api } from '@shared/api/instance';
import { Role } from '@shared/types/role.types';
import type { RegistrationPayload } from '../model/registration.types';

jest.mock('@shared/api/instance', () => ({
	$api: {
		post: jest.fn()
	}
}));

describe('registration API', () => {
	const payload: RegistrationPayload = {
		name: 'ilya',
		email: 'test@example.com',
		password: 'password123',
		role: Role.INDIVIDUAL
	};

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('должен отправить POST запрос на /register', async () => {
		const mockResponse = { data: { message: 'Registration successful' } };
		jest.mocked($api.post).mockResolvedValue(mockResponse);

		const result = await registration(payload);

		expect($api.post).toHaveBeenCalledWith('/register', payload);
		expect(result).toEqual(mockResponse.data);
	});

	it('должен пробросить ошибку при неудачном запросе', async () => {
		const mockError = new Error('Network error');
		jest.mocked($api.post).mockRejectedValue(mockError);

		await expect(registration(payload)).rejects.toThrow('Network error');
	});
});
