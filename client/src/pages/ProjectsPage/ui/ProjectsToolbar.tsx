import { Search } from '../features/search';
import { ViewSwitcher } from '../features/view';

const ProjectsToolbar = () => {
	return (
		<section>
			<Search />
			<ViewSwitcher />
		</section>
	);
};

export default ProjectsToolbar;
