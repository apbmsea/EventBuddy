import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { setTab } from '../model/settingsSlice';
import { logoutRequest } from '@features/logout';

const SettingsSidebar = () => {
	const dispatch = useAppDispatch();
	const tab = useAppSelector(state => state.settings.tab);

	return (
		<div>
			<h2>Настройки</h2>
			<nav
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between'
				}}
			>
				<ul style={{ display: 'flex', flexDirection: 'column' }}>
					<button
						onClick={() => dispatch(setTab('profile'))}
						disabled={tab === 'profile'}
					>
						Профиль
					</button>

					<button
						onClick={() => dispatch(setTab('projects'))}
						disabled={tab === 'projects'}
					>
						Проекты
					</button>
				</ul>

				<button onClick={() => dispatch(logoutRequest())}>Выйти</button>
			</nav>
		</div>
	);
};

export default SettingsSidebar;
