import { login, type LoginPayload } from '@pages/LoginPage/ui/entities/login';
import { runSaga } from 'redux-saga';
import { loginSaga } from '../model/loginSaga';
import { loginFailure, loginRequest, loginSuccess } from '../model/loginSlice';
import { setUser } from '@features/user';
import { navigateTo } from '@shared/utils/navigate';
import { Role } from '@shared/types/role.types';
import { isHandledError } from '@shared/utils/isHandeledError';

jest.mock('@pages/LoginPage/ui/entities/login', () => ({
	login: jest.fn()
}));

jest.mock('@shared/utils/navigate', () => ({
	navigateTo: jest.fn()
}));

jest.mock('@shared/utils/isHandeledError', () => ({
	isHandledError: jest.fn()
}));

describe('login Saga', () => {
	let dispatched: unknown[];
	const payload: LoginPayload = {
		email: 'test@example.com',
		password: 'password123'
	};

	beforeEach(() => {
		dispatched = [];
		localStorage.clear();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('должен успешно входить', async () => {
		const response = {
			accessToken: 'e123tfw',
			user: { id: 1, email: 'test@example.com', role: Role.INDIVIDUAL }
		};
		jest.mocked(login).mockResolvedValue(response);

		await runSaga(
			{ dispatch: action => dispatched.push(action) },
			loginSaga,
			loginRequest(payload)
		).toPromise();

		expect(login).toHaveBeenCalledWith(payload);
		expect(dispatched).toContainEqual(setUser(response.user));
		expect(dispatched).toContainEqual(loginSuccess());
		expect(localStorage.getItem('accessToken')).toBe('e123tfw');
		expect(navigateTo).toHaveBeenCalled();
	});

	it('должен обработать handled error', async () => {
		const error = { data: { errors: { email: 'invalid' } } };
		jest.mocked(login).mockRejectedValue(error);
		jest.mocked(isHandledError).mockReturnValue(true);

		await runSaga(
			{ dispatch: action => dispatched.push(action) },
			loginSaga,
			loginRequest(payload)
		).toPromise();

		expect(dispatched).toContainEqual(loginFailure(error.data.errors));
		expect(navigateTo).not.toHaveBeenCalled();
	});

	it('должен обработать непредвиденную ошибку', async () => {
		const error = new Error('unexpected');
		jest.mocked(login).mockRejectedValue(error);

		await runSaga(
			{ dispatch: action => dispatched.push(action) },
			loginSaga,
			loginRequest(payload)
		).toPromise();

		expect(dispatched).toContainEqual(loginFailure({}));
		expect(navigateTo).not.toHaveBeenCalled();
	});
});
