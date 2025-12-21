import { openModal } from '@features/modal';
import { useAppDispatch } from '@shared/hooks/store.hooks';
import { MembersListSearch, MembersListSort } from '../features/members';

const MembersToolbar = () => {
	const dispatch = useAppDispatch();
	return (
		<section>
			<MembersListSearch />
			<MembersListSort />
			<button
				onClick={() => {
					dispatch(openModal('userSearch'));
				}}
			>
				Добавить юзера
			</button>
		</section>
	);
};

export default MembersToolbar;
