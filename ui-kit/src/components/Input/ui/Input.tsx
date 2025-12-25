import React from 'react';

export type InputVariant = 'primary' | 'error';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
  icon?: React.ReactNode;
  label?: string;
  error?: string;
  onIconClick?: () => void;
}

const Input: React.FC<InputProps> = ({
  variant = 'primary',
  icon,
  label,
  error,
  onIconClick,
  className,
  disabled,
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`eventbuddy-input-wrapper ${className || ''}`}>
      {label && (
        <label htmlFor={inputId} className="eventbuddy-input-label">
          {label}
        </label>
      )}
      
      <div className="eventbuddy-input-container">
        <input
          id={inputId}
          className={`eventbuddy-input eventbuddy-input--${variant} ${error ? 'eventbuddy-input--error' : ''} ${disabled ? 'eventbuddy-input--disabled' : ''}`}
          disabled={disabled}
          {...props}
        />
        
        {icon && (
          <button
            type="button"
            className="eventbuddy-input-icon"
            onClick={onIconClick}
            disabled={disabled}
          >
            {icon}
          </button>
        )}
      </div>

      {error && <span className="eventbuddy-input-error">{error}</span>}
    </div>
  );
};

export default Input;