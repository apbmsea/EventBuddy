import { createBrowserRouter } from 'react-router-dom';
import Layout from '@app/Layout';
import { HomePage } from '@pages/Home';

export const router = createBrowserRouter([
	
	{
		path: '/',
		element: <Layout />,
		children: [
			{ index: true, element: <HomePage /> }
		]
	}
]);
