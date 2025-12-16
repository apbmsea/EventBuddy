import { call, put, select, takeLatest } from 'typed-redux-saga';
import { getProjects, type Project } from '@entities/project';
import {
	getProjectsFailure,
	getProjectsRequest,
	getProjectsSuccess
} from './projectsSlice';
import type { RootState } from '@shared/types/store.types';

export function* getProjectsSaga() {
	try {
		const state: RootState = yield select();
		const { search: searchQuery } = state.projects;
		const querry = {
			search: searchQuery || undefined
		};
		const projects: Project[] = yield* call(getProjects, querry);
		yield* put(getProjectsSuccess(projects));
	} catch (error: unknown) {
		yield* put(getProjectsFailure());
		console.error('Get Projects Error:', error);
	}
}

export function* watchProjects() {
	yield* takeLatest(getProjectsRequest.type, getProjectsSaga);
}
