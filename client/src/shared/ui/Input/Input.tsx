import React from 'react';
import styles from './Input.module.scss';

export type InputVariant = 'primary' | 'error' | 'disabled';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
  icon?: React.ReactNode;
  label?: string;
  error?: string;
  onIconClick?: () => void;
}

/**
 * UI Input component with label, icon and error states
 */
const Input: React.FC<InputProps> = ({
  variant = 'primary',
  icon,
  label,
  error,
  onIconClick,
  className,
  disabled,
  ...props
}) => {
  const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`${styles.inputWrapper} ${className || ''}`}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      
      <div className={styles.inputContainer}>
        <input
          id={inputId}
          className={`${styles.input} ${styles[variant]} ${error ? styles.error : ''} ${disabled ? styles.disabled : ''}`}
          disabled={disabled}
          {...props}
        />
        
        {icon && (
          <button
            type="button"
            className={styles.iconButton}
            onClick={onIconClick}
            disabled={disabled}
          >
            {icon}
          </button>
        )}
      </div>

      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default Input;