import { Modal } from '@shared/ui/modal';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { closeSettings } from '../model/settingsSlice';
import { SettingsLayout } from './SettingsLoyaut';

const SettingsModal = () => {
	const dispatch = useAppDispatch();
	const isOpen = useAppSelector(state => state.settings.isOpen);

	return (
		<Modal isOpen={isOpen} onClose={() => dispatch(closeSettings())}>
			<SettingsLayout />
		</Modal>
	);
};

export default SettingsModal;
