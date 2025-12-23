import { useState } from 'react';
import type { Member } from '@pages/MembersPage/entities/member';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { deleteMemberRequest, updateMemberRequest } from '../model/memberSlice';
import { useParams } from 'react-router-dom';

type MemberCardProps = {
	member: Member;
};

const MemberCard = ({ member }: MemberCardProps) => {
	const dispatch = useAppDispatch();
	const { id: workspaceId } = useParams<{ id: string }>();

	const [tag, setTag] = useState(member.tag || '');
	const [access, setAccess] = useState<Member['accesses']>(member.accesses);

	const currentUser = useAppSelector(state => state.workspace.me);

	if (!currentUser) return null;

	const isOwner = currentUser.accesses === 'OWNER';
	const isAdmin = currentUser.accesses === 'ADMIN';
	const isSelf = currentUser.email === member.email;

	const canEditTag = isOwner || (isAdmin && !isSelf);
	const canEditAccess = isOwner || isAdmin;

	const onTagBlur = () => {
		if (!canEditTag || tag === member.tag) return;

		dispatch(
			updateMemberRequest({
				projectId: workspaceId!,
				email: member.email,
				data: { tag }
			})
		);
	};

	const onAccessChange = (newAccess: Member['accesses']) => {
		if (newAccess === 'OWNER' && !isOwner) return;
		if (newAccess === member.accesses) return;

		setAccess(newAccess);

		dispatch(
			updateMemberRequest({
				projectId: workspaceId!,
				email: member.email,
				data: { accesses: newAccess }
			})
		);
	};

	return (
		<li style={{ marginBottom: 12 }}>
			<div>
				{member.name} — {member.email}
			</div>

			<select
				value={access}
				disabled={!canEditAccess}
				onChange={e =>
					onAccessChange(e.target.value as Member['accesses'])
				}
			>
				{['OWNER', 'ADMIN', 'MEMBER', 'VISITOR'].map(role => {
					if (role === 'OWNER' && !isOwner) return null;
					return (
						<option key={role} value={role}>
							{role}
						</option>
					);
				})}
			</select>

			<input
				type='text'
				value={tag}
				disabled={!canEditTag}
				placeholder='Без тега'
				onChange={e => setTag(e.target.value)}
				onBlur={onTagBlur}
				style={{ marginLeft: 8 }}
			/>

			<button
				disabled={!isOwner || member.accesses === 'OWNER'}
				onClick={() =>
					dispatch(
						deleteMemberRequest({
							projectId: workspaceId!,
							email: member.email
						})
					)
				}
				style={{ marginLeft: 8 }}
			>
				Удалить юзера
			</button>
		</li>
	);
};

export default MemberCard;
