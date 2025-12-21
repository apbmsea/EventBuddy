import type { Member } from '@pages/MembersPage/entities/member';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface MembersState {
	members: Member[];
	isLoading: boolean;
}

const initialState: MembersState = {
	members: [],
	isLoading: false
};

const membersSlice = createSlice({
	name: 'members',
	initialState,
	reducers: {
		getMembersRequest: (state, _action: PayloadAction<string>) => {
			state.isLoading = true;
		},
		getMembersSuccess: (state, action: PayloadAction<Member[]>) => {
			state.members = action.payload;
			state.isLoading = false;
		},
		getMembersFailure: state => {
			state.isLoading = false;
		}
	}
});

export const { getMembersRequest, getMembersSuccess, getMembersFailure } =
	membersSlice.actions;
export default membersSlice.reducer;
