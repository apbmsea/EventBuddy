import React, { useState, useRef, useEffect } from 'react';
import styles from './CodeInput.module.scss';

export interface CodeInputProps {
  length?: number;
  error?: string;
  disabled?: boolean;
  onChange?: (code: string) => void;
  className?: string;
}

/**
 * Code Input component for verification codes (like email codes)
 * Supports paste from clipboard and proper navigation
 */
const CodeInput: React.FC<CodeInputProps> = ({
  length = 6,
  error,
  disabled = false,
  onChange,
  className
}) => {
  const [code, setCode] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0] && !disabled) {
      inputRefs.current[0]?.focus();
    }
  }, [disabled]);

  const handleChange = (value: string, index: number) => {
    if (disabled) return;

    // Allow only digits
    const digit = value.replace(/\D/g, '');
    
    if (digit) {
      const newCode = [...code];
      newCode[index] = digit;
      setCode(newCode);

      // Move to next input
      if (index < length - 1 && digit) {
        inputRefs.current[index + 1]?.focus();
      }

      // Call onChange with complete code
      const completeCode = newCode.join('');
      onChange?.(completeCode);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      // Move to previous input on backspace
      inputRefs.current[index - 1]?.focus();
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

      // Focus last filled input
      const lastFilledIndex = Math.min(digits.length - 1, length - 1);
      inputRefs.current[lastFilledIndex]?.focus();
    }
  };

  return (
    <div className={`${styles.codeInputWrapper} ${className || ''}`}>
      <div className={styles.inputsContainer}>
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
            className={`${styles.codeInput} ${error ? styles.error : ''} ${disabled ? styles.disabled : ''}`}
          />
        ))}
      </div>
      
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default CodeInput;