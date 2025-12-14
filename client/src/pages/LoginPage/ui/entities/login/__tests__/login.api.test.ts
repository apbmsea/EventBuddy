import { login } from '../model/login.api';
import { $api } from '@shared/api/instance';
import type { LoginPayload } from '../model/login.types';
import { Role } from '@shared/types/role.types';

jest.mock('@shared/api/instance', () => ({
	$api: {
		post: jest.fn()
	}
}));

describe('login API', () => {
	const payload: LoginPayload = {
		email: 'test@example.com',
		password: 'password123'
	};

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('должен отправить POST запрос на /auth/login', async () => {
		const mockResponse = {
			data: {
				accessToken: 'token123',
				user: { email: 'test@example.com', role: Role.INDIVIDUAL }
			}
		};
		jest.mocked($api.post).mockResolvedValue(mockResponse);

		const result = await login(payload);

		expect($api.post).toHaveBeenCalledWith('/auth/login', payload);
		expect(result).toEqual(mockResponse.data);
	});

	it('должен пробросить ошибку при неудачном запросе', async () => {
		const mockError = new Error('Network error');
		jest.mocked($api.post).mockRejectedValue(mockError);

		await expect(login(payload)).rejects.toThrow('Network error');
	});
});
