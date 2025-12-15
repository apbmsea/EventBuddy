import { refreshRequest } from '@features/refresh';
import { setNavigate } from '@shared/utils/navigate';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

const Layout = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		setNavigate(navigate);
	}, [navigate]);

	useEffect(() => {
		const refreshToken = () => {
			const token = localStorage.getItem('accessToken');

			if (token) {
				dispatch(refreshRequest());
			}
		};

		refreshToken();
	}, [dispatch]);

	return (
		<div className='app-layout'>
			<Outlet />
		</div>
	);
};

export default Layout;
