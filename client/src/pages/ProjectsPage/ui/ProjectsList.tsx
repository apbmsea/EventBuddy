import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { useEffect } from 'react';
import { getProjectsRequest } from '../model/projectsSlice';
import { ProjectCard } from '@features/project';

const ProjectsList = () => {
	const dispatch = useAppDispatch();
	const { projects } = useAppSelector(state => state.projects);

	useEffect(() => {
		dispatch(getProjectsRequest());
	}, [dispatch]);

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
