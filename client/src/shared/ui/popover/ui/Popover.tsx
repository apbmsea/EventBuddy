import { useState, useRef, useEffect } from 'react';

interface PopoverProps {
	trigger: React.ReactNode;
	children: React.ReactNode;
}

const Popover = ({ trigger, children }: PopoverProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	const toggle = () => setIsOpen(prev => !prev);
	const close = () => setIsOpen(false);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				close();
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div
			style={{ position: 'relative', display: 'inline-block' }}
			ref={ref}
		>
			<div onClick={toggle}>{trigger}</div>

			{isOpen && (
				<div
					style={{
						position: 'absolute',
						top: '100%',
						right: 0,
						background: '#fff',
						border: '1px solid #ccc',
						borderRadius: 4,
						boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
						zIndex: 100
					}}
				>
					{children}
				</div>
			)}
		</div>
	);
};

export default Popover;
