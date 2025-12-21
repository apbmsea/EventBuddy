import { call, put, takeLatest } from 'typed-redux-saga';
import { getMembers } from '@pages/MembersPage/entities/members';
import {
	getMembersRequest,
	getMembersFailure,
	getMembersSuccess
} from './membersSlice';
import type { PayloadAction } from '@reduxjs/toolkit';

export function* getMembersSaga(action: PayloadAction<string>) {
	try {
		const response = yield* call(getMembers, action.payload);
		yield* put(getMembersSuccess(response));
	} catch (error: unknown) {
		yield* put(getMembersFailure());
		console.error('Get Members error:', error);
	}
}

export function* watchMembers() {
	yield* takeLatest(getMembersRequest.type, getMembersSaga);
}
