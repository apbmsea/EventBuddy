import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import {
	getProjectsRequest,
	setSort
} from '@features/projects/model/projectsSlice';
import type { SortOption } from '@pages/ProjectsPage/entities/sorting';

const SortSelect = () => {
	const dispatch = useAppDispatch();
	const sort = useAppSelector(state => state.projects.sort);

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(setSort(e.target.value as SortOption));
		dispatch(getProjectsRequest());
	};

	return (
		<select value={sort} onChange={handleChange}>
			<option value='updated'>По дате обновления</option>
			<option value='deadline'>По дедлайну</option>
			<option value='title'>По названию</option>
			<option value='active'>Сначала активные</option>
			<option value='archived'>Сначала закрытые</option>
		</select>
	);
};

export default SortSelect;
