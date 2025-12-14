import { logout } from '@entities/logout';
import { runSaga } from 'redux-saga';
import { logoutSaga } from '../model/logoutSaga';
import { logoutFailure, logoutSuccess } from '../model/logoutSlice';

jest.mock('@entities/logout', () => ({
	logout: jest.fn()
}));

describe('logout Saga', () => {
	let dispatched: unknown[];

	beforeEach(() => {
		dispatched = [];
		localStorage.setItem('accessToken', 'test-token');
	});

	afterEach(() => {
		jest.clearAllMocks();
		localStorage.clear();
	});

	it('должен успешно выйти из системы', async () => {
		jest.mocked(logout).mockResolvedValue(undefined);

		await runSaga(
			{ dispatch: action => dispatched.push(action) },
			logoutSaga
		).toPromise();

		expect(logout).toHaveBeenCalled();
		expect(dispatched).toContainEqual(logoutSuccess());
		expect(localStorage.getItem('accessToken')).toBeNull();
	});

	it('должен обработать ошибку', async () => {
		const error = new Error('Logout failed');
		jest.mocked(logout).mockRejectedValue(error);

		await runSaga(
			{ dispatch: action => dispatched.push(action) },
			logoutSaga
		).toPromise();

		expect(dispatched).toContainEqual(logoutFailure());
	});
});
