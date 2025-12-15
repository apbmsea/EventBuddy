import { getUser } from '../model/user.api';
import { $api } from '@shared/api/instance';

jest.mock('@shared/api/instance', () => ({
	$api: {
		post: jest.fn()
	}
}));

describe('user API', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('getUser', () => {
		it('должен отправить POST запрос на /users/me', async () => {
			const mockResponse = { data: { email: 'test@example.com' } };
			jest.mocked($api.post).mockResolvedValue(mockResponse);

			const result = await getUser();

			expect($api.post).toHaveBeenCalledWith('/users/me');
			expect(result).toEqual(mockResponse.data);
		});

		it('должен пробросить ошибку при неудачном запросе', async () => {
			const mockError = new Error('Network error');
			jest.mocked($api.post).mockRejectedValue(mockError);

			await expect(getUser()).rejects.toThrow('Network error');
		});
	});
});
