import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import type { LoginPayload } from '@pages/LoginPage/ui/entities/login';
import { loginFailure, loginRequest } from '../model/loginSlice';
import { Link } from 'react-router-dom';

const LoginForm = () => {
	const dispatch = useAppDispatch();
	const { isLoading } = useAppSelector(state => state.login);

	useEffect(() => {
		dispatch(loginFailure({}));
	}, []);

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
		<form onSubmit={handleSubmit}>
			<input
				name='email'
				type='email'
				value={formData.email}
				onChange={handleChange}
				placeholder='Email обязательное поле'
				autoComplete='email'
			/>

			<input
				name='password'
				type='password'
				value={formData.password}
				onChange={handleChange}
				placeholder='Пароль обязательное поле'
				autoComplete='current-password'
			/>

			<button type='submit' disabled={isLoading}>
				Продолжить
			</button>

			<div>
				Нет аккаунта?
				<Link to='/auth/registration'>Зарегистрироваться</Link>
			</div>
		</form>
	);
};

export default LoginForm;
