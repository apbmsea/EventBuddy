import { call, put, takeLatest } from 'typed-redux-saga';
import {
	searchUsersRequest,
	searchUsersSuccess,
	searchUsersFailure
} from './userSearchSlice';
import type { User } from '@shared/types/user.type';
import { searchUser } from '@pages/MembersPage/entities/userSearch';
import type { PayloadAction } from '@reduxjs/toolkit';

function* searchUsersSaga(action: PayloadAction<string>) {
	try {
		if (!action.payload.trim()) {
			yield* put(searchUsersSuccess([]));
			return;
		}

		const users: User[] = yield* call(searchUser, action.payload);
		yield* put(searchUsersSuccess(users));
	} catch (error) {
		yield* put(searchUsersFailure());
		console.error('Error search users:', error);
	}
}

export function* watchUserSearch() {
	yield* takeLatest(searchUsersRequest.type, searchUsersSaga);
}
