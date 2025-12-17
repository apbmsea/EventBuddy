import { uploadAvatar } from '../model/avatar.api';
import { $api } from '@shared/api/instance';

jest.mock('@shared/api/instance', () => ({
	$api: {
		post: jest.fn()
	}
}));
describe('uploadAvatar', () => {
	const mockFile = new File(['avatar'], 'avatar.png', {
		type: 'image/png'
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('отправляет файл как multipart/form-data', async () => {
		($api.post as jest.Mock).mockResolvedValue({
			data: { avatarUrl: 'https://cdn/avatar.png' }
		});

		await uploadAvatar(mockFile);

		expect($api.post).toHaveBeenCalledTimes(1);

		const [url, formData, config] = ($api.post as jest.Mock).mock.calls[0];

		expect(url).toBe('/user/avatar');
		expect(formData).toBeInstanceOf(FormData);
		expect(config.headers['Content-Type']).toBe('multipart/form-data');
	});

	it('кладёт файл в FormData под ключом avatar', async () => {
		($api.post as jest.Mock).mockResolvedValue({
			data: { avatarUrl: 'https://cdn/avatar.png' }
		});

		await uploadAvatar(mockFile);

		const [, formData] = ($api.post as jest.Mock).mock.calls[0];

		const entries = Array.from((formData as FormData).entries());
		expect(entries).toHaveLength(1);
		expect(entries[0][0]).toBe('avatar');
		expect(entries[0][1]).toBe(mockFile);
	});

	it('возвращает avatarUrl из response.data', async () => {
		const response = {
			data: { avatarUrl: 'https://cdn/avatar.png' }
		};

		($api.post as jest.Mock).mockResolvedValue(response);

		const result = await uploadAvatar(mockFile);

		expect(result).toEqual(response.data);
	});

	it('пробрасывает ошибку, если запрос упал', async () => {
		($api.post as jest.Mock).mockRejectedValue(new Error('Network error'));

		await expect(uploadAvatar(mockFile)).rejects.toThrow('Network error');
	});
});
