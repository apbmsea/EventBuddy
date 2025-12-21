import { useEffect, useState } from 'react';
import { useAppDispatch } from '@shared/hooks/store.hooks';
import { setSearch, getMembersRequest } from '../model/membersSlice';
import { useParams } from 'react-router-dom';

const MembersSearchInput = () => {
	const [value, setValue] = useState('');
	const dispatch = useAppDispatch();
	const { id: workspaceId } = useParams<{ id: string }>();

	useEffect(() => {
		const timer = setTimeout(() => {
			dispatch(setSearch(value));
			if (workspaceId) {
				dispatch(getMembersRequest({ workspaceId }));
			}
		}, 400);

		return () => clearTimeout(timer);
	}, [value, dispatch, workspaceId]);

	return (
		<input
			placeholder='Поиск по участникам'
			value={value}
			onChange={e => setValue(e.target.value)}
		/>
	);
};

export default MembersSearchInput;
