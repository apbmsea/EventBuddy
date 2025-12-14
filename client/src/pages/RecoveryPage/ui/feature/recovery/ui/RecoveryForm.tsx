import React from 'react';
import { useDispatch } from 'react-redux';
import { recoveryRequest } from '../model/recoverySlice';
import { useForm } from '@shared/hooks/useForm';

const RecoveryForm: React.FC = () => {
	const dispatch = useDispatch();
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(recoveryRequest(values));
	};

	const { values, handleChange, isLoading, errors, hasErrors } = useForm(
		{
			email: ''
		},
		'recovery'
	);

	return (
		<form onSubmit={handleSubmit}>
			<h2>Восстановление аккаунта</h2>
			<input
				type='text'
				placeholder='email'
				value={values.email}
				onChange={handleChange}
			/>
			{errors.email && <p>{errors.email}</p>}
			<button disabled={hasErrors || isLoading} type='submit'>
				Продолжить
			</button>
		</form>
	);
};

export default RecoveryForm;
