import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registrationRequest } from '../model/registrationSlice';
import type { RootState } from '@shared/types/store.types';
import { type RegistrationPayload } from '../model/registration.types';
import { Role } from '@shared/types/role.types';
import { Link } from 'react-router-dom';

const RegistrationForm: React.FC = () => {
	const dispatch = useDispatch();
	const { isLoading } = useSelector((state: RootState) => state.registration);

	const [formData, setFormData] = useState<RegistrationPayload>({
		email: '',
		password: '',
		role: Role.INDIVIDUAL
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
				<p>
					Продолжая, вы даете согласие на
					<span> сбор, обработку и хранение персональных данных</span>
				</p>

				<p>
					Уже зарегистрированы? <Link to={'/auth/login'}>Войти</Link>
				</p>
			</div>
		</form>
	);
};

export default RegistrationForm;
