import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Project } from '@entities/project';

interface ProjectsState {
	isLoading: boolean;
	projects: Project[];
}

const initialState: ProjectsState = {
	isLoading: false,
	projects: []
};

const projectsSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {
		getProjectsRequest: state => {
			state.isLoading = true;
		},
		getProjectsSuccess: (state, action: PayloadAction<Project[]>) => {
			state.projects = action.payload;
			state.isLoading = false;
		},
		getProjectsFailure: state => {
			state.isLoading = false;
		}
	}
});

export const { getProjectsSuccess, getProjectsRequest, getProjectsFailure } =
	projectsSlice.actions;
export default projectsSlice.reducer;
