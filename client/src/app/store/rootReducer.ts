import { userReducer } from '@entities/user';
import { loginReducer } from '@pages/LoginPage/ui/feature/login';
import { recoveryReducer } from '@pages/RecoveryPage/ui/feature/recovery';
import { registrationReducer } from '@pages/RegisterPage/ui/feature/registration';
import { verifyReducer } from '@pages/VerifyPage/ui/feature/verify';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
	user: userReducer,
	login: loginReducer,
	registration: registrationReducer,
	verify: verifyReducer,
	recovery: recoveryReducer
});

export default rootReducer;
