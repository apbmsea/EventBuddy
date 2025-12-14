import {
	verify,
	type VerifyPayload
} from '@pages/VerifyPage/ui/entities/verify';
import { runSaga } from 'redux-saga';
import { verifySaga } from '../model/verifySaga';
import {
	verifyFailure,
	verifyRequest,
	verifySuccess
} from '../model/verifySlice';
import { loginRequest } from '@pages/LoginPage/ui/feature/login/model/loginSlice';
import { isHandledError } from '@shared/utils/isHandeledError';

jest.mock('@pages/VerifyPage/ui/entities/verify', () => ({
	verify: jest.fn()
}));

jest.mock('@shared/utils/isHandeledError', () => ({
	isHandledError: jest.fn()
}));

describe('verify Saga', () => {
	let dispatched: unknown[];
	const payload: VerifyPayload = {
		email: 'test@example.com',
		code: 123456
	};

	beforeEach(() => {
		dispatched = [];
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('должен успешно верифицировать пользователя', async () => {
		const response = { token: 'verify-token' };
		jest.mocked(verify).mockResolvedValue(response);

		await runSaga(
			{ dispatch: action => dispatched.push(action) },
			verifySaga,
			verifyRequest(payload)
		).toPromise();

		expect(verify).toHaveBeenCalledWith(payload);
		expect(dispatched).toContainEqual(
			loginRequest({
				email: '',
				password: '',
				token: response.token
			})
		);
		expect(dispatched).toContainEqual(verifySuccess());
	});

	it('должен обработать handled error', async () => {
		const error = { data: { errors: { code: 'invalid' } } };
		jest.mocked(verify).mockRejectedValue(error);
		jest.mocked(isHandledError).mockReturnValue(true);

		await runSaga(
			{ dispatch: action => dispatched.push(action) },
			verifySaga,
			verifyRequest(payload)
		).toPromise();

		expect(dispatched).toContainEqual(verifyFailure(error.data.errors));
	});

	it('должен обработать непредвиденную ошибку', async () => {
		const error = new Error('unexpected');
		jest.mocked(verify).mockRejectedValue(error);
		jest.mocked(isHandledError).mockReturnValue(false);

		await runSaga(
			{ dispatch: action => dispatched.push(action) },
			verifySaga,
			verifyRequest(payload)
		).toPromise();

		expect(dispatched).toContainEqual(verifyFailure({}));
	});
});
