import { userReducer } from '@entities/user';
import { loginReducer } from '@features/auth/login';
import { logoutReducer } from '@features/auth/logout';
import { recoveryReducer } from '@features/auth/recovery';
import { refreshReducer } from '@features/auth/refresh';
import { registrationReducer } from '@features/auth/registration';
import { verifyReducer } from '@features/auth/verify';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
	user: userReducer,

	login: loginReducer,
	registration: registrationReducer,
	verify: verifyReducer,
	logout: logoutReducer,
	refresh: refreshReducer,
	recovery: recoveryReducer
});

export default rootReducer;
