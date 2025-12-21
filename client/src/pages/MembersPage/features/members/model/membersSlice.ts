import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Member } from '@pages/MembersPage/entities/member';

export type SortType = 'name' | 'email' | 'accesses' | 'tag';

interface MembersState {
	members: Member[];
	isLoading: boolean;
	search: string;
	sort: SortType;
}

const initialState: MembersState = {
	members: [],
	isLoading: false,
	search: '',
	sort: 'name'
};

const membersSlice = createSlice({
	name: 'members',
	initialState,
	reducers: {
		getMembersRequest: (
			state,
			_action: PayloadAction<{ workspaceId: string }>
		) => {
			state.isLoading = true;
		},
		getMembersSuccess: (state, action: PayloadAction<Member[]>) => {
			state.members = action.payload;
			state.isLoading = false;
		},
		getMembersFailure: state => {
			state.isLoading = false;
		},
		setSearch(state, action: PayloadAction<string>) {
			state.search = action.payload;
		},
		setSort(state, action: PayloadAction<SortType>) {
			state.sort = action.payload;
		}
	}
});

export const {
	getMembersRequest,
	getMembersSuccess,
	getMembersFailure,
	setSearch,
	setSort
} = membersSlice.actions;

export default membersSlice.reducer;
