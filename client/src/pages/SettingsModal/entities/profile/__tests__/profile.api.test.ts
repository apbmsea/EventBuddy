import { updateProfile } from '../model/profile.api';
import { $api } from '@shared/api/instance';
import { Role } from '@shared/types/role.types';
import type { User } from '@shared/types/user.type';

jest.mock('@shared/api/instance', () => ({
	$api: {
		put: jest.fn(),
		delete: jest.fn()
	}
}));

describe('profile API', () => {
	const mockUser: User = {
		email: 'test@example.com',
		name: 'Test User',
		role: Role.INDIVIDUAL
	};

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('updateUser', () => {
		it('должен отправить PUT запрос на /users/me', async () => {
			const mockResponse = { data: { message: 'User updated' } };
			jest.mocked($api.put).mockResolvedValue(mockResponse);

			const result = await updateProfile(mockUser);

			expect($api.put).toHaveBeenCalledWith('/users/me', mockUser);
			expect(result).toEqual(mockResponse.data);
		});

		it('должен пробросить ошибку при неудачном запросе', async () => {
			const mockError = new Error('Network error');
			jest.mocked($api.put).mockRejectedValue(mockError);

			await expect(updateProfile(mockUser)).rejects.toThrow(
				'Network error'
			);
		});
	});
});
