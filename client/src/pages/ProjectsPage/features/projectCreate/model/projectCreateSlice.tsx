import type { CreateProjectPayload } from '@pages/ProjectsPage/entities/projectCreate';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ProjectCreateState {
	isLoading: boolean;
	errors: Record<string, string>;
}

const initialState: ProjectCreateState = {
	isLoading: false,
	errors: {}
};

const projectCreateSlice = createSlice({
	name: 'projectCreate',
	initialState,
	reducers: {
		projectCreateRequest: (
			state,
			_action: PayloadAction<CreateProjectPayload>
		) => {
			state.isLoading = true;
		},
		projectCreateSuccess: state => {
			state.isLoading = false;
		},
		projectCreateFailure: (
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
	projectCreateRequest,
	projectCreateSuccess,
	projectCreateFailure,
	clearAllErrors,
	clearFieldError
} = projectCreateSlice.actions;
export default projectCreateSlice.reducer;
