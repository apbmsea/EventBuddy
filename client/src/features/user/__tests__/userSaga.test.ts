import { getUser } from '@entities/user/model/user.api';
import { runSaga } from 'redux-saga';
import { getUserSaga } from '../model/userSaga';
import { getUserSuccess, getUserFailure } from '../model/userSlice';
import { Role } from '@shared/types/role.types';
import type { User } from '@shared/types/user.type';

jest.mock('@entities/user/model/user.api', () => ({
	getUser: jest.fn()
}));

jest.mock('@entities/user', () => ({
	getUser: jest.fn()
}));

jest.mock('@shared/api/instance', () => ({
	$api: {
		post: jest.fn()
	}
}));

describe('user Saga', () => {
	let dispatched: unknown[];
	const mockUser: User = {
		name: 'ilya',
		email: 'test@example.com',
		role: Role.INDIVIDUAL
	};

	beforeEach(() => {
		dispatched = [];
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('getUserSaga', () => {
		it('должен успешно получить пользователя', async () => {
			jest.mocked(getUser).mockResolvedValue(mockUser);

			await runSaga(
				{ dispatch: action => dispatched.push(action) },
				getUserSaga
			).toPromise();

			expect(getUser).toHaveBeenCalled();
			expect(dispatched).toContainEqual(getUserSuccess(mockUser));
		});

		it('должен обработать ошибку', async () => {
			const error = new Error('Get user failed');
			jest.mocked(getUser).mockRejectedValue(error);

			await runSaga(
				{ dispatch: action => dispatched.push(action) },
				getUserSaga
			).toPromise();

			expect(dispatched).toContainEqual(getUserFailure());
		});
	});
});
