import refreshReducer, {
	refreshRequest,
	refreshSuccess,
	refreshFailure
} from '../model/refreshSlice';

const initialState = {
	isLoading: false
};

describe('refreshSlice', () => {
	describe('refreshRequest', () => {
		it('устанавливает isLoading в true', () => {
			const nextState = refreshReducer(initialState, refreshRequest());

			expect(nextState.isLoading).toBe(true);
		});
	});

	describe('refreshSuccess', () => {
		it('устанавливает isLoading в false', () => {
			const loadingState = { isLoading: true };
			const nextState = refreshReducer(loadingState, refreshSuccess());

			expect(nextState.isLoading).toBe(false);
		});
	});

	describe('refreshFailure', () => {
		it('устанавливает isLoading в false', () => {
			const loadingState = { isLoading: true };
			const nextState = refreshReducer(loadingState, refreshFailure());

			expect(nextState.isLoading).toBe(false);
		});
	});
});
