import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { toggleView } from '../model/viewSlice';

const ViewSwitcher = () => {
	const view = useAppSelector(state => state.view.view);
	const dispatch = useAppDispatch();

	const handleToggle = () => dispatch(toggleView());

	return (
		<>
			<span>{view}</span>
			<button
				onClick={handleToggle}
				style={{
					display: 'inline-flex',
					alignItems: 'center',
					width: '50px',
					height: '24px',
					borderRadius: '12px',
					background: view === 'grid' ? '#ccc' : '#999',
					border: 'none',
					padding: '2px',
					cursor: 'pointer'
				}}
			>
				<span
					style={{
						display: 'block',
						width: '20px',
						height: '20px',
						borderRadius: '50%',
						background: 'white',
						transition: 'transform 0.2s ease',
						transform:
							view === 'grid'
								? 'translateX(0)'
								: 'translateX(26px)'
					}}
				/>
			</button>
		</>
	);
};

export default ViewSwitcher;
