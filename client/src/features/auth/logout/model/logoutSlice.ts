import { createSlice } from '@reduxjs/toolkit';

interface LogoutState {
	isLoading: boolean;
}

const initialState: LogoutState = {
	isLoading: false
};

const logoutSlice = createSlice({
	name: 'logout',
	initialState,
	reducers: {
		logoutRequest: state => {
			state.isLoading = true;
		},
		logoutSuccess: state => {
			state.isLoading = false;
		},
		logoutFailure: state => {
			state.isLoading = false;
		}
	}
});

export const { logoutSuccess, logoutRequest, logoutFailure } = logoutSlice.actions;
export default logoutSlice.reducer;
