import React from 'react';
export type InputVariant = 'primary' | 'error';
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: InputVariant;
    icon?: React.ReactNode;
    label?: string;
    error?: string;
    onIconClick?: () => void;
}
declare const Input: React.FC<InputProps>;
export default Input;
