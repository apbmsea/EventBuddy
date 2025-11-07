import React from 'react';
import style from './HomePage.module.scss';
import { useDispatch } from 'react-redux';
import { logoutRequest } from '@features/auth/logout';

const HomePage: React.FC = () => {
	const dispatch = useDispatch();
	return (
		<main className={style['home-page']}>
			Home page
			<button onClick={() => dispatch(logoutRequest())}>выйти</button>
		</main>
	);
};

export default HomePage;
