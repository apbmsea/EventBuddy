import { Outlet } from 'react-router-dom';
import { SettingsSidebar } from '../features/settingsSidebar';

const SettingsPage = () => {
	return (
		<main style={{ display: 'flex', justifyContent: 'space-between' }}>
			<SettingsSidebar />
			<section>
				<Outlet />
			</section>
		</main>
	);
};

export default SettingsPage;
