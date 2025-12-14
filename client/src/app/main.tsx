import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@app/App.tsx';
import { store } from '@app/store/store';
import { Provider } from 'react-redux';


createRoot(document.getElementById('root')!).render(
	<StrictMode>
			<Provider store={store}>
				<App />
			</Provider>
	</StrictMode>
);
