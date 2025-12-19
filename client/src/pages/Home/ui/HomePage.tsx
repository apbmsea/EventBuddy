import { openModal } from '@features/modal';
import { useAppDispatch } from '@shared/hooks/store.hooks';
import React from 'react';

const HomePage: React.FC = () => {
	const dispatch = useAppDispatch();
	return (
		<main>
			Home page{' '}
			<button onClick={() => dispatch(openModal('settings'))}>
				модалка
			</button>
		</main>
	);
};

export default HomePage;
