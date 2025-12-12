import { userReducer } from '@entities/user';
import { loginReducer } from '@pages/LoginPage/ui/feature/login';
import { registrationReducer } from '@pages/RegisterPage/ui/feature/registration';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
	user: userReducer,
    login: loginReducer,
    registration: registrationReducer
});

export default rootReducer;
