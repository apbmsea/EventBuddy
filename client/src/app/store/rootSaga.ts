import { watchLogin } from '@pages/LoginPage/ui/feature/login';
import { watchRegistration } from '@pages/RegisterPage/ui/feature/registration';
import { all } from 'typed-redux-saga';

export default function* rootSaga() {
	yield all([watchLogin(), watchRegistration()]);
}
