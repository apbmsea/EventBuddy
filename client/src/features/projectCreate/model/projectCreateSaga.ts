import type { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'typed-redux-saga';
import { isHandledError } from '@shared/utils/isHandeledError';
import {
	createProject,
	type CreateProjectPayload
} from '@entities/projectCreate';
import {
	projectCreateFailure,
	projectCreateRequest,
	projectCreateSuccess
} from './projectCreateSlice';

export function* createProjectSaga(
	action: PayloadAction<CreateProjectPayload>
) {
	try {
		yield* call(createProject, action.payload);
		yield* put(projectCreateSuccess());
	} catch (error: unknown) {
		if (isHandledError(error)) {
			yield* put(projectCreateFailure(error.data?.errors || {}));
		} else {
			yield* put(projectCreateFailure({}));
			console.error('Create Project error:', error);
		}
	}
}

export function* watchCreateProject() {
	yield* takeLatest(projectCreateRequest.type, createProjectSaga);
}
