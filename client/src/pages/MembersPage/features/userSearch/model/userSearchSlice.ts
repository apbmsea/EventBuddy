import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@shared/types/user.type';

interface UserSearchState {
	users: User[];
	loading: boolean;
}

const initialState: UserSearchState = {
	users: [],
	loading: false
};

const userSearchSlice = createSlice({
	name: 'userSearch',
	initialState,
	reducers: {
		searchUsersRequest(state, _action: PayloadAction<string>) {
			state.loading = true;
		},
		searchUsersSuccess(state, action: PayloadAction<User[]>) {
			state.users = action.payload;
			state.loading = false;
		},
		searchUsersFailure(state) {
			state.loading = false;
		}
	}
});

export const { searchUsersRequest, searchUsersSuccess, searchUsersFailure } =
	userSearchSlice.actions;

export default userSearchSlice.reducer;
