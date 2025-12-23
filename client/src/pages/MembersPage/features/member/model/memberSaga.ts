import { call, put, takeLatest } from 'typed-redux-saga';
import {
	inviteMemberRequest,
	inviteMemberFailure,
	inviteMemberSuccess,
	deleteMemberSuccess,
	deleteMemberFailure,
	deleteMemberRequest,
	updateMemberSuccess,
	updateMemberFailure,
	updateMemberRequest
} from './memberSlice';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
	deleteMember,
	inviteMember,
	updateMember,
	type InviteMemberPayload
} from '@pages/MembersPage/entities/member';
import { getMembersRequest } from '../../members/model/membersSlice';
import { closeModal } from '@features/modal';
import type {
	DeleteMemberPayload,
	UpdateMemberPayload
} from '@pages/MembersPage/entities/member/model/member.types';

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

export function* updateMemberSaga(action: PayloadAction<UpdateMemberPayload>) {
	try {
		yield* call(updateMember, action.payload);
		yield* put(updateMemberSuccess());
		yield* put(
			getMembersRequest({ workspaceId: action.payload.projectId })
		);
	} catch (error) {
		yield* put(updateMemberFailure());
		console.error('update member error:', error);
	}
}

export function* deleteMemberSaga(action: PayloadAction<DeleteMemberPayload>) {
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
	yield* takeLatest(updateMemberRequest.type, updateMemberSaga);
	yield* takeLatest(deleteMemberRequest.type, deleteMemberSaga);
}
