import { useEffect, useRef, useState } from 'react';

import {
	setSearch,
	getProjectsRequest
} from '@features/projects/model/projectsSlice';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';

const Search = () => {
	const dispatch = useAppDispatch();
	const searchValue = useAppSelector(state => state.projects.search);

	const [value, setValue] = useState(searchValue);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(() => {
			dispatch(setSearch(value));
			dispatch(getProjectsRequest());
		}, 500);

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [value, dispatch]);

	const handleClear = () => {
		setValue('');
		dispatch(setSearch(''));
		dispatch(getProjectsRequest());
	};

	return (
		<div>
			<input
				type='text'
				value={value}
				placeholder='Search projects'
				onChange={e => setValue(e.target.value)}
			/>

			{value && (
				<button type='button' onClick={handleClear}>
					X
				</button>
			)}
		</div>
	);
};

export default Search;
