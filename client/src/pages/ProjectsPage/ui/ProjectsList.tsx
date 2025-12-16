import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { useEffect } from 'react';
import { getProjectsRequest } from '../model/projectsSlice';
import { ProjectCard } from '@features/project';

const ProjectsList = () => {
	const dispatch = useAppDispatch();
	const projects = useAppSelector(state => state.projects.projects);

	useEffect(() => {
		dispatch(getProjectsRequest());
	}, [dispatch]);

	return (
		<ul>
			{projects.map(project => (
				<ProjectCard project={project} />
			))}
		</ul>
	);
};

export default ProjectsList;
