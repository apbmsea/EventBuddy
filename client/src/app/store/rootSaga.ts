import { watchLogout } from '@features/logout';
import { watchRefresh } from '@features/refresh';
import { watchUser } from '@features/user/model/userSaga';
import { watchLogin } from '@pages/LoginPage/ui/feature/login';
import { watchProjects } from '@features/projects';
import { watchRecovery } from '@pages/RecoveryPage/ui/feature/recovery';
import { watchRegistration } from '@pages/RegisterPage/ui/feature/registration';
import { watchProfile } from '@pages/SettingsModal/features/profile';
import { watchVerify } from '@pages/VerifyPage/ui/feature/verify';
import { all } from 'typed-redux-saga';
import { watchProject } from '@features/project';
import { watchEditProject } from '@pages/SettingsModal/features/projectEdit';
import { watchCreateProject } from '@features/projectCreate';

export default function* rootSaga() {
	yield all([
		watchUser(),
		watchLogin(),
		watchRegistration(),
		watchVerify(),
		watchRecovery(),
		watchRefresh(),
		watchLogout(),
		watchProfile(),
		watchProjects(),
		watchEditProject(),
		watchCreateProject(),
		watchProject()
	]);
}
