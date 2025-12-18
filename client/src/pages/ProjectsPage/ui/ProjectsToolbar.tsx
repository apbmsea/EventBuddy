import { useAppDispatch } from '@shared/hooks/store.hooks';
import { Search } from '../features/search';
import { Sorting } from '../features/sorting';
import { ViewSwitcher } from '../features/view';
import { setIsOpen } from '@features/projectCreate/model/projectCreateSlice';

const ProjectsToolbar = () => {
	const dispatch = useAppDispatch();
	return (
		<section style={{ display: 'flex', alignItems: 'center' }}>
			<Search />
			<Sorting />
			<ViewSwitcher />
			<button onClick={() => dispatch(setIsOpen(true))}>
				Новый проект
			</button>
		</section>
	);
};

export default ProjectsToolbar;
