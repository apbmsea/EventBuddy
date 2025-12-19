import type { ConnectedUser } from '@pages/WorkSpacePage/model/workSpaceSlice';

export type WSIncomingMessage = {
	type: 'presence';
	users: ConnectedUser[];
};

export type WSOutgoingMessage =
	| { type: 'join'; user: Omit<ConnectedUser, 'connections'> }
	| { type: 'page:enter'; page: string }
	| { type: 'page:leave' };
