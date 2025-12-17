import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Project } from '@entities/project';
import type { SortOption } from '../../../pages/ProjectsPage/entities/sorting';

interface ProjectsState {
	isLoading: boolean;
	projects: Project[];
	search: string;
	sort: SortOption;
}

const initialState: ProjectsState = {
	isLoading: false,
	projects: [],
	search: '',
	sort: 'updated'
};

const projectsSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {
		setSearch(state, action: PayloadAction<string>) {
			state.search = action.payload;
		},
		setSort(state, action: PayloadAction<SortOption>) {
			state.sort = action.payload;
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
	setSearch,
	setSort
} = projectsSlice.actions;
export default projectsSlice.reducer;
