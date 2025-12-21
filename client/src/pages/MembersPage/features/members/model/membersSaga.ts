import { call, put, takeLatest, select } from 'typed-redux-saga';
import { getMembers } from '@pages/MembersPage/entities/members';
import {
	getMembersRequest,
	getMembersFailure,
	getMembersSuccess
} from './membersSlice';
import type { RootState } from '@shared/types/store.types';
import type { PayloadAction } from '@reduxjs/toolkit';

export function* getMembersSaga(
	action: PayloadAction<{ workspaceId: string }>
) {
	try {
		const { search, sort } = yield* select(
			(state: RootState) => state.members
		);

		const members = yield* call(getMembers, {
			projectId: action.payload.workspaceId,
			search,
			sort
		});

		yield* put(getMembersSuccess(members));
	} catch (error) {
		yield* put(getMembersFailure());
		console.error(error);
	}
}

export function* watchMembers() {
	yield* takeLatest(getMembersRequest.type, getMembersSaga);
}
