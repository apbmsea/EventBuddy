import type { Project } from '@entities/project';

type ProjectCardPayload = {
	project: Project;
};

const ProjectCard = ({ project }: ProjectCardPayload) => {
	return (
		<li key={project.id}>
			{project.title} {project.description} {project.deadline}{' '}
			{project.updatedAt} <img src={project.owner.avatarUrl} alt='' />
		</li>
	);
};

export default ProjectCard;
