import { wsClient } from '../websocket.client';

export const sendPageEnter = (page: string) => {
	wsClient.send({
		type: 'page:enter',
		page
	});
};

export const sendPageLeave = () => {
	wsClient.send({ type: 'page:leave' });
};
