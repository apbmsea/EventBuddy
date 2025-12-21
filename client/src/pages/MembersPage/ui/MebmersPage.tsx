import { openModal } from '@features/modal';
import { MembersList } from '../features/members';
import { useAppDispatch } from '@shared/hooks/store.hooks';

const MebmersPage = () => {
	const dispatch = useAppDispatch();
	return (
		<main>
			<div>
				<button
					onClick={() => {
						dispatch(openModal('userSearch'));
					}}
				>
					Добавить юзера
				</button>
			</div>
			<MembersList />
		</main>
	);
};
export default MebmersPage;
