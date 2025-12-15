import { uploadAvatar } from '@pages/SettingsPage/entities/avatar';
import { store } from '@app/store/store';
import { getUserRequest } from '@features/user';

type AvatarState = {
	isLoading: boolean;
	previewUrl: string | null;
};

type StateListener = (state: AvatarState) => void;

class AvatarService {
	private state: AvatarState = {
		isLoading: false,
		previewUrl: null
	};
	private listeners: StateListener[] = [];

	subscribe(listener: StateListener) {
		this.listeners.push(listener);
		return () => {
			this.listeners = this.listeners.filter(l => l !== listener);
		};
	}

	getState() {
		return this.state;
	}

	private setState(newState: Partial<AvatarState>) {
		this.state = { ...this.state, ...newState };
		this.listeners.forEach(listener => listener(this.state));
	}

	async uploadFile(file: File) {
		if (this.state.previewUrl) {
			URL.revokeObjectURL(this.state.previewUrl);
		}

		const previewUrl = URL.createObjectURL(file);
		this.setState({ previewUrl, isLoading: true });

		try {
			await uploadAvatar(file);
			store.dispatch(getUserRequest());
			URL.revokeObjectURL(previewUrl);
			this.setState({ previewUrl: null, isLoading: false });
		} catch (error) {
			URL.revokeObjectURL(previewUrl);
			this.setState({ previewUrl: null, isLoading: false });
			throw error;
		}
	}
}

export const avatarService = new AvatarService();
