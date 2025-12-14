import { logout } from '../model/logout.api';
import { $api } from '@shared/api/instance';

jest.mock('@shared/api/instance', () => ({
	$api: {
		post: jest.fn()
	}
}));

describe('logout API', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('должен отправить POST запрос на /auth/logout', async () => {
		jest.mocked($api.post).mockResolvedValue({});

		await logout();

		expect($api.post).toHaveBeenCalledWith('/auth/logout');
	});

	it('должен пробросить ошибку при неудачном запросе', async () => {
		const mockError = new Error('Network error');
		jest.mocked($api.post).mockRejectedValue(mockError);

		await expect(logout()).rejects.toThrow('Network error');
	});
});
