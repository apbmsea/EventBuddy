import { avatarService } from '../model/avatarService';
import { uploadAvatar } from '@pages/SettingsModal/entities/avatar';
import { store } from '@app/store/store';
import { getUserRequest } from '@features/user';

jest.mock('@pages/SettingsPage/entities/avatar', () => ({
	uploadAvatar: jest.fn()
}));

jest.mock('@app/store/store', () => ({
	store: {
		dispatch: jest.fn()
	}
}));

jest.mock('@features/user', () => ({
	getUserRequest: jest.fn()
}));

globalThis.URL.createObjectURL = jest.fn(() => 'mock-url');
globalThis.URL.revokeObjectURL = jest.fn();

describe('AvatarService', () => {
	const mockFile = new File(['test'], 'test.png', { type: 'image/png' });
	let mockListener: jest.Mock;

	beforeEach(() => {
		jest.clearAllMocks();
		mockListener = jest.fn();
		avatarService['state'] = { isLoading: false, previewUrl: null };
		avatarService['listeners'] = [];
	});

	describe('subscribe', () => {
		it('добавляет слушателя и возвращает функцию отписки', () => {
			const unsubscribe = avatarService.subscribe(mockListener);

			expect(avatarService['listeners']).toContain(mockListener);

			unsubscribe();
			expect(avatarService['listeners']).not.toContain(mockListener);
		});
	});

	describe('getState', () => {
		it('возвращает текущее состояние', () => {
			const state = avatarService.getState();

			expect(state).toEqual({ isLoading: false, previewUrl: null });
		});
	});

	describe('uploadFile', () => {
		it('успешно загружает файл', async () => {
			jest.mocked(uploadAvatar).mockResolvedValue({
				avatarUrl: 'someurl'
			});
			avatarService.subscribe(mockListener);

			await avatarService.uploadFile(mockFile);

			expect(URL.createObjectURL).toHaveBeenCalledWith(mockFile);
			expect(uploadAvatar).toHaveBeenCalledWith(mockFile);
			expect(store.dispatch).toHaveBeenCalledWith(getUserRequest());
			expect(URL.revokeObjectURL).toHaveBeenCalledWith('mock-url');
			expect(avatarService.getState()).toEqual({
				isLoading: false,
				previewUrl: null
			});
		});

		it('обрабатывает ошибку загрузки', async () => {
			const error = new Error('Upload failed');
			jest.mocked(uploadAvatar).mockRejectedValue(error);
			avatarService.subscribe(mockListener);

			await expect(avatarService.uploadFile(mockFile)).rejects.toThrow(
				'Upload failed'
			);

			expect(URL.revokeObjectURL).toHaveBeenCalledWith('mock-url');
			expect(avatarService.getState()).toEqual({
				isLoading: false,
				previewUrl: null
			});
		});

		it('очищает предыдущий preview URL', async () => {
			avatarService['state'].previewUrl = 'old-url';
			jest.mocked(uploadAvatar).mockResolvedValue({ avatarUrl: '' });

			await avatarService.uploadFile(mockFile);

			expect(URL.revokeObjectURL).toHaveBeenCalledWith('old-url');
		});

		it('уведомляет слушателей об изменениях состояния', async () => {
			jest.mocked(uploadAvatar).mockResolvedValue({ avatarUrl: '' });
			avatarService.subscribe(mockListener);

			await avatarService.uploadFile(mockFile);

			expect(mockListener).toHaveBeenCalledWith({
				isLoading: true,
				previewUrl: 'mock-url'
			});
			expect(mockListener).toHaveBeenCalledWith({
				isLoading: false,
				previewUrl: null
			});
		});
	});
});
