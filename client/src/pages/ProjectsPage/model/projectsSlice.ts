import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Project } from '@entities/project';

interface ProjectsState {
	isLoading: boolean;
	projects: Project[];
	search: string;
}

const initialState: ProjectsState = {
	isLoading: false,
	projects: [],
	search: ''
};

const projectsSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {
		setSearch(state, action: PayloadAction<string>) {
			state.search = action.payload;
		},
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

export const {
	getProjectsSuccess,
	getProjectsRequest,
	getProjectsFailure,
	setSearch
} = projectsSlice.actions;
export default projectsSlice.reducer;
