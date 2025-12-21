import type { Member } from '@pages/MembersPage/entities/member';
import { useAppDispatch } from '@shared/hooks/store.hooks';
import { deleteMemberRequest } from '../model/memberSlice';
import { useParams } from 'react-router-dom';

type MemberCardProps = {
	member: Member;
};

const MemberCard = ({ member }: MemberCardProps) => {
	const dispatch = useAppDispatch();
	const { id: workspaceId } = useParams<{ id: string }>();
	return (
		<li>
			{member.name} {member.email} {member.accesses} {member.tag}{' '}
			<button
				onClick={() =>
					dispatch(
						deleteMemberRequest({
							projectId: workspaceId || '',
							email: member.email
						})
					)
				}
			>
				Удалить юзера
			</button>
		</li>
	);
};

export default MemberCard;
