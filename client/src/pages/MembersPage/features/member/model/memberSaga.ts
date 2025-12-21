import { call, put, takeLatest } from 'typed-redux-saga';
import {
	inviteMemberRequest,
	inviteMemberFailure,
	inviteMemberSuccess
} from './memberSlice';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
	inviteMember,
	type InviteMemberPayload
} from '@pages/MembersPage/entities/member';
import { getMembersRequest } from '../../members/model/membersSlice';
import { closeModal } from '@features/modal';

export function* inviteMemberSaga(action: PayloadAction<InviteMemberPayload>) {
	try {
		const response = yield* call(inviteMember, action.payload);
		yield* put(inviteMemberSuccess(response));
		yield* put(getMembersRequest(action.payload.projectId));
		yield* put(closeModal());
	} catch (error: unknown) {
		yield* put(inviteMemberFailure());
		console.error('Invite Member error:', error);
	}
}

export function* watchMember() {
	yield* takeLatest(inviteMemberRequest.type, inviteMemberSaga);
}
