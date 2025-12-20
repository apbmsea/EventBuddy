import { useEffect } from 'react';
import { useParams, Outlet, useLocation, NavLink } from 'react-router-dom';
import { sagaMiddleware } from '@app/store/store';
import { useAppSelector } from '@shared/hooks/store.hooks';
import { watchWorkspaceSaga } from '../model/workSpaceSaga';
import { sendPageEnter, sendPageLeave } from '@shared/websocket/shared/page';
import WorkSpaceHeader from './WorkSpaceHeader';

const WorkspacePage = () => {
	const user = useAppSelector(state => state.user.user);
	const { id: workspaceId } = useParams<{ id: string }>();
	const location = useLocation();

	useEffect(() => {
		if (!workspaceId || !user) return;

		const task = sagaMiddleware.run(watchWorkspaceSaga, workspaceId, user);

		return () => task.cancel();
	}, [user, workspaceId]);

	useEffect(() => {
		if (!workspaceId || !user) return;
		const page = location.pathname.split('/').pop() || 'null';
		sendPageEnter(page);

		return () => sendPageLeave();
	}, [location.pathname, user, workspaceId]);

	return (
		<main style={{ height: '100vh' }}>
			<WorkSpaceHeader />
			<div style={{ display: 'flex' }}>
				<nav>
					<NavLink to='chat'>Chat</NavLink>
					<NavLink to='todo'>Todo</NavLink>
				</nav>
				<Outlet />
			</div>
		</main>
	);
};

export default WorkspacePage;
