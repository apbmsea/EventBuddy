import { LoginForm } from '@features/auth/login';
import { RecoveryForm } from '@features/auth/recovery';
import { RegistrationForm } from '@features/auth/registration';
import { VerifyForm } from '@features/auth/verify';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const AuthPage: React.FC = () => {
	return (
		<Routes>
			<Route path='registration' element={<RegistrationForm />} />
			<Route path='login' element={<LoginForm />} />
			<Route path='verify' element={<VerifyForm />} />
			<Route path='recovery' element={<RecoveryForm />} />
		</Routes>
	);
};

export default AuthPage;
