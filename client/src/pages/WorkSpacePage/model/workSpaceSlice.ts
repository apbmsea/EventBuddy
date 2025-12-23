import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@shared/types/user.type';

import type { Member } from '@pages/MembersPage/entities/member';

export type ConnectedMember = Omit<User, 'password'> &
	Partial<Member> & {
		page: string | null;
		connections: number;
	};

interface ActiveUsersState {
	users: ConnectedMember[];
	me?: ConnectedMember;
	projectId?: string;
}

const initialState: ActiveUsersState = { users: [] };

export const activeUsersSlice = createSlice({
	name: 'workspace',
	initialState,
	reducers: {
		setActiveUsers(state, action: PayloadAction<ConnectedMember[]>) {
			state.users = action.payload;
		},
		setWorkspaceInfo(
			state,
			action: PayloadAction<{ me: ConnectedMember; projectId: string }>
		) {
			state.me = action.payload.me;
			state.projectId = action.payload.projectId;
		}
	}
});

export const { setActiveUsers, setWorkspaceInfo } = activeUsersSlice.actions;
export default activeUsersSlice.reducer;
