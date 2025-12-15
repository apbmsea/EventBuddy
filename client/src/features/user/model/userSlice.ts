import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../../entities/user/model/user.types';

interface UserState {
	user: User | null;
	isLoading: boolean;
}

const initialState: UserState = {
	user: null,
	isLoading: false
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
	deleteUserRequest,
	deleteUserSuccess,
	deleteUserFailure
} = userSlice.actions;
export default userSlice.reducer;
