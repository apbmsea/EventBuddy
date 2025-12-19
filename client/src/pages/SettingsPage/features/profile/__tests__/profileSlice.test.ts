import profileReducer, {
	profileRequest,
	profileSuccess,
	profileFailure,
	clearFieldError,
	clearAllErrors
} from '../model/profileSlice';
import { Role } from '@shared/types/role.types';
import type { User } from '@shared/types/user.type';

const initialState = {
	isLoading: false,
	errors: {}
};

const mockUser: User = {
	id: '1',
	name: 'ilya',
	email: 'test@example.com',
	role: Role.INDIVIDUAL
};

describe('profileSlice', () => {
	describe('profileRequest', () => {
		it('устанавливает isLoading в true', () => {
			const nextState = profileReducer(
				initialState,
				profileRequest(mockUser)
			);

			expect(nextState.isLoading).toBe(true);
		});
	});

	describe('profileSuccess', () => {
		it('сбрасывает isLoading', () => {
			const loadingState = { ...initialState, isLoading: true };
			const nextState = profileReducer(loadingState, profileSuccess());

			expect(nextState.isLoading).toBe(false);
		});
	});

	describe('profileFailure', () => {
		it('сбрасывает isLoading и устанавливает ошибки', () => {
			const errors = { email: 'Некорректная почта' };
			const loadingState = { ...initialState, isLoading: true };
			const nextState = profileReducer(
				loadingState,
				profileFailure(errors)
			);

			expect(nextState.isLoading).toBe(false);
			expect(nextState.errors).toEqual(errors);
		});
	});

	describe('clearFieldError', () => {
		it('удаляет ошибку для конкретного поля', () => {
			const stateWithErrors = {
				...initialState,
				errors: {
					email: 'Некорректная почта',
					name: 'Некорректное имя'
				}
			};

			const nextState = profileReducer(
				stateWithErrors,
				clearFieldError('email')
			);

			expect(nextState.errors).toEqual({ name: 'Некорректное имя' });
		});
	});

	describe('clearAllErrors', () => {
		it('очищает все ошибки', () => {
			const stateWithErrors = {
				...initialState,
				errors: {
					email: 'Некорректная почта',
					name: 'Некорректное имя'
				}
			};

			const nextState = profileReducer(stateWithErrors, clearAllErrors());

			expect(nextState.errors).toEqual({});
		});
	});
});
