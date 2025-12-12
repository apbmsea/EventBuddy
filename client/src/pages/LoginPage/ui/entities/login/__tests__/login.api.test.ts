import { $api } from '@shared/api/instance';
import { login } from '../model/login.api';
import type { LoginPayload } from '../model/login.types';
import { Role } from '@shared/types/role.types';

jest.mock('@shared/api/instance', () => ({
	$api: {
		post: jest.fn()
	}
}));

const mockApi = jest.mocked($api);

describe('login api', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	const mockLoginPayload: LoginPayload = {
		email: 'test@example.com',
		password: 'password123'
	};

	const mockResponse = {
		data: {
			accessToken: 'abc123',
			user: {
				email: 'test@example.com',
				role: Role.INDIVIDUAL
			}
		}
	};

	it('должен успешно выполнить вход', async () => {
		mockApi.post.mockResolvedValue(mockResponse);

		const result = await login(mockLoginPayload);

		expect(mockApi.post).toHaveBeenCalledWith(
			'/auth/login',
			mockLoginPayload
		);
		expect(mockApi.post).toHaveBeenCalledTimes(1);
		expect(result).toEqual(mockResponse.data);
	});

	it('должен выбросить ошибку при неудачном запросе', async () => {
		const error = new Error('Ошибка сети');
		mockApi.post.mockRejectedValue(error);

		await expect(login(mockLoginPayload)).rejects.toThrow('Ошибка сети');
		expect(mockApi.post).toHaveBeenCalledWith(
			'/auth/login',
			mockLoginPayload
		);
	});

	it('должен передать правильные данные в API', async () => {
		mockApi.post.mockResolvedValue(mockResponse);

		await login(mockLoginPayload);

		expect(mockApi.post).toHaveBeenCalledWith(
			'/auth/login',
			expect.objectContaining({
				email: expect.any(String),
				password: expect.any(String)
			})
		);
	});
});
