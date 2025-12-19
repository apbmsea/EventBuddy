import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type ModalType = 'settings' | 'projectCreate';

interface ModalState {
	isOpen: boolean;
	type: ModalType | null;
}

const initialState: ModalState = {
	isOpen: false,
	type: null
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal(state, action: PayloadAction<ModalType>) {
			state.isOpen = true;
			state.type = action.payload;
		},
		closeModal(state) {
			state.isOpen = false;
			state.type = null;
		}
	}
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
