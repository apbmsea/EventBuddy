import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../../entities/user/model/user.types';

interface UserState {
	user: User | null;
	isLoading: boolean;
	errors: Record<string, string>;
}

const initialState: UserState = {
	user: null,
	isLoading: false,
	errors: {}
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
		},
		resetUser: state => {
			state.user = null;
		},
		getUserRequest: state => {
			state.isLoading = true;
		},
		getUserSuccess: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
			state.isLoading = false;
		},
		getUserFailure: state => {
			state.isLoading = false;
		},
		updateUserRequest: state => {
			state.isLoading = true;
		},
		updateUserSuccess: state => {
			state.isLoading = false;
		},
		updateUserFailure: (
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
		},
		deleteUserRequest: state => {
			state.isLoading = true;
		},
		deleteUserSuccess: state => {
			state.isLoading = false;
		},
		deleteUserFailure: state => {
			state.isLoading = false;
		}
	}
});

export const {
	setUser,
	resetUser,
	getUserRequest,
	getUserSuccess,
	getUserFailure,
	updateUserRequest,
	updateUserSuccess,
	updateUserFailure,
	clearAllErrors,
	clearFieldError,
	deleteUserRequest,
	deleteUserSuccess,
	deleteUserFailure
} = userSlice.actions;
export default userSlice.reducer;
