var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
var CodeInput = function (_a) {
    var _b = _a.length, length = _b === void 0 ? 6 : _b, error = _a.error, _c = _a.disabled, disabled = _c === void 0 ? false : _c, onChange = _a.onChange, className = _a.className;
    var _d = useState(Array(length).fill('')), code = _d[0], setCode = _d[1];
    var inputRefs = useRef([]);
    useEffect(function () {
        var _a;
        if (inputRefs.current[0] && !disabled) {
            (_a = inputRefs.current[0]) === null || _a === void 0 ? void 0 : _a.focus();
        }
    }, [disabled]);
    var handleChange = function (value, index) {
        var _a;
        if (disabled)
            return;
        var digit = value.replace(/\D/g, '');
        if (digit) {
            var newCode = __spreadArray([], code, true);
            newCode[index] = digit;
            setCode(newCode);
            if (index < length - 1 && digit) {
                (_a = inputRefs.current[index + 1]) === null || _a === void 0 ? void 0 : _a.focus();
            }
            var completeCode = newCode.join('');
            onChange === null || onChange === void 0 ? void 0 : onChange(completeCode);
        }
    };
    var handleKeyDown = function (e, index) {
        var _a, _b, _c;
        if (e.key === 'Backspace') {
            if (!code[index] && index > 0) {
                // Если текущий инпут пустой - переходим к предыдущему
                (_a = inputRefs.current[index - 1]) === null || _a === void 0 ? void 0 : _a.focus();
            }
            else if (code[index]) {
                // Если в текущем инпуте есть цифра - очищаем его
                var newCode = __spreadArray([], code, true);
                newCode[index] = '';
                setCode(newCode);
                onChange === null || onChange === void 0 ? void 0 : onChange(newCode.join(''));
            }
        }
        if (e.key === 'ArrowLeft' && index > 0) {
            (_b = inputRefs.current[index - 1]) === null || _b === void 0 ? void 0 : _b.focus();
        }
        if (e.key === 'ArrowRight' && index < length - 1) {
            (_c = inputRefs.current[index + 1]) === null || _c === void 0 ? void 0 : _c.focus();
        }
    };
    var handlePaste = function (e) {
        var _a;
        e.preventDefault();
        if (disabled)
            return;
        var pastedData = e.clipboardData.getData('text');
        var digits = pastedData.replace(/\D/g, '').slice(0, length);
        if (digits) {
            var newCode_1 = __spreadArray([], code, true);
            digits.split('').forEach(function (digit, index) {
                if (index < length) {
                    newCode_1[index] = digit;
                }
            });
            setCode(newCode_1);
            onChange === null || onChange === void 0 ? void 0 : onChange(newCode_1.join(''));
            var lastFilledIndex = Math.min(digits.length - 1, length - 1);
            (_a = inputRefs.current[lastFilledIndex]) === null || _a === void 0 ? void 0 : _a.focus();
        }
    };
    return (_jsxs("div", { className: "eventbuddy-code-input-wrapper ".concat(className || ''), children: [_jsx("div", { className: "eventbuddy-code-inputs-container", children: code.map(function (digit, index) { return (_jsx("input", { ref: function (el) {
                        inputRefs.current[index] = el;
                    }, type: "text", inputMode: "numeric", pattern: "[0-9]*", maxLength: 1, value: digit, onChange: function (e) { return handleChange(e.target.value, index); }, onKeyDown: function (e) { return handleKeyDown(e, index); }, onPaste: index === 0 ? handlePaste : undefined, disabled: disabled, className: "eventbuddy-code-input ".concat(error ? 'eventbuddy-code-input--error' : '', " ").concat(disabled ? 'eventbuddy-code-input--disabled' : '') }, index)); }) }), error && _jsx("span", { className: "eventbuddy-code-input-error", children: error })] }));
};
export default CodeInput;
