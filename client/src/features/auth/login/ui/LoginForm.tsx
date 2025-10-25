import type { RootState } from '@shared/types/store.types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { LoginPayload } from '../model/login.types';
import { loginRequest } from '../model/loginSlice';
import { Link } from 'react-router-dom';

const LoginForm = () => {
	const dispatch = useDispatch();
	const { isLoading } = useSelector((state: RootState) => state.registration);

	const [formData, setFormData] = useState<LoginPayload>({
		email: '',
		password: ''
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(loginRequest(formData));
	};

	return (
		<form
			onSubmit={handleSubmit}
			style={{ display: 'flex', flexDirection: 'column', width: '600px' }}
		>
			<label>
				<span>Почта</span>
				<input
					value={formData.email}
					onChange={handleChange}
					name='email'
					type='email'
					placeholder='email@gmail.com'
					autoComplete='email'
				/>
			</label>
			<label>
				<span>Пароль</span>
				<input
					value={formData.password}
					onChange={handleChange}
					name='password'
					type='password'
					placeholder='password'
					autoComplete='new-password'
				/>
			</label>
			<button type='submit' disabled={isLoading}>
				Продолжить
			</button>

			<div>
				<p>
					Продолжая, вы даете согласие на
					<span> сбор, обработку и хранение персональных данных</span>
				</p>

				<p>
					Нет аккаунта? <Link to={'/auth/registration'}>Зарегистрироваться</Link>
				</p>
			</div>
		</form>
	);
};

export default LoginForm;
