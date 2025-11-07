import React from 'react';

export type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  loading = false,
  children,
  disabled,
  className,
  ...props
}) => {
  return (
    <button
      className={`eventbuddy-button eventbuddy-button--${variant} ${loading ? 'eventbuddy-button--loading' : ''} ${className || ''}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="eventbuddy-button__spinner"></div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;