import type { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'typed-redux-saga';
import { isHandledError } from '@shared/utils/isHandeledError';
import { editProject } from '@pages/SettingsModal/entities/projectEdit';
import type { Project } from '@entities/project';
import {
	projectEditFailure,
	projectEditRequest,
	projectEditSuccess
} from './projectEditSlice';

export function* editProjectSaga(action: PayloadAction<Project>) {
	try {
		yield* call(editProject, action.payload.id, action.payload);
		yield* put(projectEditSuccess());
	} catch (error: unknown) {
		if (isHandledError(error)) {
			yield* put(projectEditFailure(error.data?.errors || {}));
		} else {
			yield* put(projectEditFailure({}));
			console.error('Edit Project error:', error);
		}
	}
}

export function* watchEditProject() {
	yield* takeLatest(projectEditRequest.type, editProjectSaga);
}
