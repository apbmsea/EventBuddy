import registrationReducer, {
	registrationFailure,
	registrationRequest,
	registrationSuccess,
	clearFieldError,
	clearAllErrors
} from '../model/registrationSlice';
import type { RegistrationPayload } from '@pages/RegisterPage/ui/entities/registration';
import { Role } from '@shared/types/role.types';

const initialState = {
	isLoading: false,
	errors: {}
};

describe('registrationSlice', () => {
	describe('registrationRequest', () => {
		it('registrationRequest устанавливает isLoading в true и не имеет ошибок', () => {
			const payload: RegistrationPayload = {
				name: 'ilya',
				email: 'user@gmail.com',
				password: '123123wWw',
				role: Role.INDIVIDUAL
			};

			const nextState = registrationReducer(
				initialState,
				registrationRequest(payload)
			);

			expect(nextState.isLoading).toBe(true);
			expect(nextState.errors).toEqual({});
		});
	});

	describe('registrationSuccess', () => {
		it('устанавливает isLoading в false и не имеет ошибок', () => {
			const nextState = registrationReducer(
				initialState,
				registrationSuccess()
			);

			expect(nextState.isLoading).toBe(false);
			expect(nextState.errors).toEqual({});
		});
	});

	describe('registrationFailure', () => {
		it('сбрасывает isLoading и устанавливает ошибки', () => {
			const errors = {
				email: 'Некорректная почта',
				password:
					'Пароль должен содержать как минимум одну букву верхнего регистра'
			};
			const nextState = registrationReducer(
				initialState,
				registrationFailure(errors)
			);

			expect(nextState.isLoading).toBe(false);
			expect(nextState.errors).toEqual(errors);
		});

		it('обрабатывает пустые ошибки', () => {
			const nextState = registrationReducer(
				initialState,
				registrationFailure({})
			);

			expect(nextState.isLoading).toBe(false);
			expect(nextState.errors).toEqual({});
		});
	});

	describe('clearFieldError', () => {
		it('удаляет ошибку для конкретного поля', () => {
			const stateWithErrors = {
				isLoading: false,
				errors: {
					email: 'Некорректная почта',
					password: 'Слабый пароль'
				}
			};

			const nextState = registrationReducer(
				stateWithErrors,
				clearFieldError('email')
			);

			expect(nextState.errors).toEqual({ password: 'Слабый пароль' });
			expect(nextState.isLoading).toBe(false);
		});

		it('не изменяет состояние если поле не существует', () => {
			const stateWithErrors = {
				isLoading: false,
				errors: { email: 'Некорректная почта' }
			};

			const nextState = registrationReducer(
				stateWithErrors,
				clearFieldError('nonexistent')
			);

			expect(nextState.errors).toEqual({ email: 'Некорректная почта' });
		});
	});

	describe('clearAllErrors', () => {
		it('очищает все ошибки', () => {
			const stateWithErrors = {
				isLoading: false,
				errors: {
					email: 'Некорректная почта',
					password: 'Слабый пароль'
				}
			};

			const nextState = registrationReducer(
				stateWithErrors,
				clearAllErrors()
			);

			expect(nextState.errors).toEqual({});
			expect(nextState.isLoading).toBe(false);
		});

		it('не изменяет состояние если ошибок нет', () => {
			const nextState = registrationReducer(
				initialState,
				clearAllErrors()
			);

			expect(nextState.errors).toEqual({});
			expect(nextState.isLoading).toBe(false);
		});
	});
});
