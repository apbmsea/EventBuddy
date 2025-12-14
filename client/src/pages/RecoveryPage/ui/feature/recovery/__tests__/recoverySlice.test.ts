import recoveryReducer, {
	recoveryRequest,
	recoverySuccess,
	recoveryFailure,
	clearFieldError,
	clearAllErrors
} from '../model/recoverySlice';
import type { RecoveryPayload } from '@pages/RecoveryPage/ui/entities/recovery';

const initialState = {
	isLoading: false,
	errors: {}
};

describe('recoverySlice', () => {
	describe('recoveryRequest', () => {
		it('устанавливает isLoading в true', () => {
			const payload: RecoveryPayload = {
				email: 'test@example.com'
			};

			const nextState = recoveryReducer(
				initialState,
				recoveryRequest(payload)
			);

			expect(nextState.isLoading).toBe(true);
			expect(nextState.errors).toEqual({});
		});
	});

	describe('recoverySuccess', () => {
		it('устанавливает isLoading в false', () => {
			const nextState = recoveryReducer(initialState, recoverySuccess());

			expect(nextState.isLoading).toBe(false);
			expect(nextState.errors).toEqual({});
		});
	});

	describe('recoveryFailure', () => {
		it('сбрасывает isLoading и устанавливает ошибки', () => {
			const errors = {
				email: 'Некорректная почта'
			};
			const nextState = recoveryReducer(
				initialState,
				recoveryFailure(errors)
			);

			expect(nextState.isLoading).toBe(false);
			expect(nextState.errors).toEqual(errors);
		});

		it('обрабатывает пустые ошибки', () => {
			const nextState = recoveryReducer(
				initialState,
				recoveryFailure({})
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
					email: 'Некорректная почта'
				}
			};

			const nextState = recoveryReducer(
				stateWithErrors,
				clearFieldError('email')
			);

			expect(nextState.errors).toEqual({});
			expect(nextState.isLoading).toBe(false);
		});

		it('не изменяет состояние если поле не существует', () => {
			const stateWithErrors = {
				isLoading: false,
				errors: { email: 'Некорректная почта' }
			};

			const nextState = recoveryReducer(
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
					email: 'Некорректная почта'
				}
			};

			const nextState = recoveryReducer(
				stateWithErrors,
				clearAllErrors()
			);

			expect(nextState.errors).toEqual({});
			expect(nextState.isLoading).toBe(false);
		});

		it('не изменяет состояние если ошибок нет', () => {
			const nextState = recoveryReducer(initialState, clearAllErrors());

			expect(nextState.errors).toEqual({});
			expect(nextState.isLoading).toBe(false);
		});
	});
});
