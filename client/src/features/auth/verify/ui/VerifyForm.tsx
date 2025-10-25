import type { RootState } from '@shared/types/store.types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyRequest } from '../model/verifySlice';
import type { VerifyPayload } from '../model/verify.types';

const VerifyForm: React.FC = () => {
	const dispatch = useDispatch();
	const { verifyEmail } = useSelector((state: RootState) => state.verify);

	const [formData, setFormData] = useState<VerifyPayload>({
		email: verifyEmail,
		code: 0
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
		dispatch(verifyRequest(formData));
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>Подтверждение почты</h2>
			<p>
				Отправили код
				<br /> на адрес <span>{formData.email}</span>
			</p>
			<input
				type='number'
				value={formData.code}
				onChange={handleChange}
			/>
			{/* <p>Запросить новый код через 59 сек</p> //добавить таймер */}
			<button type='submit'>Продолжить</button>
		</form>
	);
};

export default VerifyForm;