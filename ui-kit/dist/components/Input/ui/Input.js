var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var Input = function (_a) {
    var _b = _a.variant, variant = _b === void 0 ? 'primary' : _b, icon = _a.icon, label = _a.label, error = _a.error, onIconClick = _a.onIconClick, className = _a.className, disabled = _a.disabled, id = _a.id, props = __rest(_a, ["variant", "icon", "label", "error", "onIconClick", "className", "disabled", "id"]);
    var inputId = id || "input-".concat(Math.random().toString(36).substr(2, 9));
    return (_jsxs("div", { className: "eventbuddy-input-wrapper ".concat(className || ''), children: [label && (_jsx("label", { htmlFor: inputId, className: "eventbuddy-input-label", children: label })), _jsxs("div", { className: "eventbuddy-input-container", children: [_jsx("input", __assign({ id: inputId, className: "eventbuddy-input eventbuddy-input--".concat(variant, " ").concat(error ? 'eventbuddy-input--error' : '', " ").concat(disabled ? 'eventbuddy-input--disabled' : ''), disabled: disabled }, props)), icon && (_jsx("button", { type: "button", className: "eventbuddy-input-icon", onClick: onIconClick, disabled: disabled, children: icon }))] }), error && _jsx("span", { className: "eventbuddy-input-error", children: error })] }));
};
export default Input;
