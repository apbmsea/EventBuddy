import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from './user.types';

interface UserState {
	user: User | null;
}

const initialState: UserState = {
	user: null
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
		},
		resetUser: state => {
			state.user = null;
		}
	}
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
