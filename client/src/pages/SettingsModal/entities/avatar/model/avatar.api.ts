import { $api } from '@shared/api/instance';

export const uploadAvatar = async (
	file: File
): Promise<{ avatarUrl: string }> => {
	const formData = new FormData();
	formData.append('avatar', file);

	const response = await $api.post('/user/avatar', formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});

	return response.data;
};
