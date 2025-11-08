import React from 'react';
export interface CodeInputProps {
    length?: number;
    error?: string;
    disabled?: boolean;
    onChange?: (code: string) => void;
    className?: string;
}
declare const CodeInput: React.FC<CodeInputProps>;
export default CodeInput;
