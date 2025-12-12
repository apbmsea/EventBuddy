import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { LoginPayload } from '@pages/LoginPage/ui/entities/login';

interface LoginState {
  isLoading: boolean;
  errors: Record<string, string>;
}

const initialState: LoginState = {
  isLoading: false,
  errors: {}
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginRequest: (state, _action: PayloadAction<LoginPayload>) => {
      state.isLoading = true;
    },
    loginSuccess: state => {
      state.isLoading = false;
    },
    loginFailure: (
      state,
      action: PayloadAction<Record<string, string>>
    ) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    clearFieldError: (state, action: PayloadAction<string>) => {
      delete state.errors[action.payload];
    },
    clearAllErrors: state => {
      state.errors = {};
    }
  }
});

export const { loginSuccess, loginRequest, loginFailure, clearFieldError, clearAllErrors } = loginSlice.actions;
export default loginSlice.reducer;