import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { useEffect } from 'react';
import { getProjectsRequest, setView } from '../model/projectsSlice';
import { ProjectCard } from '@features/project';
import { useLocation, useNavigate } from 'react-router-dom';

const ProjectsList = () => {
	const dispatch = useAppDispatch();
	const { projects } = useAppSelector(state => state.projects);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getProjectsRequest());
	}, [dispatch]);

	useEffect(() => {
		if (location.pathname.startsWith('/settings/projects')) {
			dispatch(setView('settings'));
		}
	}, [location.pathname, navigate, dispatch]);

	if (projects.length === 0) {
		return <p>Проекты не найденны</p>;
	}

	return (
		<ul>
			{projects.map(project => (
				<ProjectCard project={project} />
			))}
		</ul>
	);
};

export default ProjectsList;
