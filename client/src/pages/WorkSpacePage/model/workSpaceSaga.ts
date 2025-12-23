import { call, take, put, fork } from 'typed-redux-saga';
import { wsClient } from '@shared/websocket/websocket.client';
import { createWSChannel } from '@shared/websocket/websocket.channel';
import { setActiveUsers } from './workSpaceSlice';
import type {
	WSIncomingMessage,
	WSOutgoingMessage
} from '@shared/websocket/websocket.types';
import type { User } from '@shared/types/user.type';
import type { ConnectedMember } from './workSpaceSlice';

import { setWorkspaceInfo } from './workSpaceSlice';
import type { Member } from '@pages/MembersPage/entities/member';

function* workspaceSaga(workspaceId: string, user: User & Partial<Member>) {
	const safeUser: ConnectedMember = {
		id: user.id,
		name: user.name,
		email: user.email,
		role: user.role,
		avatarUrl: user.avatarUrl,
		page: null,
		connections: 0,
		accesses: user.accesses ?? 'OWNER',
		tag: user.tag ?? ''
	};

	yield* call(
		[wsClient, wsClient.connect],
		`/workspace?workspaceId=${workspaceId}`
	);

	const joinMessage: WSOutgoingMessage = { type: 'join', user: safeUser };
	yield* call([wsClient, wsClient.send], joinMessage);

	yield* put(setWorkspaceInfo({ me: safeUser, projectId: workspaceId }));

	const channel = yield* call(createWSChannel);

	while (true) {
		const message: WSIncomingMessage = yield* take(channel);
		if (message?.type === 'presence') {
			yield* put(setActiveUsers(message.users));
		}
	}
}

export function* watchWorkspaceSaga(workspaceId: string, user: User) {
	yield fork(workspaceSaga, workspaceId, user);
}
