import verifyReducer, {
	setVerifyEmail,
	verifyRequest,
	verifySuccess,
	verifyFailure,
	clearFieldError,
	clearAllErrors
} from '../model/verifySlice';
import type { VerifyPayload } from '@pages/VerifyPage/ui/entities/verify';

const initialState = {
	verifyEmail: '',
	isLoading: false,
	errors: {}
};

describe('verifySlice', () => {
	describe('setVerifyEmail', () => {
		it('устанавливает email для верификации', () => {
			const email = 'test@example.com';
			const nextState = verifyReducer(
				initialState,
				setVerifyEmail(email)
			);

			expect(nextState.verifyEmail).toBe(email);
		});
	});

	describe('verifyRequest', () => {
		it('устанавливает isLoading в true', () => {
			const payload: VerifyPayload = {
				email: 'test@example.com',
				code: 123456
			};

			const nextState = verifyReducer(
				initialState,
				verifyRequest(payload)
			);

			expect(nextState.isLoading).toBe(true);
			expect(nextState.errors).toEqual({});
		});
	});

	describe('verifySuccess', () => {
		it('устанавливает isLoading в false', () => {
			const nextState = verifyReducer(initialState, verifySuccess());

			expect(nextState.isLoading).toBe(false);
			expect(nextState.errors).toEqual({});
		});
	});

	describe('verifyFailure', () => {
		it('сбрасывает isLoading и устанавливает ошибки', () => {
			const errors = {
				code: 'Неверный код',
				email: 'Некорректная почта'
			};
			const nextState = verifyReducer(
				initialState,
				verifyFailure(errors)
			);

			expect(nextState.isLoading).toBe(false);
			expect(nextState.errors).toEqual(errors);
		});

		it('обрабатывает пустые ошибки', () => {
			const nextState = verifyReducer(initialState, verifyFailure({}));

			expect(nextState.isLoading).toBe(false);
			expect(nextState.errors).toEqual({});
		});
	});

	describe('clearFieldError', () => {
		it('удаляет ошибку для конкретного поля', () => {
			const stateWithErrors = {
				verifyEmail: 'test@example.com',
				isLoading: false,
				errors: {
					code: 'Неверный код',
					email: 'Некорректная почта'
				}
			};

			const nextState = verifyReducer(
				stateWithErrors,
				clearFieldError('code')
			);

			expect(nextState.errors).toEqual({ email: 'Некорректная почта' });
			expect(nextState.isLoading).toBe(false);
		});

		it('не изменяет состояние если поле не существует', () => {
			const stateWithErrors = {
				verifyEmail: 'test@example.com',
				isLoading: false,
				errors: { code: 'Неверный код' }
			};

			const nextState = verifyReducer(
				stateWithErrors,
				clearFieldError('nonexistent')
			);

			expect(nextState.errors).toEqual({ code: 'Неверный код' });
		});
	});

	describe('clearAllErrors', () => {
		it('очищает все ошибки', () => {
			const stateWithErrors = {
				verifyEmail: 'test@example.com',
				isLoading: false,
				errors: {
					code: 'Неверный код',
					email: 'Некорректная почта'
				}
			};

			const nextState = verifyReducer(stateWithErrors, clearAllErrors());

			expect(nextState.errors).toEqual({});
			expect(nextState.isLoading).toBe(false);
		});

		it('не изменяет состояние если ошибок нет', () => {
			const nextState = verifyReducer(initialState, clearAllErrors());

			expect(nextState.errors).toEqual({});
			expect(nextState.isLoading).toBe(false);
		});
	});
});
