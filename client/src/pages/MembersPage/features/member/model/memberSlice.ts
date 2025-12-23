import type {
	InviteMemberPayload,
	DeleteMemberPayload,
	UpdateMemberPayload
} from '@pages/MembersPage/entities/member';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface MemberState {
	isLoading: boolean;
}

const initialState: MemberState = {
	isLoading: false
};

const memberSlice = createSlice({
	name: 'member',
	initialState,
	reducers: {
		inviteMemberRequest: (
			state,
			_action: PayloadAction<InviteMemberPayload>
		) => {
			state.isLoading = true;
		},
		inviteMemberSuccess: state => {
			state.isLoading = false;
		},
		inviteMemberFailure: state => {
			state.isLoading = false;
		},
		updateMemberRequest: (
			state,
			_action: PayloadAction<UpdateMemberPayload>
		) => {
			state.isLoading = true;
		},
		updateMemberSuccess: state => {
			state.isLoading = false;
		},
		updateMemberFailure: state => {
			state.isLoading = false;
		},
		deleteMemberRequest: (
			state,
			_action: PayloadAction<DeleteMemberPayload>
		) => {
			state.isLoading = true;
		},
		deleteMemberSuccess: state => {
			state.isLoading = false;
		},
		deleteMemberFailure: state => {
			state.isLoading = false;
		}
	}
});

export const {
	inviteMemberRequest,
	inviteMemberSuccess,
	inviteMemberFailure,

	updateMemberRequest,
	updateMemberSuccess,
	updateMemberFailure,

	deleteMemberRequest,
	deleteMemberSuccess,
	deleteMemberFailure
} = memberSlice.actions;
export default memberSlice.reducer;
