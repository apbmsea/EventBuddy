import { updateProfile } from '@pages/SettingsPage/entities/profile/model/profile.api';
import { runSaga } from 'redux-saga';
import { updateProfileSaga } from '../model/profileSaga';
import {
	profileRequest,
	profileSuccess,
	profileFailure
} from '../model/profileSlice';
import { getUserRequest } from '@features/user';
import { isHandledError } from '@shared/utils/isHandeledError';
import { Role } from '@shared/types/role.types';
import type { ProfilePayload } from '@pages/SettingsPage/entities/profile/model/profile.types';

jest.mock('@pages/SettingsPage/entities/profile/model/profile.api', () => ({
	updateProfile: jest.fn()
}));

jest.mock('@shared/utils/isHandeledError', () => ({
	isHandledError: jest.fn()
}));

describe('profile Saga', () => {
	let dispatched: unknown[];
	const mockUser: ProfilePayload = {
		name: 'ilya',
		email: 'test@example.com',
		password: '',
		role: Role.INDIVIDUAL
	};

	beforeEach(() => {
		dispatched = [];
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('updateProfileSaga', () => {
		it('должен успешно обновить профиль', async () => {
			jest.mocked(updateProfile).mockResolvedValue({});

			await runSaga(
				{ dispatch: action => dispatched.push(action) },
				updateProfileSaga,
				profileRequest(mockUser)
			).toPromise();

			expect(updateProfile).toHaveBeenCalledWith(mockUser);
			expect(dispatched).toContainEqual(profileSuccess());
			expect(dispatched).toContainEqual(getUserRequest());
		});

		it('должен обработать handled error', async () => {
			const error = { data: { errors: { email: 'invalid' } } };
			jest.mocked(updateProfile).mockRejectedValue(error);
			jest.mocked(isHandledError).mockReturnValue(true);

			await runSaga(
				{ dispatch: action => dispatched.push(action) },
				updateProfileSaga,
				profileRequest(mockUser)
			).toPromise();

			expect(dispatched).toContainEqual(
				profileFailure(error.data.errors)
			);
		});

		it('должен обработать непредвиденную ошибку', async () => {
			const error = new Error('unexpected');
			jest.mocked(updateProfile).mockRejectedValue(error);
			jest.mocked(isHandledError).mockReturnValue(false);

			await runSaga(
				{ dispatch: action => dispatched.push(action) },
				updateProfileSaga,
				profileRequest(mockUser)
			).toPromise();

			expect(dispatched).toContainEqual(profileFailure({}));
		});
	});
});
