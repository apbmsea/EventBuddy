import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import MemberCard from '../../member/ui/MemberCard';
import { useEffect } from 'react';
import { getMembersRequest } from '../model/membersSlice';
import { useParams } from 'react-router-dom';

const MembersList = () => {
	const members = useAppSelector(state => state.members.members);
	const { id: workspaceId } = useParams<{ id: string }>();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getMembersRequest(workspaceId || ''));
	}, [dispatch, workspaceId]);

	return (
		<ul>
			{members.map(member => (
				<MemberCard key={member.email} member={member} />
			))}
		</ul>
	);
};

export default MembersList;
