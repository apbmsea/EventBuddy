import type { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'typed-redux-saga';
import { getProject } from '@entities/project/model/project.api';
import {
	getProjectFailure,
	getProjectSuccess,
	getProjectRequest
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

export function* watchProject() {
	yield* takeLatest(getProjectRequest.type, getProjectSaga);
}
