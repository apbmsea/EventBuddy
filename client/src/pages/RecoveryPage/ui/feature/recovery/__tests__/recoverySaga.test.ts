import {
	recovery,
	type RecoveryPayload
} from '@pages/RecoveryPage/ui/entities/recovery';
import { runSaga } from 'redux-saga';
import { recoverySaga } from '../model/recoverySaga';
import {
	recoveryFailure,
	recoveryRequest,
	recoverySuccess
} from '../model/recoverySlice';
import { setVerifyEmail } from '@pages/VerifyPage/ui/feature/verify/model/verifySlice';
import { navigateTo } from '@shared/utils/navigate';
import { isHandledError } from '@shared/utils/isHandeledError';

jest.mock('@pages/RecoveryPage/ui/entities/recovery', () => ({
	recovery: jest.fn()
}));

jest.mock('@shared/utils/navigate', () => ({
	navigateTo: jest.fn()
}));

jest.mock('@shared/utils/isHandeledError', () => ({
	isHandledError: jest.fn()
}));

describe('recovery Saga', () => {
	let dispatched: unknown[];
	const payload: RecoveryPayload = {
		email: 'test@example.com'
	};

	beforeEach(() => {
		dispatched = [];
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('должен успешно отправить запрос на восстановление', async () => {
		const response = { message: 'Recovery email sent' };
		jest.mocked(recovery).mockResolvedValue(response);

		await runSaga(
			{ dispatch: action => dispatched.push(action) },
			recoverySaga,
			recoveryRequest(payload)
		).toPromise();

		expect(recovery).toHaveBeenCalledWith(payload);
		expect(dispatched).toContainEqual(recoverySuccess());
		expect(dispatched).toContainEqual(setVerifyEmail(payload.email));
		expect(navigateTo).toHaveBeenCalledWith('/verify');
	});

	it('должен обработать handled error', async () => {
		const error = { data: { errors: { email: 'invalid' } } };
		jest.mocked(recovery).mockRejectedValue(error);
		jest.mocked(isHandledError).mockReturnValue(true);

		await runSaga(
			{ dispatch: action => dispatched.push(action) },
			recoverySaga,
			recoveryRequest(payload)
		).toPromise();

		expect(dispatched).toContainEqual(recoveryFailure(error.data.errors));
		expect(navigateTo).not.toHaveBeenCalled();
	});

	it('должен обработать непредвиденную ошибку', async () => {
		const error = new Error('unexpected');
		jest.mocked(recovery).mockRejectedValue(error);
		jest.mocked(isHandledError).mockReturnValue(false);

		await runSaga(
			{ dispatch: action => dispatched.push(action) },
			recoverySaga,
			recoveryRequest(payload)
		).toPromise();

		expect(dispatched).toContainEqual(recoveryFailure({}));
		expect(navigateTo).not.toHaveBeenCalled();
	});
});
