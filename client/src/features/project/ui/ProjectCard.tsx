import type { Project } from '@entities/project';
import { openProjectSettings } from '@pages/SettingsModal/model/settingsSlice';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { useNavigate } from 'react-router-dom';

type ProjectCardPayload = {
	project: Project;
};

const ProjectCard = ({ project }: ProjectCardPayload) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const view = useAppSelector(state => state.projects.view);

	const handleNavigate = () => {
		if (view === 'settings') {
			dispatch(openProjectSettings(project.id));
		} else {
			navigate(`/projects/${project.id}`);
		}
	};

	return (
		<li key={project.id} onClick={handleNavigate}>
			{project.title} {project.description} {project.deadline}{' '}
			{project.updatedAt} <img src={project.owner.avatarUrl} alt='' />
		</li>
	);
};

export default ProjectCard;
