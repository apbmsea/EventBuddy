import { useAppSelector } from '@shared/hooks/store.hooks';
import { NavLink } from 'react-router-dom';

const SIDEBAR_LINKS = [
	{ id: 'chat', title: 'Чат', icon: '', path: 'chat' },
	{ id: 'todo', title: 'Todo', icon: '', path: 'todo' },
	{ id: 'members', title: 'Участники', icon: '', path: 'members' }
];

const WorkSpaceSidebar = () => {
	const users = useAppSelector(state => state.workspace.users);

	return (
		<aside
			style={{
				width: '260px',
				height: '100%',
				borderRight: '1px solid #333',
				display: 'flex',
				flexDirection: 'column',
				padding: '20px 10px',
				gap: '10px',
				color: 'white'
			}}
		>
			{SIDEBAR_LINKS.map(link => {
				const usersOnPage = users.filter(u => u.page === link.id);

				return (
					<NavLink
						key={link.id}
						to={link.path}
						style={({ isActive }) => ({
							height: '30px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							padding: '10px 15px',
							borderRadius: '8px',
							textDecoration: 'none',
							border: `1px solid ${isActive ? '#0077ffff' : '#333'}`,
							color: isActive ? '#0077ffff' : '#333',
							transition: 'background 0.2s'
						})}
					>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '10px'
							}}
						>
							<span>{link.icon}</span>
							<span style={{ fontWeight: 500 }}>
								{link.title}
							</span>
						</div>

						<div style={{ display: 'flex', marginLeft: '10px' }}>
							{usersOnPage.map((user, index) => (
								<img
									key={user.id}
									src={user.avatarUrl}
									title={user.name}
									style={{
										width: '24px',
										height: '24px',
										borderRadius: '50%',
										border: '1px solid #333',
										marginLeft: index === 0 ? 0 : '-10px',
										zIndex: 10 - index,
										objectFit: 'cover'
									}}
								/>
							))}
						</div>
					</NavLink>
				);
			})}
		</aside>
	);
};

export default WorkSpaceSidebar;
