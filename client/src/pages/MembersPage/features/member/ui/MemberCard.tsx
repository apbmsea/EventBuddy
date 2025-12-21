import type { Member } from '@pages/MembersPage/entities/member';

type MemberCardProps = {
	member: Member;
};

const MemberCard = ({ member }: MemberCardProps) => {
	return (
		<li>
			{member.name} {member.email} {member.accesses} {member.tag}
		</li>
	);
};

export default MemberCard;
