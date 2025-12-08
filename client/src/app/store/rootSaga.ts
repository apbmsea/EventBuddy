import { watchLogin } from '@pages/LoginPage/ui/feature/login';
import { all } from 'typed-redux-saga';

export default function* rootSaga() {
	yield all([
		watchLogin()
	]);
}
