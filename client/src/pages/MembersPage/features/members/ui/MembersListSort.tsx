import { useAppDispatch } from '@shared/hooks/store.hooks';
import {
	setSort,
	getMembersRequest,
	type SortType
} from '../model/membersSlice';
import { useParams } from 'react-router-dom';

const MembersSortSelect = () => {
	const dispatch = useAppDispatch();
	const { id: workspaceId } = useParams<{ id: string }>();

	const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(setSort(e.target.value as SortType));
		if (workspaceId) {
			dispatch(getMembersRequest({ workspaceId }));
		}
	};

	return (
		<select onChange={onChange}>
			<option value='name'>По Имени</option>
			<option value='email'>По Почте</option>
			<option value='accesses'>По Доступу</option>
			<option value='tag'>По Тегу</option>
		</select>
	);
};

export default MembersSortSelect;
