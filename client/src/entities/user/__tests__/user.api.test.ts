import { getUser, updateUser, deleteUser } from '../model/user.api';
import { $api } from '@shared/api/instance';

jest.mock('@shared/api/instance', () => ({
	$api: {
		post: jest.fn(),
		put: jest.fn(),
		delete: jest.fn()
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

	describe('updateUser', () => {
		it('должен отправить PUT запрос на /users/me', async () => {
			const mockResponse = { data: { message: 'User updated' } };
			jest.mocked($api.put).mockResolvedValue(mockResponse);

			const result = await updateUser();

			expect($api.put).toHaveBeenCalledWith('/users/me');
			expect(result).toEqual(mockResponse.data);
		});

		it('должен пробросить ошибку при неудачном запросе', async () => {
			const mockError = new Error('Network error');
			jest.mocked($api.put).mockRejectedValue(mockError);

			await expect(updateUser()).rejects.toThrow('Network error');
		});
	});

	describe('deleteUser', () => {
		it('должен отправить DELETE запрос на /users/me', async () => {
			const mockResponse = { data: { message: 'User deleted' } };
			jest.mocked($api.delete).mockResolvedValue(mockResponse);

			const result = await deleteUser();

			expect($api.delete).toHaveBeenCalledWith('/users/me');
			expect(result).toEqual(mockResponse.data);
		});

		it('должен пробросить ошибку при неудачном запросе', async () => {
			const mockError = new Error('Network error');
			jest.mocked($api.delete).mockRejectedValue(mockError);

			await expect(deleteUser()).rejects.toThrow('Network error');
		});
	});
});
