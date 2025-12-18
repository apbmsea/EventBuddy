import type { CreateProjectPayload } from '@entities/projectCreate';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ProjectCreateState {
	isLoading: boolean;
	errors: Record<string, string>;
	isOpen: boolean;
}

const initialState: ProjectCreateState = {
	isLoading: false,
	errors: {},
	isOpen: false
};

const projectCreateSlice = createSlice({
	name: 'projectCreate',
	initialState,
	reducers: {
		setIsOpen(state, action: PayloadAction<boolean>) {
			state.isOpen = action.payload;
		},
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
	clearFieldError,
	setIsOpen
} = projectCreateSlice.actions;
export default projectCreateSlice.reducer;
