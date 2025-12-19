import { useAppDispatch } from '@shared/hooks/store.hooks';
import { Search } from '../features/search';
import { Sorting } from '../features/sorting';
import { ViewSwitcher } from '../features/view';
import { openModal } from '@features/modal';

const ProjectsToolbar = () => {
	const dispatch = useAppDispatch();
	return (
		<section style={{ display: 'flex', alignItems: 'center' }}>
			<Search />
			<Sorting />
			<ViewSwitcher />
			<button
				onClick={() => {
					dispatch(openModal('projectCreate'));
				}}
			>
				Новый проект
			</button>
		</section>
	);
};

export default ProjectsToolbar;
