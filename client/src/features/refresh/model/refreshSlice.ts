import { createSlice } from '@reduxjs/toolkit';

interface RefreshState {
	isLoading: boolean;
}

const initialState: RefreshState = {
	isLoading: false
};

const refreshSlice = createSlice({
	name: 'refresh',
	initialState,
	reducers: {
		refreshRequest: state => {
			state.isLoading = true;
		},
		refreshSuccess: state => {
			state.isLoading = false;
		},
		refreshFailure: state => {
			state.isLoading = false;
		}
	}
});

export const { refreshSuccess, refreshRequest, refreshFailure } =
	refreshSlice.actions;
export default refreshSlice.reducer;
