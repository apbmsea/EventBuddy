import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RegistrationPayload } from '@pages/RegisterPage/ui/entities/registration';

interface RegistrationState {
	isLoading: boolean;
	errors: Record<string, string>;
}

const initialState: RegistrationState = {
	isLoading: false,
	errors: {}
};

const registrationSlice = createSlice({
	name: 'registration',
	initialState,
	reducers: {
		registrationRequest: (
			state,
			_action: PayloadAction<RegistrationPayload>
		) => {
			state.isLoading = true;
		},
		registrationSuccess: state => {
			state.isLoading = false;
		},
		registrationFailure: (
			state,
			action: PayloadAction<Record<string, string>>
		) => {
			state.isLoading = false;
			state.errors = action.payload;
		}
	}
});

export const { registrationSuccess, registrationRequest, registrationFailure } =
	registrationSlice.actions;
export default registrationSlice.reducer;