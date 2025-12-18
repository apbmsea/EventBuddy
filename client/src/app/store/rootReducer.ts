import { userReducer } from '@features/user';
import { logoutReducer } from '@features/logout';
import { refreshReducer } from '@features/refresh';
import { loginReducer } from '@pages/LoginPage/ui/feature/login';
import { recoveryReducer } from '@pages/RecoveryPage/ui/feature/recovery';
import { registrationReducer } from '@pages/RegisterPage/ui/feature/registration';
import { verifyReducer } from '@pages/VerifyPage/ui/feature/verify';
import { combineReducers } from '@reduxjs/toolkit';
import { profileReducer } from '@pages/SettingsModal/features/profile';
import { projectsReducer } from '@features/projects';
import { projectReducer } from '@features/project';
import { settingsReducer } from '@pages/SettingsModal';
import { projectEditReducer } from '@pages/SettingsModal/features/projectEdit';
import { projectCreateReducer } from '@features/projectCreate';

const rootReducer = combineReducers({
	user: userReducer,
	login: loginReducer,
	registration: registrationReducer,
	verify: verifyReducer,
	recovery: recoveryReducer,
	refresh: refreshReducer,
	logout: logoutReducer,
	profile: profileReducer,
	projects: projectsReducer,
	project: projectReducer,
	projectCreate: projectCreateReducer,
	projectEdit: projectEditReducer,
	settings: settingsReducer
});

export default rootReducer;
