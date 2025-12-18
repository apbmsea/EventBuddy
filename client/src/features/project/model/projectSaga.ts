import type { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'typed-redux-saga';
import { deleteProject, getProject } from '@entities/project/model/project.api';
import {
	getProjectFailure,
	getProjectSuccess,
	getProjectRequest,
	deleteProjectSuccess,
	deleteProjectFailure,
	deleteProjectRequest
} from './projectSlice';

export function* getProjectSaga(action: PayloadAction<{ id: string }>) {
	try {
		const response = yield* call(getProject, action.payload.id);
		yield* put(getProjectSuccess(response));
	} catch (error: unknown) {
		yield* put(getProjectFailure());
		console.error('Get Project error:', error);
	}
}

export function* deleteProjectSaga(action: PayloadAction<{ id: string }>) {
	try {
		yield* call(deleteProject, action.payload.id);
		yield* put(deleteProjectSuccess());
	} catch (error: unknown) {
		yield* put(deleteProjectFailure());
		console.error('Delete Project error:', error);
	}
}

export function* watchProject() {
	yield* takeLatest(getProjectRequest.type, getProjectSaga);
	yield* takeLatest(deleteProjectRequest.type, deleteProjectSaga);
}
