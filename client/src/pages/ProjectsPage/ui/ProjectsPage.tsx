import { ProjectsList } from '@features/projects';
import ProjectsToolbar from './ProjectsToolbar';

const ProjectsPage = () => {
	return (
		<main>
			<ProjectsToolbar />
			<ProjectsList />
		</main>
	);
};

export default ProjectsPage;
