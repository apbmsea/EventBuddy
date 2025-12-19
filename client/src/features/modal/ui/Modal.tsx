import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Settings } from '@pages/SettingsPage';
import { ProjectCreateForm } from '@pages/ProjectsPage/features/projectCreate';
import { closeModal } from '../model/modalSlice';

const overlayStyle: React.CSSProperties = {
	position: 'fixed',
	inset: 0,
	backgroundColor: 'rgba(0, 0, 0, 0.6)',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	zIndex: 1000
};

const contentStyle: React.CSSProperties = {
	backgroundColor: '#fff',
	maxHeight: '90vh',
	overflowY: 'auto'
};

const Modal = () => {
	const dispatch = useAppDispatch();
	const { type, isOpen } = useAppSelector(state => state.modal);

	const onClose = useCallback(() => dispatch(closeModal()), [dispatch]);

	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};

		document.addEventListener('keydown', onKeyDown);
		return () => document.removeEventListener('keydown', onKeyDown);
	}, [onClose]);

	if (!isOpen) return null;

	return createPortal(
		<div style={overlayStyle} onClick={onClose}>
			<div style={contentStyle} onClick={e => e.stopPropagation()}>
				{type === 'settings' && <Settings />}
				{type === 'projectCreate' && <ProjectCreateForm />}
			</div>
		</div>,
		document.body
	);
};

export default Modal;
