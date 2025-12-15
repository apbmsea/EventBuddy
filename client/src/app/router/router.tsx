import { createBrowserRouter } from 'react-router-dom';
import Layout from '@app/Layout';
import { HomePage } from '@pages/Home';
import { LoginPage } from '@pages/LoginPage';
import { RegistrationPage } from '@pages/RegisterPage';
import { VerifyPage } from '@pages/VerifyPage';
import { RecoveryPage } from '@pages/RecoveryPage';
import { SettingsPage } from '@pages/SettingsPage';
import { ProfileForm } from '@pages/SettingsPage/features/profile';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: '/auth/login', element: <LoginPage /> },
			{ path: '/auth/regitstration', element: <RegistrationPage /> },
			{ path: '/auth/verify', element: <VerifyPage /> },
			{ path: '/auth/recovery', element: <RecoveryPage /> },
			{
				path: '/settings',
				element: <SettingsPage />,
				children: [
					{ index: true, path: 'profile', element: <ProfileForm /> }
				]
			}
		]
	}
]);
