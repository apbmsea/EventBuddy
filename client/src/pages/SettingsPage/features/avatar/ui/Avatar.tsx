import { useRef, useState, useEffect } from 'react';
import { avatarService } from '../model/avatarService';
import { useAppSelector } from '@shared/hooks/store.hooks';

export const Avatar = () => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [avatarState, setAvatarState] = useState(avatarService.getState());
	const { user } = useAppSelector(state => state.user);

	useEffect(() => {
		return avatarService.subscribe(setAvatarState);
	}, []);

	const handleFileSelect = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0];
		if (file) {
			try {
				await avatarService.uploadFile(file);
			} catch (error) {
				console.error('Ошибка загрузки файла:', error);
			}
		}
	};

	const handleChangeClick = () => {
		fileInputRef.current?.click();
	};

	const getAvatarDisplay = () => {
		if (avatarState.previewUrl) {
			return <img src={avatarState.previewUrl} alt='Предпросмотр' />;
		}

		if (user?.avatarUrl) {
			return <img src={user.avatarUrl} alt='Аватар' />;
		}

		const initials = user?.email?.charAt(0).toUpperCase() || '?';
		return <div>{initials}</div>;
	};

	return (
		<div>
			<div>{getAvatarDisplay()}</div>
			<button
				onClick={handleChangeClick}
				disabled={avatarState.isLoading}
			>
				{avatarState.isLoading ? 'Загрузка...' : 'Изменить'}
			</button>
			<input
				ref={fileInputRef}
				type='file'
				accept='image/*'
				onChange={handleFileSelect}
				style={{ display: 'none' }}
			/>
		</div>
	);
};
