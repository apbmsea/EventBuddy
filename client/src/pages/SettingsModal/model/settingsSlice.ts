import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type SettingsTab = 'profile' | 'projects' | 'project';

interface SettingsState {
	isOpen: boolean;
	tab: SettingsTab;
	projectId: string | null;
}

const initialState: SettingsState = {
	isOpen: false,
	tab: 'profile',
	projectId: null
};

const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		openSettings(state) {
			state.isOpen = true;
		},
		closeSettings(state) {
			state.isOpen = false;
			state.tab = 'profile';
			state.projectId = null;
		},
		setTab(state, action: PayloadAction<SettingsTab>) {
			state.tab = action.payload;
			if (action.payload !== 'project') {
				state.projectId = null;
			}
		},
		openProjectSettings(state, action: PayloadAction<string>) {
			state.tab = 'project';
			state.projectId = action.payload;
		}
	}
});

export const { openSettings, closeSettings, setTab, openProjectSettings } =
	settingsSlice.actions;

export default settingsSlice.reducer;
