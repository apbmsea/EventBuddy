import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@shared/types/user.type';

interface ProfileState {
	isLoading: boolean;
	errors: Record<string, string>;
}

const initialState: ProfileState = {
	isLoading: false,
	errors: {}
};

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		profileRequest: (state, _action: PayloadAction<User>) => {
			state.isLoading = true;
		},
		profileSuccess: state => {
			state.isLoading = false;
		},
		profileFailure: (
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
	profileRequest,
	profileSuccess,
	profileFailure,
	clearAllErrors,
	clearFieldError
} = profileSlice.actions;
export default profileSlice.reducer;
