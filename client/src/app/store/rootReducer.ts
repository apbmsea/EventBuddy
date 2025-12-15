import { userReducer } from '@features/user';
import { logoutReducer } from '@features/logout';
import { refreshReducer } from '@features/refresh';
import { loginReducer } from '@pages/LoginPage/ui/feature/login';
import { recoveryReducer } from '@pages/RecoveryPage/ui/feature/recovery';
import { registrationReducer } from '@pages/RegisterPage/ui/feature/registration';
import { verifyReducer } from '@pages/VerifyPage/ui/feature/verify';
import { combineReducers } from '@reduxjs/toolkit';
import { profileReducer } from '@pages/SettingsPage/features/profile';

const rootReducer = combineReducers({
	user: userReducer,
	login: loginReducer,
	registration: registrationReducer,
	verify: verifyReducer,
	recovery: recoveryReducer,
	refresh: refreshReducer,
	logout: logoutReducer,
	profile: profileReducer
});

export default rootReducer;
