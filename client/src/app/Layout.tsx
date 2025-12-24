import { refreshRequest } from '@features/refresh';
import { setNavigate } from '@shared/utils/navigate';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { Modal } from '../features/modal';
import { ToastContainer } from 'react-toastify';
import { useAppSelector } from '@shared/hooks/store.hooks';

const Layout = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const config = useAppSelector(
		state => state.user.user?.settings?.notifications.system
	);

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
			<ToastContainer
				limit={config?.maxVisible ?? 5}
				position={
					config?.view === 'BOTTOM' ? 'bottom-center' : 'top-center'
				}
			/>
			<Modal />
			<Outlet />
		</div>
	);
};

export default Layout;
