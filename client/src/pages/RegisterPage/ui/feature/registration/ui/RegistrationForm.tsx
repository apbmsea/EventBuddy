import React from 'react';
import { useAppDispatch } from '@shared/hooks/store.hooks';
import { useForm } from '@shared/hooks/useForm';
import { registrationRequest } from '../model/registrationSlice';
import { Role } from '@shared/types/role.types';
import { Link } from 'react-router-dom';

const RegistrationForm: React.FC = () => {
	const dispatch = useAppDispatch();

	const { values, handleChange, isLoading, errors, hasErrors } = useForm(
		{
			name: '',
			email: '',
			password: '',
			role: Role.INDIVIDUAL
		},
		'registration'
	);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		dispatch(
			registrationRequest({
				...values,
				role: values.role === 'Для себя' ? 'INDIVIDUAL' : 'COMPANY'
			})
		);
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				name='name'
				type='text'
				value={values.name}
				onChange={handleChange}
				placeholder='Имя'
				autoComplete='name'
				required
			/>
			{errors.name && <span>{errors.name}</span>}

			<input
				name='email'
				type='email'
				value={values.email}
				onChange={handleChange}
				placeholder='Email обязательное поле'
				autoComplete='email'
				required
			/>
			{errors.email && <span>{errors.email}</span>}

			<input
				name='password'
				type='password'
				value={values.password}
				onChange={handleChange}
				placeholder='Пароль обязательное поле'
				autoComplete='new-password'
				required
			/>
			{errors.password && <span>{errors.password}</span>}

			<label>
				<input
					type='radio'
					name='role'
					value={Role.INDIVIDUAL}
					checked={values.role === Role.INDIVIDUAL}
					onChange={handleChange}
				/>
				<span>{Role.INDIVIDUAL}</span>
			</label>
			<label>
				<input
					type='radio'
					name='role'
					value={Role.COMPANY}
					checked={values.role === Role.COMPANY}
					onChange={handleChange}
				/>
				<span>{Role.COMPANY}</span>
			</label>
			{errors.role && <span>{errors.role}</span>}

			<button type='submit' disabled={isLoading || hasErrors}>
				Продолжить
			</button>

			<div>
				Уже зарегистрированы?
				<Link to='/auth/login'>Войти</Link>
			</div>
		</form>
	);
};

export default RegistrationForm;
