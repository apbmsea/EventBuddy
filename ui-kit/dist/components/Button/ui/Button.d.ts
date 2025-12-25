import React from 'react';
export type ButtonVariant = 'primary' | 'secondary';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    loading?: boolean;
}
declare const Button: React.FC<ButtonProps>;
export default Button;
