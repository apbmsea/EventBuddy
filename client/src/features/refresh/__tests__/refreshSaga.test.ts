import { refresh } from '@entities/refresh';
import { runSaga } from 'redux-saga';
import { refreshSaga } from '../model/refreshSaga';
import { refreshFailure, refreshSuccess } from '../model/refreshSlice';
import { setUser } from '@features/user';
import { Role } from '@shared/types/role.types';

jest.mock('@entities/refresh', () => ({
	refresh: jest.fn()
}));

describe('refresh Saga', () => {
	let dispatched: unknown[];

	beforeEach(() => {
		dispatched = [];
		localStorage.clear();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('должен успешно обновить токен', async () => {
		const response = {
			accessToken: 'new-token',
			user: {
				name: 'ilya',
				id: 1,
				email: 'test@example.com',
				role: Role.INDIVIDUAL
			}
		};
		jest.mocked(refresh).mockResolvedValue(response);

		await runSaga(
			{ dispatch: action => dispatched.push(action) },
			refreshSaga
		).toPromise();

		expect(refresh).toHaveBeenCalled();
		expect(dispatched).toContainEqual(setUser(response.user));
		expect(dispatched).toContainEqual(refreshSuccess());
		expect(localStorage.getItem('accessToken')).toBe('new-token');
	});

	it('должен обработать ошибку', async () => {
		const error = new Error('Refresh failed');
		jest.mocked(refresh).mockRejectedValue(error);

		await runSaga(
			{ dispatch: action => dispatched.push(action) },
			refreshSaga
		).toPromise();

		expect(dispatched).toContainEqual(refreshFailure());
	});
});
