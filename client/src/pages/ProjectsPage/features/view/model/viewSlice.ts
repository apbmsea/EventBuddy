import type { ViewType } from '@pages/ProjectsPage/entities/view';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ViewState {
	view: ViewType;
}

const initialState: ViewState = {
	view: 'list'
};

export const viewSlice = createSlice({
	name: 'view',
	initialState,
	reducers: {
		setView: (state, action: PayloadAction<ViewType>) => {
			state.view = action.payload;
		},
		toggleView: state => {
			state.view = state.view === 'grid' ? 'list' : 'grid';
		}
	}
});

export const { setView, toggleView } = viewSlice.actions;
export default viewSlice.reducer;
