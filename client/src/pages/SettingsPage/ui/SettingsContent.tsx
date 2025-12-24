import { ProjectsList } from '@features/projects';
import { ProfileForm } from '@pages/SettingsPage/features/profile';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { ProjectEditForm } from '../features/projectEdit';
import { setView } from '@features/projects/model/projectsSlice';
import { setTab } from '../model/settingsSlice';
import { NotificationSetting } from '../features/notificationSettings';

const SettingsContent = () => {
	const { tab, projectId } = useAppSelector(state => state.settings);
	const title = useAppSelector(state => state.project.project?.title);
	const dispatch = useAppDispatch();

	if (tab === 'profile')
		return (
			<div>
				<h2>Профиль</h2>
				<ProfileForm />
			</div>
		);

	if (tab === 'projects') {
		dispatch(setView('settings'));
		return (
			<div>
				<h2>Проекты</h2>
				<ProjectsList />
			</div>
		);
	}

	if (tab === 'project' && projectId)
		return (
			<div>
				<div>
					<button onClick={() => dispatch(setTab('projects'))}>
						Назад
					</button>
					<h2>{title}</h2>
				</div>
				<ProjectEditForm />;
			</div>
		);

	if (tab === 'notification') {
		return (
			<div>
				<h2>Уведомления</h2>
				<NotificationSetting />
			</div>
		);
	}
};

export default SettingsContent;
