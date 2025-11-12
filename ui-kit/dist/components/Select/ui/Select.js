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
import './Select.scss';
var Select = function (_a) {
    var options = _a.options, label = _a.label, error = _a.error, className = _a.className, disabled = _a.disabled, id = _a.id, props = __rest(_a, ["options", "label", "error", "className", "disabled", "id"]);
    var selectId = id || "select-".concat(Math.random().toString(36).substr(2, 9));
    return (_jsxs("div", { className: "eventbuddy-select-wrapper ".concat(className || ''), children: [label && (_jsx("label", { htmlFor: selectId, className: "eventbuddy-select-label", children: label })), _jsx("select", __assign({ id: selectId, className: "eventbuddy-select ".concat(error ? 'eventbuddy-select--error' : '', " ").concat(disabled ? 'eventbuddy-select--disabled' : ''), disabled: disabled }, props, { children: options.map(function (option) { return (_jsx("option", { value: option.value, children: option.label }, option.value)); }) })), error && _jsx("span", { className: "eventbuddy-select-error", children: error })] }));
};
export default Select;
