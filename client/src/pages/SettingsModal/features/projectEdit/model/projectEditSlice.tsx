import type { EditProjectPayload } from '@pages/SettingsModal/entities/projectEdit/model/projectEdit.types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ProjectEditState {
	isLoading: boolean;
	errors: Record<string, string>;
}

const initialState: ProjectEditState = {
	isLoading: false,
	errors: {}
};

const projectEditSlice = createSlice({
	name: 'projectEdit',
	initialState,
	reducers: {
		projectEditRequest: (
			state,
			_action: PayloadAction<{ id: string; project: EditProjectPayload }>
		) => {
			state.isLoading = true;
		},
		projectEditSuccess: state => {
			state.isLoading = false;
		},
		projectEditFailure: (
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
	projectEditRequest,
	projectEditSuccess,
	projectEditFailure,
	clearAllErrors,
	clearFieldError
} = projectEditSlice.actions;
export default projectEditSlice.reducer;
