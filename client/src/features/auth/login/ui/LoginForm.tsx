import type { RootState } from '@shared/types/store.types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { LoginPayload } from '../model/login.types';
import { loginRequest } from '../model/loginSlice';
import { Link } from 'react-router-dom';
import { Button, Input } from 'eventbuddy-ui';
import style from './LoginForm.module.scss';

const LoginForm = () => {
	const dispatch = useDispatch();
	const { isLoading } = useSelector((state: RootState) => state.login);

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
		<div className={style['login-page']}>
			{/* Заголовок ОТДЕЛЬНО сверху по центру */}
			<div className={style['header-section']}>
				<h1 className={style.title}>С возвращением!</h1>
				<p className={style.subtitle}>
					Наше приложение помогает делать рутину быстрее, а жизнь — интереснее. 
					Просто начните им пользоваться.
				</p>
			</div>
	  
			{/* Контент - два блока под заголовком */}
			<div className={style['content-section']}>
				{/* Левая часть - форма */}
				<div className={style['form-section']}>
					<form onSubmit={handleSubmit} className={style.form}>
						{/* Email */}
						<Input
				  label="Email"
				  name="email"
				  type="email"
				  value={formData.email}
				  onChange={handleChange}
				  placeholder="Email обязательное поле"
				  autoComplete="email"
				  className={style.input}
							required
						/>
		  
						{/* Пароль */}
						<Input
							label="Пароль"
							name="password"
							type="password"
							value={formData.password}
							onChange={handleChange}
							placeholder="Пароль обязательное поле"
							autoComplete="current-password"
							className={style.input}
							required
						/>
		  
						{/* Кнопка входа */}
						<Button 
							variant="primary" 
							type="submit"
							loading={isLoading}
							disabled={isLoading}
							className={style.submitButton}
						>
							Продолжить
						</Button>
		  
						{/* Соглашение */}
						<p className={style.agreement}>
							Продолжая, вы даете согласие на{' '}
							<span>сбор, обработку и хранение персональных данных</span>
						</p>
		  
						{/* Ссылка на регистрацию */}
						<div className={style.registrationLink}>
							Нет аккаунта?{' '}
							<Link to="/auth/registration" className={style.link}>
								Зарегистрироваться
							</Link>
						</div>
					</form>
				</div>
		  
				{/* Правая часть - картинка */}
				<div className={style['image-section']}>
			  <div className={style.imageContainer}>
				<img 
				  src="/src/shared/assets/images/registration-image.png" 
				  alt="Регистрация" 
				  className={style.image} 
				/>
			  </div>
			</div>
			</div>
		</div>
	);
};

export default LoginForm;