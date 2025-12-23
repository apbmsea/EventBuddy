import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { useEffect, useState } from 'react';
import { searchUsersRequest } from '../model/userSearchSlice';
import { inviteMemberRequest } from '../../member/model/memberSlice';
import { useParams } from 'react-router-dom';

const UserSearch = () => {
	const dispatch = useAppDispatch();
	const users = useAppSelector(state => state.userSearch.users);
	const loading = useAppSelector(state => state.userSearch.loading);

	const [query, setQuery] = useState('');
	const [debouncedQuery, setDebouncedQuery] = useState('');
	const { id: workspaceId } = useParams<{ id: string }>();

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedQuery(query);
		}, 400);

		return () => clearTimeout(timer);
	}, [query]);

	useEffect(() => {
		dispatch(searchUsersRequest(debouncedQuery));
	}, [debouncedQuery, dispatch]);

	return (
		<section>
			<input
				value={query}
				onChange={e => setQuery(e.target.value)}
				placeholder='Поиск пользователя...'
			/>

			{loading && <div>Loading...</div>}

			<ul>
				{users.map(user => (
					<li
						key={user.id}
						onClick={() =>
							dispatch(
								inviteMemberRequest({
									projectId: workspaceId || '',
									email: user.email
								})
							)
						}
					>
						{user.name} ({user.email})
					</li>
				))}
			</ul>
		</section>
	);
};

export default UserSearch;
