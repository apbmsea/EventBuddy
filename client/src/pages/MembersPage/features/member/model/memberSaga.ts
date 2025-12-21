import { call, put, takeLatest } from 'typed-redux-saga';
import {
	inviteMemberRequest,
	inviteMemberFailure,
	inviteMemberSuccess,
	deleteMemberSuccess,
	deleteMemberFailure,
	deleteMemberRequest
} from './memberSlice';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
	deleteMember,
	inviteMember,
	type InviteMemberPayload
} from '@pages/MembersPage/entities/member';
import { getMembersRequest } from '../../members/model/membersSlice';
import { closeModal } from '@features/modal';

export function* inviteMemberSaga(action: PayloadAction<InviteMemberPayload>) {
	try {
		const response = yield* call(inviteMember, action.payload);
		yield* put(inviteMemberSuccess(response));
		yield* put(
			getMembersRequest({ workspaceId: action.payload.projectId })
		);
		yield* put(closeModal());
	} catch (error: unknown) {
		yield* put(inviteMemberFailure());
		console.error('Invite Member error:', error);
	}
}

export function* deleteMemberSaga(action: PayloadAction<InviteMemberPayload>) {
	try {
		const response = yield* call(deleteMember, action.payload);
		yield* put(deleteMemberSuccess(response));
		yield* put(
			getMembersRequest({ workspaceId: action.payload.projectId })
		);
	} catch (error: unknown) {
		yield* put(deleteMemberFailure());
		console.error('delete Member error:', error);
	}
}

export function* watchMember() {
	yield* takeLatest(inviteMemberRequest.type, inviteMemberSaga);
	yield* takeLatest(deleteMemberRequest.type, deleteMemberSaga);
}
