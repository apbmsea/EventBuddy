import { userReducer } from '@entities/user';
import { loginReducer } from '@pages/LoginPage/ui/feature/login';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
	user: userReducer,
    login: loginReducer
});

export default rootReducer;
