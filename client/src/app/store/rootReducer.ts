import { userReducer } from '@features/user';
import { logoutReducer } from '@features/logout';
import { refreshReducer } from '@features/refresh';
import { loginReducer } from '@pages/LoginPage/ui/feature/login';
import { recoveryReducer } from '@pages/RecoveryPage/ui/feature/recovery';
import { registrationReducer } from '@pages/RegisterPage/ui/feature/registration';
import { verifyReducer } from '@pages/VerifyPage/ui/feature/verify';
import { combineReducers } from '@reduxjs/toolkit';
import { profileReducer } from '@pages/SettingsPage/features/profile';
import { projectsReducer } from '@features/projects';
import { projectReducer } from '@features/project';
import { settingsReducer } from '@pages/SettingsPage';
import { projectEditReducer } from '@pages/SettingsPage/features/projectEdit';
import { projectCreateReducer } from '@pages/ProjectsPage/features/projectCreate';
import { modalReducer } from '@features/modal';

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
	settings: settingsReducer,
	modal: modalReducer
});

export default rootReducer;
