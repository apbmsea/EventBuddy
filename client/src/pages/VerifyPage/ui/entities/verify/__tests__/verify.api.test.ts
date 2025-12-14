import { verify } from '../model/verify.api';
import { $api } from '@shared/api/instance';
import type { VerifyPayload } from '../model/verify.types';

jest.mock('@shared/api/instance', () => ({
	$api: {
		post: jest.fn()
	}
}));

describe('verify API', () => {
	const payload: VerifyPayload = {
		email: 'test@example.com',
		code: 123456
	};

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('должен отправить POST запрос на /auth/verify', async () => {
		const mockResponse = { data: { token: 'verify-token' } };
		jest.mocked($api.post).mockResolvedValue(mockResponse);

		const result = await verify(payload);

		expect($api.post).toHaveBeenCalledWith('/auth/verify', payload);
		expect(result).toEqual(mockResponse.data);
	});

	it('должен пробросить ошибку при неудачном запросе', async () => {
		const mockError = new Error('Network error');
		jest.mocked($api.post).mockRejectedValue(mockError);

		await expect(verify(payload)).rejects.toThrow('Network error');
	});
});
