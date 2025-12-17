import SettingsContent from './SettingsContent';

import SettingsSidebar from './SettingsSidebar';

export const SettingsLayout = () => {
	return (
		<div style={{ display: 'flex', width: 800, height: 500 }}>
			<SettingsSidebar />
			<SettingsContent />
		</div>
	);
};
