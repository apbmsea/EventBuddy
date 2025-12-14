import type { RootState } from '@shared/types/store.types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyRequest } from '../model/verifySlice';
import { useForm } from '@shared/hooks/useForm';

const VerifyForm: React.FC = () => {
	const dispatch = useDispatch();
	const { verifyEmail } = useSelector((state: RootState) => state.verify);

	const { values, handleChange, isLoading, errors, hasErrors } = useForm(
		{
			email: verifyEmail,
			code: 0
		},
		'verify'
	);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(verifyRequest(values));
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>Подтверждение почты</h2>
			<p>
				Отправили код
				<br /> на адрес <span>{values.email}</span>
			</p>
			<input
				type='number'
				name='code'
				value={values.code === 0 ? '' : values.code}
				onChange={handleChange}
				placeholder='Введите код'
				required
			/>
			{errors.code && <span>{errors.code}</span>}
			<button disabled={isLoading || hasErrors} type='submit'>
				Продолжить
			</button>
		</form>
	);
};

export default VerifyForm;
