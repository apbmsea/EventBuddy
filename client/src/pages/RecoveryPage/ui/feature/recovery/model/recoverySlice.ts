import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RecoveryPayload } from '@pages/RecoveryPage/ui/entities/recovery';

interface RecoveryState {
	isLoading: boolean;
	errors: Record<string, string>;
}

const initialState: RecoveryState = {
	isLoading: false,
	errors: {}
};

const recoverySlice = createSlice({
	name: 'recovery',
	initialState,
	reducers: {
		recoveryRequest: (state, _action: PayloadAction<RecoveryPayload>) => {
			state.isLoading = true;
		},
		recoverySuccess: state => {
			state.isLoading = false;
		},
		recoveryFailure: (
			state,
			action: PayloadAction<Record<string, string>>
		) => {
			state.isLoading = false;
			state.errors = action.payload;
		},
		clearFieldError: (state, action: PayloadAction<string>) => {
			delete state.errors[action.payload];
		},
		clearAllErrors: state => {
			state.errors = {};
		}
	}
});

export const {
	recoverySuccess,
	recoveryRequest,
	recoveryFailure,
	clearAllErrors,
	clearFieldError
} = recoverySlice.actions;
export default recoverySlice.reducer;
