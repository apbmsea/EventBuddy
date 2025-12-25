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

const Select: React.FC<SelectProps> = ({
  options,
  label,
  error,
  className,
  disabled,
  id,
  ...props
}) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`eventbuddy-select-wrapper ${className || ''}`}>
      {label && (
        <label htmlFor={selectId} className="eventbuddy-select-label">
          {label}
        </label>
      )}
      
      <select
        id={selectId}
        className={`eventbuddy-select ${error ? 'eventbuddy-select--error' : ''} ${disabled ? 'eventbuddy-select--disabled' : ''}`}
        disabled={disabled}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <span className="eventbuddy-select-error">{error}</span>}
    </div>
  );
};

export default Select;