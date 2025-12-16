import { call, put, takeLatest } from 'typed-redux-saga';
import { getProjects, type Project } from '@entities/project';
import {
	getProjectsFailure,
	getProjectsRequest,
	getProjectsSuccess
} from './projectsSlice';

export function* getProjectsSaga() {
	try {
		const projects: Project[] = yield* call(getProjects);
		yield* put(getProjectsSuccess(projects));
	} catch (error: unknown) {
		yield* put(getProjectsFailure());
		console.error('Get Projects Error:', error);
	}
}

export function* watchProjects() {
	yield* takeLatest(getProjectsRequest.type, getProjectsSaga);
}
