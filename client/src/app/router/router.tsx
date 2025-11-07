import { createBrowserRouter } from 'react-router-dom';
import Layout from '@app/Layout';
import { HomePage } from '@pages/Home';
import { AuthPage } from '@pages/Auth';

export const router = createBrowserRouter([
	
	{
		path: '/',
		element: <Layout />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: 'auth/*', element: <AuthPage /> }
			//   { path: '*', element: <NotFound /> }, редирект при неправильном url
		]
	}
]);
