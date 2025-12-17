import { getUserRequest } from '@features/user';
import { deleteUserRequest } from '@features/user';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { useForm } from '@shared/hooks/useForm';
import { Role } from '@shared/types/role.types';
import { useEffect, useState } from 'react';
import { profileRequest } from '../model/profileSlice';
import { Avatar } from '../../avatar';

const ProfileForm = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector(state => state.user);
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		dispatch(getUserRequest());
	}, [dispatch]);

	const { values, handleChange, isLoading, errors, setValues } = useForm(
		{
			name: user?.name || '',
			email: user?.email || '',
			description: user?.description || '',
			password: '',
			role: user?.role || Role.INDIVIDUAL
		},
		'profile'
	);

	useEffect(() => {
		if (user) {
			setValues({
				name: user.name || '',
				email: user.email || '',
				description: user.description || '',
				password: '',
				role: user.role
			});
		}
	}, [user, setValues]);

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleSave = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(profileRequest(values));
	};

	const handleCancel = () => {
		if (user) {
			setValues({
				name: user.name || '',
				email: user.email || '',
				description: user.description || '',
				password: '',
				role: user.role
			});
		}
		setIsEditing(false);
	};

	return (
		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
			<form
				onSubmit={handleSave}
				style={{ display: 'flex', flexDirection: 'column' }}
			>
				<input
					name='name'
					value={values.name}
					type='text'
					placeholder='Иван'
					onChange={handleChange}
					disabled={!isEditing}
				/>
				{errors.name && <span>{errors.name}</span>}
				<input
					name='email'
					value={values.email}
					type='email'
					placeholder='example@gmail.com'
					onChange={handleChange}
					disabled={!isEditing}
				/>
				{errors.email && <span>{errors.email}</span>}
				<input
					name='password'
					value={values.password}
					type='password'
					placeholder='********'
					onChange={handleChange}
					disabled={!isEditing}
				/>
				{errors.password && <span>{errors.password}</span>}
				<input
					name='description'
					placeholder='Описание...'
					value={values.description}
					onChange={handleChange}
					disabled={!isEditing}
				/>
				{errors.description && <span>{errors.description}</span>}

				{!isEditing ? (
					<button
						type='button'
						onClick={handleEdit}
						disabled={isLoading}
					>
						Редактировать
					</button>
				) : (
					<div>
						<button type='submit' disabled={isLoading}>
							Сохранить
						</button>
						<button
							type='button'
							onClick={handleCancel}
							disabled={isLoading}
						>
							Отмена
						</button>
					</div>
				)}

				<button
					type='button'
					onClick={() => dispatch(deleteUserRequest())}
					disabled={isLoading}
				>
					Удалить аккаунт
				</button>
			</form>
			<Avatar />
		</div>
	);
};

export default ProfileForm;
