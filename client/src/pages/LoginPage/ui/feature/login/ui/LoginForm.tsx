import React from 'react';
import { useAppDispatch } from '@shared/hooks/store.hooks';
import { useForm } from '@shared/hooks/useForm';
import { loginRequest } from '../model/loginSlice';
import { Link } from 'react-router-dom';

const LoginForm = () => {
	const dispatch = useAppDispatch();

	const { values, handleChange, isLoading, errors, hasErrors } = useForm(
		{
			email: '',
			password: ''
		},
		'login'
	);

	const test = 'test'

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(loginRequest(values));
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				name='email'
				type='email'
				value={values.email}
				onChange={handleChange}
				placeholder='Email обязательное поле'
				autoComplete='email'
			/>
			{errors.email && <span>{errors.email}</span>}

			<input
				name='password'
				type='password'
				value={values.password}
				onChange={handleChange}
				placeholder='Пароль обязательное поле'
				autoComplete='current-password'
			/>
			{errors.password && <span>{errors.password}</span>}

			<button type='submit' disabled={isLoading || hasErrors}>
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
