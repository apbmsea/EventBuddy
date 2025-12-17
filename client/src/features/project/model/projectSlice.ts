import type { Project } from '@entities/project';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ProjectState {
	isLoading: boolean;
	errors: Record<string, string>;
	project: Project | null;
}

const initialState: ProjectState = {
	isLoading: false,
	errors: {},
	project: null
};

const projectSlice = createSlice({
	name: 'project',
	initialState,
	reducers: {
		getProjectRequest: (state, _action: PayloadAction<{ id: string }>) => {
			state.isLoading = true;
		},
		getProjectSuccess: (state, action: PayloadAction<Project>) => {
			state.isLoading = false;
			state.project = action.payload;
		},
		getProjectFailure: state => {
			state.isLoading = false;
		},
		deleteProjectRequest: (
			state,
			_action: PayloadAction<{ id: string }>
		) => {
			state.isLoading = true;
		},
		deleteProjectSuccess: state => {
			state.isLoading = false;
			state.project = null;
		},
		deleteProjectFailure: state => {
			state.isLoading = false;
		}
	}
});

export const {
	getProjectRequest,
	getProjectSuccess,
	getProjectFailure,
	deleteProjectRequest,
	deleteProjectFailure,
	deleteProjectSuccess
} = projectSlice.actions;
export default projectSlice.reducer;
