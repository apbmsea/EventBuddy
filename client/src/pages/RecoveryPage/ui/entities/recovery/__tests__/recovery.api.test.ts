import { recovery } from '../model/recovery.api';
import { $api } from '@shared/api/instance';
import type { RecoveryPayload } from '../model/recovery.types';

jest.mock('@shared/api/instance', () => ({
	$api: {
		post: jest.fn()
	}
}));

describe('recovery API', () => {
	const payload: RecoveryPayload = {
		email: 'test@example.com'
	};

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('должен отправить POST запрос на /auth/recovery', async () => {
		const mockResponse = { data: { message: 'Recovery email sent' } };
		jest.mocked($api.post).mockResolvedValue(mockResponse);

		const result = await recovery(payload);

		expect($api.post).toHaveBeenCalledWith('/auth/recovery', payload);
		expect(result).toEqual(mockResponse.data);
	});

	it('должен пробросить ошибку при неудачном запросе', async () => {
		const mockError = new Error('Network error');
		jest.mocked($api.post).mockRejectedValue(mockError);

		await expect(recovery(payload)).rejects.toThrow('Network error');
	});
});
