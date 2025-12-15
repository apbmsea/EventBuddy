import { getUser, updateUser, deleteUser } from '@entities/user/model/user.api';
import { runSaga } from 'redux-saga';
import { getUserSaga, updateUserSaga, deleteUserSaga } from '../model/userSaga';
import {
	getUserRequest,
	getUserSuccess,
	getUserFailure,
	updateUserRequest,
	updateUserSuccess,
	updateUserFailure,
	deleteUserSuccess,
	deleteUserFailure
} from '../model/userSlice';
import { logoutRequest } from '@features/logout';
import { isHandledError } from '@shared/utils/isHandeledError';
import { Role } from '@shared/types/role.types';
import type { User } from '@entities/user';

jest.mock('@entities/user/model/user.api', () => ({
	getUser: jest.fn(),
	updateUser: jest.fn(),
	deleteUser: jest.fn()
}));

jest.mock('@entities/user', () => ({
	getUser: jest.fn(),
	updateUser: jest.fn(),
	deleteUser: jest.fn()
}));

jest.mock('@shared/utils/isHandeledError', () => ({
	isHandledError: jest.fn()
}));

jest.mock('@shared/api/instance', () => ({
	$api: {
		post: jest.fn(),
		put: jest.fn(),
		delete: jest.fn()
	}
}));

describe('user Saga', () => {
	let dispatched: unknown[];
	const mockUser: User = {
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

	describe('updateUserSaga', () => {
		it('должен успешно обновить пользователя', async () => {
			jest.mocked(updateUser).mockResolvedValue({});

			await runSaga(
				{ dispatch: action => dispatched.push(action) },
				updateUserSaga,
				updateUserRequest(mockUser)
			).toPromise();

			expect(updateUser).toHaveBeenCalledWith(mockUser);
			expect(dispatched).toContainEqual(updateUserSuccess());
			expect(dispatched).toContainEqual(getUserRequest());
		});

		it('должен обработать handled error', async () => {
			const error = { data: { errors: { email: 'invalid' } } };
			jest.mocked(updateUser).mockRejectedValue(error);
			jest.mocked(isHandledError).mockReturnValue(true);

			await runSaga(
				{ dispatch: action => dispatched.push(action) },
				updateUserSaga,
				updateUserRequest(mockUser)
			).toPromise();

			expect(dispatched).toContainEqual(
				updateUserFailure(error.data.errors)
			);
		});

		it('должен обработать непредвиденную ошибку', async () => {
			const error = new Error('unexpected');
			jest.mocked(updateUser).mockRejectedValue(error);
			jest.mocked(isHandledError).mockReturnValue(false);

			await runSaga(
				{ dispatch: action => dispatched.push(action) },
				updateUserSaga,
				updateUserRequest(mockUser)
			).toPromise();

			expect(dispatched).toContainEqual(updateUserFailure({}));
		});
	});

	describe('deleteUserSaga', () => {
		it('должен успешно удалить пользователя', async () => {
			jest.mocked(deleteUser).mockResolvedValue({});

			await runSaga(
				{ dispatch: action => dispatched.push(action) },
				deleteUserSaga
			).toPromise();

			expect(deleteUser).toHaveBeenCalled();
			expect(dispatched).toContainEqual(deleteUserSuccess());
			expect(dispatched).toContainEqual(logoutRequest());
		});

		it('должен обработать ошибку', async () => {
			const error = new Error('Delete user failed');
			jest.mocked(deleteUser).mockRejectedValue(error);

			await runSaga(
				{ dispatch: action => dispatched.push(action) },
				deleteUserSaga
			).toPromise();

			expect(dispatched).toContainEqual(deleteUserFailure());
		});
	});
});
