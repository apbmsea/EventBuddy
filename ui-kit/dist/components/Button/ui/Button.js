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
import { jsx as _jsx } from "react/jsx-runtime";
var Button = function (_a) {
    var _b = _a.variant, variant = _b === void 0 ? 'primary' : _b, _c = _a.loading, loading = _c === void 0 ? false : _c, children = _a.children, disabled = _a.disabled, className = _a.className, props = __rest(_a, ["variant", "loading", "children", "disabled", "className"]);
    return (_jsx("button", __assign({ className: "eventbuddy-button eventbuddy-button--".concat(variant, " ").concat(loading ? 'eventbuddy-button--loading' : '', " ").concat(className || ''), disabled: disabled || loading }, props, { children: loading ? (_jsx("div", { className: "eventbuddy-button__spinner" })) : (children) })));
};
export default Button;
