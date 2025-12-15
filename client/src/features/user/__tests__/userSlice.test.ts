import userReducer, {
	setUser,
	resetUser,
	getUserRequest,
	getUserSuccess,
	getUserFailure
} from '../model/userSlice';
import { Role } from '@shared/types/role.types';
import type { User } from '@entities/user';

const initialState = {
	user: null,
	isLoading: false,
	errors: {}
};

const mockUser: User = {
	email: 'test@example.com',
	role: Role.INDIVIDUAL
};

describe('userSlice', () => {
	describe('setUser', () => {
		it('устанавливает пользователя', () => {
			const nextState = userReducer(initialState, setUser(mockUser));

			expect(nextState.user).toEqual(mockUser);
		});
	});

	describe('resetUser', () => {
		it('сбрасывает пользователя', () => {
			const stateWithUser = { ...initialState, user: mockUser };
			const nextState = userReducer(stateWithUser, resetUser());

			expect(nextState.user).toBeNull();
		});
	});

	describe('getUserRequest', () => {
		it('устанавливает isLoading в true', () => {
			const nextState = userReducer(initialState, getUserRequest());

			expect(nextState.isLoading).toBe(true);
		});
	});

	describe('getUserSuccess', () => {
		it('устанавливает пользователя и сбрасывает isLoading', () => {
			const loadingState = { ...initialState, isLoading: true };
			const nextState = userReducer(
				loadingState,
				getUserSuccess(mockUser)
			);

			expect(nextState.user).toEqual(mockUser);
			expect(nextState.isLoading).toBe(false);
		});
	});

	describe('getUserFailure', () => {
		it('сбрасывает isLoading', () => {
			const loadingState = { ...initialState, isLoading: true };
			const nextState = userReducer(loadingState, getUserFailure());

			expect(nextState.isLoading).toBe(false);
		});
	});
});
