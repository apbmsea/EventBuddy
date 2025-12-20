import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { ConnectedUser } from '../model/workSpaceSlice';
import { Popover } from '@shared/ui/popover';
import { logoutRequest } from '@features/logout';
import { openModal } from '@features/modal';
import { getProjectsRequest } from '@features/projects/model/projectsSlice';

const WorkSpaceHeader = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const user = useAppSelector(state => state.user.user);
	const users = useAppSelector(state => state.workspace.users);
	const projects = useAppSelector(state => state.projects.projects);

	useEffect(() => {
		{
			dispatch(getProjectsRequest());
		}
	}, [dispatch]);

	const maxVisible = 4;
	const visibleUsers = users.slice(0, maxVisible);
	const visibleProjects = projects.slice(0, maxVisible);
	const currentValue = id ? `/projects/${id}/workspace/` : '/projects';

	const getUserPage = (user: ConnectedUser) => {
		if (user.page === 'null' || user.page === 'workspace') {
			return 'members';
		} else {
			return user.page;
		}
	};

	const [hoveredUser, setHoveredUser] = useState<ConnectedUser | null>(null);

	return (
		<header
			style={{
				width: '100%',
				height: '60px',
				borderBottom: '1px solid #333'
			}}
		>
			<div
				style={{
					padding: '7px 20px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between'
				}}
			>
				<section style={{ display: 'flex', gap: '100px' }}>
					<select
						value={currentValue}
						onChange={e => (window.location.href = e.target.value)}
					>
						{visibleProjects.map(project => (
							<option
								key={project.id}
								value={`/projects/${project.id}/workspace/`}
							>
								{project.title}
							</option>
						))}
						<option value='/projects'>Все проекты</option>
					</select>

					<div
						onClick={() => navigate('/home')}
						style={{ fontSize: '24px', cursor: 'pointer' }}
					>
						Event<span style={{ color: 'blue' }}>Buddy</span>
					</div>
				</section>

				<section style={{ display: 'flex', gap: '100px' }}>
					<div style={{ display: 'flex', gap: '5px' }}>
						{visibleUsers.map(user => (
							<div
								onClick={() => navigate(`${getUserPage(user)}`)}
								style={{ cursor: 'pointer' }}
								key={user.id}
								onMouseEnter={() => setHoveredUser(user)}
								onMouseLeave={() => setHoveredUser(null)}
							>
								<img
									style={{
										borderRadius: '32px',
										width: '40px',
										height: '40px'
									}}
									src={user.avatarUrl}
									alt=''
								/>
								{hoveredUser?.id === user.id && (
									<div
										style={{
											position: 'absolute',

											transform:
												'translateX(-35%) translateY(10%)',
											backgroundColor: '#fff',
											padding: '8px',
											borderRadius: '4px',
											boxShadow:
												'0 0 5px rgba(0,0,0,0.3)',
											zIndex: 10,
											whiteSpace: 'nowrap'
										}}
									>
										<div>
											<b>{user.name}</b>
										</div>
										<div>{user.email}</div>
									</div>
								)}
							</div>
						))}
						{users.length > maxVisible && (
							<div
								style={{
									borderRadius: '50%',
									width: '40px',
									height: '40px',
									backgroundColor: 'grey',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									fontWeight: 'bold',
									color: 'white'
								}}
							>
								+{users.length - maxVisible}
							</div>
						)}
					</div>

					<Popover
						trigger={
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '5px',
									cursor: 'pointer'
								}}
							>
								<img
									style={{
										borderRadius: '32px',
										width: '40px',
										height: '40px'
									}}
									src={user?.avatarUrl}
									alt=''
								/>
								<div>
									<p style={{ margin: 0 }}>{user?.name}</p>
									<span>{user?.email}</span>
								</div>
							</div>
						}
					>
						<button onClick={() => navigate('/mobile-app')}>
							Мобильное приложение
						</button>
						<button
							onClick={() => {
								dispatch(openModal('settings'));
							}}
						>
							Настройки
						</button>
						<div>--------------</div>
						<button onClick={() => dispatch(logoutRequest())}>
							Выход
						</button>
					</Popover>
				</section>
			</div>
		</header>
	);
};

export default WorkSpaceHeader;
