import React from 'react';
import './Select.scss';
export interface SelectOption {
    value: string;
    label: string;
}
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: SelectOption[];
    label?: string;
    error?: string;
}
declare const Select: React.FC<SelectProps>;
export default Select;
