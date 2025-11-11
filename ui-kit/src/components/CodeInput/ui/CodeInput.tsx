import React, { useState, useRef, useEffect } from 'react';

export interface CodeInputProps {
  length?: number;
  error?: string;
  disabled?: boolean;
  onChange?: (code: string) => void;
  className?: string;
}

const CodeInput: React.FC<CodeInputProps> = ({
  length = 6,
  error,
  disabled = false,
  onChange,
  className
}) => {
  const [code, setCode] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0] && !disabled) {
      inputRefs.current[0]?.focus();
    }
  }, [disabled]);

  const handleChange = (value: string, index: number) => {
    if (disabled) return;

    const digit = value.replace(/\D/g, '');
    
    if (digit) {
      const newCode = [...code];
      newCode[index] = digit;
      setCode(newCode);

      if (index < length - 1 && digit) {
        inputRefs.current[index + 1]?.focus();
      }

      const completeCode = newCode.join('');
      onChange?.(completeCode);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace') {
      if (!code[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (code[index]) {
        const newCode = [...code];
        newCode[index] = '';
        setCode(newCode);
        onChange?.(newCode.join(''));
      }
    }
    
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    
    if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    if (disabled) return;

    const pastedData = e.clipboardData.getData('text');
    const digits = pastedData.replace(/\D/g, '').slice(0, length);

    if (digits) {
      const newCode = [...code];
      digits.split('').forEach((digit, index) => {
        if (index < length) {
          newCode[index] = digit;
        }
      });
      
      setCode(newCode);
      onChange?.(newCode.join(''));

      const lastFilledIndex = Math.min(digits.length - 1, length - 1);
      inputRefs.current[lastFilledIndex]?.focus();
    }
  };

  return (
    <div className={`eventbuddy-code-input-wrapper ${className || ''}`}>
      <div className="eventbuddy-code-inputs-container">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={index === 0 ? handlePaste : undefined}
            disabled={disabled}
            className={`eventbuddy-code-input ${error ? 'eventbuddy-code-input--error' : ''} ${disabled ? 'eventbuddy-code-input--disabled' : ''}`}
          />
        ))}
      </div>
      
      {error && <span className="eventbuddy-code-input-error">{error}</span>}
    </div>
  );
};

export default CodeInput;