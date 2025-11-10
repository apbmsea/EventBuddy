import type { RootState } from '@shared/types/store.types';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyRequest } from '../model/verifySlice';
import type { VerifyPayload } from '../model/verify.types';
import { CodeInput, Button } from 'eventbuddy-ui';
import './VerifyForm.scss';

const VerifyForm: React.FC = () => {
  const dispatch = useDispatch();
  const { verifyEmail, isLoading } = useSelector((state: RootState) => state.verify); // Добавляем isLoading из стора

  const [code, setCode] = useState<string>('');
  const [timer, setTimer] = useState(59);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length === 6 && !isLoading) { // Проверяем что не в процессе загрузки
      const formData: VerifyPayload = {
        email: verifyEmail,
        code: Number(code)
      };
      dispatch(verifyRequest(formData));
    }
  };

  const handleResendCode = () => {
    if (isLoading) return; // Не позволяем отправлять повторно во время загрузки
    setTimer(59);
    setCanResend(false);
    // Здесь будет логика повторной отправки кода
    console.log('Запрос на повторную отправку кода');
  };

  return (
    <div className="verify-page">
      <div className="verify-content">
        <h1 className="verify-title">Подтверждение почты</h1>
        
        <div className="verify-text">
          <p>Отправили код</p>
          <p className="verify-email">На адрес {verifyEmail}</p>
        </div>

        <form onSubmit={handleSubmit} className="verify-form">
          <div className="verify-code-input">
            <CodeInput
              length={6}
              onChange={handleCodeChange}
              disabled={isLoading} // Блокируем ввод во время загрузки
            />
          </div>

          <div className="verify-timer">
            {!canResend ? (
              <span className="verify-timer-text">
                Запросить новый код через {timer} сек
              </span>
            ) : (
              <button 
                type="button"
                className="verify-resend-btn"
                onClick={handleResendCode}
                disabled={isLoading} // Блокируем кнопку во время загрузки
              >
                Запросить код заново
              </button>
            )}
          </div>

          <Button 
            variant="primary"
            type="submit"
            className="verify-submit-btn"
            disabled={code.length !== 6 || isLoading} // Блокируем если не полный код или идет загрузка
            loading={isLoading} // Добавляем спиннер загрузки
          >
            Продолжить
          </Button>
        </form>
      </div>
    </div>
  );
};

export default VerifyForm;