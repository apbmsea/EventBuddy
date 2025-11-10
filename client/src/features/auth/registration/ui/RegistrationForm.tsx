import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registrationRequest } from '../model/registrationSlice';
import type { RootState } from '@shared/types/store.types';
import { type RegistrationPayload } from '../model/registration.types';
import { Role } from '@shared/types/role.types';
import { Link } from 'react-router-dom';
import { Button, Input } from 'eventbuddy-ui';
import style from './RegistrationForm.module.scss';


const RegistrationForm: React.FC = () => {
	const dispatch = useDispatch();
	const { isLoading } = useSelector((state: RootState) => state.registration);

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

	const handleRoleChange = (role: Role) => {
		setFormData(prev => ({
			...prev,
			role
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(registrationRequest(formData));
	};

	return (
		<div className={style['registration-page']}>
		  {/* Заголовок ОТДЕЛЬНО сверху по центру */}
		  <div className={style['header-section']}>
			<h1 className={style.title}>Здесь начинается ваша продуктивность</h1>
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
				//   className={style.input}
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
				  autoComplete="new-password"
				//   className={style.input}
				  required
				/>
	  
<div className={style.accountType}>
  <div className={style.accountTypeButtons}>
    <Button
      type="button"
      variant={formData.role === Role.INDIVIDUAL ? 'primary' : 'secondary'}
      onClick={() => handleRoleChange(Role.INDIVIDUAL)}
      className={style.roleButton}
    >
      Для себя
    </Button>
    <Button
      type="button"
      variant={formData.role === Role.COMPANY ? 'primary' : 'secondary'}
      onClick={() => handleRoleChange(Role.COMPANY)}
      className={style.roleButton}
    >
      Для компании
    </Button>
  </div>
</div>
	  
				{/* Кнопка регистрации */}
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
	  
				{/* Ссылка на логин */}
				<div className={style.loginLink}>
				  Уже зарегистрированы?{' '}
				  <Link to="/auth/login" className={style.link}>
					Войти
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

export default RegistrationForm;