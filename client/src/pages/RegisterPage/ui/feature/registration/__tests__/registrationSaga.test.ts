import { registration, type RegistrationPayload } from '@pages/RegisterPage/ui/entities/registration';
import { runSaga } from 'redux-saga';
import { registrationSaga } from '../model/registrationSaga';
import { registrationFailure, registrationRequest, registrationSuccess } from '../model/registrationSlice';
import { navigateTo } from '@shared/utils/navigate';
import { Role } from '@shared/types/role.types';
import { isHandledError } from '@shared/utils/isHandeledError';

jest.mock('@pages/RegisterPage/ui/entities/registration', () => ({
  registration: jest.fn()
}));

jest.mock('@shared/utils/navigate', () => ({
  navigateTo: jest.fn()
}));

jest.mock('@shared/utils/isHandeledError', () => ({
  isHandledError: jest.fn()
}));

describe('registration Saga', () => {
  let dispatched: unknown[];
  const payload: RegistrationPayload = {
    email: 'test@example.com',
    password: 'password123',
    role: Role.INDIVIDUAL
  };

  beforeEach(() => {
    dispatched = [];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('должен успешно зарегистрировать пользователя', async () => {
    const response = { message: 'Registration successful' };
    jest.mocked(registration).mockResolvedValue(response);

    await runSaga(
      { dispatch: action => dispatched.push(action) },
      registrationSaga,
      registrationRequest(payload)
    ).toPromise();

    expect(registration).toHaveBeenCalledWith(payload);
    expect(dispatched).toContainEqual(registrationSuccess());
    expect(navigateTo).toHaveBeenCalledWith('/auth/verify');
  });

  it('должен обработать handled error', async () => {
    const error = { data: { errors: { email: 'invalid' } } };
    jest.mocked(registration).mockRejectedValue(error);
    jest.mocked(isHandledError).mockReturnValue(true);

    await runSaga(
      { dispatch: action => dispatched.push(action) },
      registrationSaga,
      registrationRequest(payload)
    ).toPromise();

    expect(dispatched).toContainEqual(registrationFailure(error.data.errors));
    expect(navigateTo).not.toHaveBeenCalled();
  });

  it('должен обработать непредвиденную ошибку', async () => {
    const error = new Error('unexpected');
    jest.mocked(registration).mockRejectedValue(error);
    jest.mocked(isHandledError).mockReturnValue(false);

    await runSaga(
      { dispatch: action => dispatched.push(action) },
      registrationSaga,
      registrationRequest(payload)
    ).toPromise();

    expect(dispatched).toContainEqual(registrationFailure({}));
    expect(navigateTo).not.toHaveBeenCalled();
  });
});