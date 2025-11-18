import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RecoveryPayload } from '../model/recovery.types';
import { recoveryRequest } from '../model/recoverySlice';
import type { RootState } from '@shared/types/store.types';
import { Button, Input } from 'eventbuddy-ui';
import style from './RecoveryForm.module.scss';

const RecoveryForm: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: RootState) => state.recovery);

  const [formData, setFormData] = useState<RecoveryPayload>({email: ''});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(recoveryRequest(formData));
  };

  return (
    <div className={style['recovery-page']}>
      <div className={style['recovery-content']}>
        <h1 className={style.title}>Восстановление пароля</h1>
        
        <div className={style.description}>
          <p>Введите ваш Email</p>
        </div>

        <form onSubmit={handleSubmit} className={style.form}>
          <Input
            label=""
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            autoComplete="email"
            required
            className={style.input}
          />

          <Button 
            variant="primary" 
            type="submit"
            className={style.submitButton}
            loading={isLoading}
            disabled={isLoading || !formData.email}
          >
            Продолжить
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RecoveryForm;