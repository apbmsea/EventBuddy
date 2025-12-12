import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { registrationRequest } from '../model/registrationSlice';
import { type RegistrationPayload } from '@pages/RegisterPage/ui/entities/registration';
import { Role } from '@shared/types/role.types';
import { Link } from 'react-router-dom';

const RegistrationForm: React.FC = () => {
	const dispatch = useAppDispatch();
	const { isLoading } = useAppSelector(state => state.registration);

	const [formData, setFormData] = useState<RegistrationPayload>({
		email: '',
		password: '',
		role: 'INDIVIDUAL'
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value
		}));
	};
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(registrationRequest(formData));
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
				required
			/>

			<input
				name='password'
				type='password'
				value={formData.password}
				onChange={handleChange}
				placeholder='Пароль обязательное поле'
				autoComplete='new-password'
				required
			/>

			<label>
				<input
					type='radio'
					name='role'
					value={Role.INDIVIDUAL}
					checked={formData.role === Role.INDIVIDUAL}
					onChange={handleChange}
				/>
				<span>{Role.INDIVIDUAL}</span>
			</label>
			<label>
				<input
					type='radio'
					name='role'
					value={Role.COMPANY}
					checked={formData.role === Role.COMPANY}
					onChange={handleChange}
				/>
				<span>{Role.COMPANY}</span>
			</label>

			<button type='submit' disabled={isLoading}>
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
