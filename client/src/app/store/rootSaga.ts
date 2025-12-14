import { watchRefresh } from '@features/refresh';
import { watchLogin } from '@pages/LoginPage/ui/feature/login';
import { watchRecovery } from '@pages/RecoveryPage/ui/feature/recovery';
import { watchRegistration } from '@pages/RegisterPage/ui/feature/registration';
import { watchVerify } from '@pages/VerifyPage/ui/feature/verify';
import { all } from 'typed-redux-saga';

export default function* rootSaga() {
	yield all([
		watchLogin(),
		watchRegistration(),
		watchVerify(),
		watchRecovery(),
		watchRefresh()
	]);
}
