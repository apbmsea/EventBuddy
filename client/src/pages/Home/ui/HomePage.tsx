import { openSettings } from '@pages/SettingsModal/model/settingsSlice';
import { useAppDispatch } from '@shared/hooks/store.hooks';
import React from 'react';

const HomePage: React.FC = () => {
	const dispatch = useAppDispatch();
	return (
		<main>
			Home page{' '}
			<button onClick={() => dispatch(openSettings())}>модалка</button>
		</main>
	);
};

export default HomePage;
