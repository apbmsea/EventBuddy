import { eventChannel } from 'redux-saga';
import { wsClient } from './websocket.client';
import type { WSIncomingMessage } from './websocket.types';

export function createWSChannel() {
	return eventChannel<WSIncomingMessage>(emitter => {
		const unsubscribe = wsClient.subscribe(msg => emitter(msg));
		return () => unsubscribe();
	});
}
