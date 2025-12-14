import logoutReducer, {
	logoutRequest,
	logoutSuccess,
	logoutFailure
} from '../model/logoutSlice';

const initialState = {
	isLoading: false
};

describe('logoutSlice', () => {
	describe('logoutRequest', () => {
		it('устанавливает isLoading в true', () => {
			const nextState = logoutReducer(initialState, logoutRequest());

			expect(nextState.isLoading).toBe(true);
		});
	});

	describe('logoutSuccess', () => {
		it('устанавливает isLoading в false', () => {
			const loadingState = { isLoading: true };
			const nextState = logoutReducer(loadingState, logoutSuccess());

			expect(nextState.isLoading).toBe(false);
		});
	});

	describe('logoutFailure', () => {
		it('устанавливает isLoading в false', () => {
			const loadingState = { isLoading: true };
			const nextState = logoutReducer(loadingState, logoutFailure());

			expect(nextState.isLoading).toBe(false);
		});
	});
});
