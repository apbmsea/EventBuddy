import { useEffect } from 'react';
import { useParams, Outlet, useLocation } from 'react-router-dom';
import { sagaMiddleware } from '@app/store/store';
import { useAppSelector } from '@shared/hooks/store.hooks';
import { watchWorkspaceSaga } from '../model/workSpaceSaga';
import { sendPageEnter, sendPageLeave } from '@shared/websocket/shared/page';
import WorkSpaceHeader from './WorkSpaceHeader';
import WorkSpaceSidebar from './WorkSpaceSidebar';

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
		<main style={{ height: '100vh', overflow: 'hidden' }}>
			<WorkSpaceHeader />
			<div style={{ display: 'flex', height: '100%' }}>
				<WorkSpaceSidebar />
				<Outlet />
			</div>
		</main>
	);
};

export default WorkspacePage;
