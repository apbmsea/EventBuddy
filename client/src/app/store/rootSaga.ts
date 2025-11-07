import { watchLogin } from '@features/auth/login';
import { watchLogout } from '@features/auth/logout';
import { watchRecovery } from '@features/auth/recovery';
import { watchRefresh } from '@features/auth/refresh';
import { watchRegistration } from '@features/auth/registration';
import { watchVerify } from '@features/auth/verify';
import { all } from 'typed-redux-saga';

export default function* rootSaga() {
	yield all([
		watchRegistration(),
		watchLogin(),
		watchLogout(),
		watchVerify(),
		watchRefresh(),
		watchRecovery()
	]);
}