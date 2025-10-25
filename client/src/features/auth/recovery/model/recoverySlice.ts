import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RecoveryPayload } from './recovery.types';

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
		recoveryRequest: (
			state,
			_action: PayloadAction<RecoveryPayload>
		) => {
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
		}
	}
});

export const { recoverySuccess, recoveryRequest, recoveryFailure } =
	recoverySlice.actions;
export default recoverySlice.reducer;
