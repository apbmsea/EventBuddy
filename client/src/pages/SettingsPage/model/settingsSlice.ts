import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type SettingsTab = 'profile' | 'projects' | 'project' | 'notification';

interface SettingsState {
	tab: SettingsTab;
	projectId: string | null;
}

const initialState: SettingsState = {
	tab: 'profile',
	projectId: null
};

const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setTab(state, action: PayloadAction<SettingsTab>) {
			state.tab = action.payload;
			if (action.payload !== 'project') {
				state.projectId = null;
			}
		},
		setProjectId(state, action: PayloadAction<string>) {
			state.projectId = action.payload;
			state.tab = 'project';
		}
	}
});

export const { setTab, setProjectId } = settingsSlice.actions;

export default settingsSlice.reducer;
