import { userReducer } from '@entities/user';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
	user: userReducer
});

export default rootReducer;
