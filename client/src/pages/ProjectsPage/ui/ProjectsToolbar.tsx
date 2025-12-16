import { Search } from '../features/search';
import { Sorting } from '../features/sorting';
import { ViewSwitcher } from '../features/view';

const ProjectsToolbar = () => {
	return (
		<section style={{ display: 'flex', alignItems: 'center' }}>
			<Search />
			<Sorting />
			<ViewSwitcher />
		</section>
	);
};

export default ProjectsToolbar;
