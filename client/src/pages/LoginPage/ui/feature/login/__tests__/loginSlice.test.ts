import loginReducer, {
  loginFailure,
  loginRequest,
  loginSuccess,
  clearFieldError,
  clearAllErrors
} from '../model/loginSlice';
import type { LoginPayload } from '@pages/LoginPage/ui/entities/login';

const initialState = {
  isLoading: false,
  errors: {}
};

describe('loginSlice', () => {
  describe('loginRequest', () => {
    it('loginRequest устанавливает isLoading в true и не имеет ошибок', () => {
      const payload: LoginPayload = {
        email: 'user@gmail.com',
        password: '123123wWw'
      };

      const nextState = loginReducer(initialState, loginRequest(payload));

      expect(nextState.isLoading).toBe(true);
      expect(nextState.errors).toEqual({});
    });
  });

  describe('loginSuccess', () => {
    it(' устанавливает isLoading в false и не имеет ошибок', () => {
      const nextState = loginReducer(initialState, loginSuccess());

      expect(nextState.isLoading).toBe(false);
      expect(nextState.errors).toEqual({});
    });
  });

  describe('loginFailure', () => {
    it('сбрасывает isLoading и устанавливает ошибки', () => {
      const errors = {
        email: 'Некорректная почта',
        password:
          'Пароль должен содержать как минимум одну букву верхнего регистра'
      };
      const nextState = loginReducer(initialState, loginFailure(errors));

      expect(nextState.isLoading).toBe(false);
      expect(nextState.errors).toEqual(errors);
    });

    it('обрабатывает пустые ошибки', () => {
      const nextState = loginReducer(initialState, loginFailure({}));

      expect(nextState.isLoading).toBe(false);
      expect(nextState.errors).toEqual({});
    });
  });

  describe('clearFieldError', () => {
    it('удаляет ошибку для конкретного поля', () => {
      const stateWithErrors = {
        isLoading: false,
        errors: {
          email: 'Некорректная почта',
          password: 'Слабый пароль'
        }
      };

      const nextState = loginReducer(stateWithErrors, clearFieldError('email'));

      expect(nextState.errors).toEqual({ password: 'Слабый пароль' });
      expect(nextState.isLoading).toBe(false);
    });

    it('не изменяет состояние если поле не существует', () => {
      const stateWithErrors = {
        isLoading: false,
        errors: { email: 'Некорректная почта' }
      };

      const nextState = loginReducer(stateWithErrors, clearFieldError('nonexistent'));

      expect(nextState.errors).toEqual({ email: 'Некорректная почта' });
    });
  });

  describe('clearAllErrors', () => {
    it('очищает все ошибки', () => {
      const stateWithErrors = {
        isLoading: false,
        errors: {
          email: 'Некорректная почта',
          password: 'Слабый пароль'
        }
      };

      const nextState = loginReducer(stateWithErrors, clearAllErrors());

      expect(nextState.errors).toEqual({});
      expect(nextState.isLoading).toBe(false);
    });

    it('не изменяет состояние если ошибок нет', () => {
      const nextState = loginReducer(initialState, clearAllErrors());

      expect(nextState.errors).toEqual({});
      expect(nextState.isLoading).toBe(false);
    });
  });
});
