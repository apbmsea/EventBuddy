import type { NotificationSettingPaload } from '@pages/SettingsPage/entities/notificationSettings';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface NotifcationSettingsState {
	isLoading: boolean;
	errors: Record<string, string>;
}

const initialState: NotifcationSettingsState = {
	isLoading: false,
	errors: {}
};

const notificationSettingsSlice = createSlice({
	name: 'notificationSettings',
	initialState,
	reducers: {
		notificationSettingsRequest: (
			state,
			_action: PayloadAction<NotificationSettingPaload>
		) => {
			state.isLoading = true;
		},
		notificationSettingsSuccess: state => {
			state.isLoading = false;
		},
		notificationSettingsFailure: (
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
	notificationSettingsRequest,
	notificationSettingsSuccess,
	notificationSettingsFailure,
	clearAllErrors,
	clearFieldError
} = notificationSettingsSlice.actions;
export default notificationSettingsSlice.reducer;
