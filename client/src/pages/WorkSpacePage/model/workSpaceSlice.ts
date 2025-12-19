import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@shared/types/user.type';

export type ConnectedUser = Omit<User, 'password'> & {
	page: string | null;
	connections: number;
};

interface ActiveUsersState {
	users: ConnectedUser[];
}

const initialState: ActiveUsersState = { users: [] };

export const activeUsersSlice = createSlice({
	name: 'workspace',
	initialState,
	reducers: {
		setActiveUsers(state, action: PayloadAction<ConnectedUser[]>) {
			state.users = action.payload;
		}
	}
});

export const { setActiveUsers } = activeUsersSlice.actions;
export default activeUsersSlice.reducer;
