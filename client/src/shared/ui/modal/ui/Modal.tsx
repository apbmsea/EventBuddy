import { type ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

export interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
}

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

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
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
				{children}
			</div>
		</div>,
		document.body
	);
};

export default Modal;
