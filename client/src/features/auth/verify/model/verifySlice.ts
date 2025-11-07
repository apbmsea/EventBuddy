import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { VerifyPayload } from './verify.types';

interface VerifyState {
    verifyEmail: string;
	isLoading: boolean;
	errors: Record<string, string>;
}

const initialState: VerifyState = {
    verifyEmail: "",
	isLoading: false,
	errors: {}
};

const verifySlice = createSlice({
	name: 'verify',
	initialState,
	reducers: {
        setVerifyEmail: (state, action: PayloadAction<string>) => {
            state.verifyEmail = action.payload
        },
		verifyRequest: (
			state,
			_action: PayloadAction<VerifyPayload>
		) => {
			state.isLoading = true;
		},
		verifySuccess: state => {
			state.isLoading = false;
		},
		verifyFailure: (
			state,
			action: PayloadAction<Record<string, string>>
		) => {
			state.isLoading = false;
			state.errors = action.payload;
		}
	}
});

export const { setVerifyEmail, verifySuccess, verifyRequest, verifyFailure } =
	verifySlice.actions;
export default verifySlice.reducer;
