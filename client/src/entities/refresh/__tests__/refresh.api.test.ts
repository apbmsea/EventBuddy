import { refresh } from '../model/refresh.api';
import { $api } from '@shared/api/instance';

jest.mock('@shared/api/instance', () => ({
	$api: {
		post: jest.fn()
	}
}));

describe('refresh API', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('должен отправить POST запрос на /auth/refresh', async () => {
		const mockResponse = {
			data: {
				accessToken: 'new-token',
				user: { id: 1, email: 'test@example.com' }
			}
		};
		jest.mocked($api.post).mockResolvedValue(mockResponse);

		const result = await refresh();

		expect($api.post).toHaveBeenCalledWith('/auth/refresh');
		expect(result).toEqual(mockResponse.data);
	});

	it('должен пробросить ошибку при неудачном запросе', async () => {
		const mockError = new Error('Network error');
		jest.mocked($api.post).mockRejectedValue(mockError);

		await expect(refresh()).rejects.toThrow('Network error');
	});
});
