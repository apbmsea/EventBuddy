import React, { useState } from 'react';
import type { RecoveryPayload } from '../model/recovery.types';
import { useDispatch } from 'react-redux';
import { recoveryRequest } from '../model/recoverySlice';

const RecoveryForm: React.FC = () => {
	const dispatch = useDispatch();
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(recoveryRequest(formData));
	};

	const [formData, setFormData] = useState<RecoveryPayload>({
		email: ''
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>Восстановление аккаунта</h2>
			<input
				type='text'
				placeholder='email'
				value={formData.email}
				onChange={handleChange}
			/>
			<button type='submit'>Продолжить</button>
		</form>
	);
};

export default RecoveryForm;
