import type { WSIncomingMessage, WSOutgoingMessage } from './websocket.types';

type Listener = (data: WSIncomingMessage) => void;

class WSClient {
	private socket: WebSocket | null = null;
	private listeners = new Set<Listener>();
	private openPromise: Promise<void> | null = null;

	connect(path: string): Promise<void> {
		if (this.socket && this.openPromise) return this.openPromise;

		this.socket = new WebSocket(
			`ws://${import.meta.env.VITE_SERVER_URL || 'localhost:8080'}${path}`
		);

		this.openPromise = new Promise(resolve => {
			this.socket!.onopen = () => resolve();
		});

		this.socket.onmessage = e => {
			const data = JSON.parse(e.data) as WSIncomingMessage;
			this.listeners.forEach(cb => cb(data));
		};

		this.socket.onclose = () => {
			this.socket = null;
			this.openPromise = null;
			this.listeners.clear();
		};

		return this.openPromise;
	}

	async send(message: WSOutgoingMessage) {
		if (!this.socket) return;
		if (this.socket.readyState !== WebSocket.OPEN) await this.openPromise;
		this.socket.send(JSON.stringify(message));
	}

	subscribe(cb: Listener): () => void {
		this.listeners.add(cb);
		return () => this.listeners.delete(cb);
	}

	disconnect() {
		this.socket?.close();
		this.socket = null;
		this.openPromise = null;
		this.listeners.clear();
	}
}

export const wsClient = new WSClient();
