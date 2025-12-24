import { openModal } from '@features/modal';
import { notification } from '@shared/utils/notification/notification';
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
			<button
				onClick={() =>
					notification.success({ title: 'ыы', message: 'Норм' })
				}
			>
				соо
			</button>
		</main>
	);
};

export default HomePage;
