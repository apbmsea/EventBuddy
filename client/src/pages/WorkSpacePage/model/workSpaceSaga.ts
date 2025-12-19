import { call, take, put, fork } from 'typed-redux-saga';
import { wsClient } from '@shared/websocket/websocket.client';
import { createWSChannel } from '@shared/websocket/websocket.channel';
import { setActiveUsers } from './workSpaceSlice';
import type {
	WSIncomingMessage,
	WSOutgoingMessage
} from '@shared/websocket/websocket.types';
import type { User } from '@shared/types/user.type';
import type { ConnectedUser } from './workSpaceSlice';

function* workspaceSaga(workspaceId: string, user: User) {
	const safeUser: Omit<ConnectedUser, 'connections'> = {
		id: user.id,
		name: user.name,
		email: user.email,
		role: user.role,
		avatarUrl: user.avatarUrl,
		page: null
	};

	yield* call(
		[wsClient, wsClient.connect],
		`/workspace?workspaceId=${workspaceId}`
	);

	const joinMessage: WSOutgoingMessage = { type: 'join', user: safeUser };
	yield* call([wsClient, wsClient.send], joinMessage);

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
