import type { Project } from '@entities/project';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Popover } from '@shared/ui/popover';
import { useNavigate } from 'react-router-dom';
import { deleteProjectRequest } from '../model/projectSlice';
import { openModal } from '@features/modal';
import { setProjectId } from '@pages/SettingsPage/model/settingsSlice';

type ProjectCardPayload = {
	project: Project;
};

const ProjectCard = ({ project }: ProjectCardPayload) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const view = useAppSelector(state => state.projects.view);

	const handleNavigate = () => {
		if (view === 'settings') {
			dispatch(openModal('settings'));
			dispatch(setProjectId(project.id));
		} else {
			navigate(`/projects/${project.id}`);
		}
	};

	return (
		<li key={project.id}>
			<h1 onClick={handleNavigate}>{project.title}</h1>{' '}
			{project.description} {project.deadline} {project.updatedAt}{' '}
			<img src={project.owner.avatarUrl} alt='' />
			<Popover trigger={<button>...</button>}>
				<button
					onClick={() => {
						dispatch(openModal('settings'));
						dispatch(setProjectId(project.id));
					}}
				>
					Редактировать
				</button>
				<button
					onClick={() =>
						dispatch(deleteProjectRequest({ id: project.id }))
					}
				>
					Удалить
				</button>
				<button
					onClick={() => {
						dispatch(openModal('settings'));
						dispatch(setProjectId(project.id));
					}}
				>
					Настройки
				</button>
			</Popover>
		</li>
	);
};

export default ProjectCard;
