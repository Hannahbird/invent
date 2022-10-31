"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var TextField_1 = require("@mui/material/TextField");
var AdapterLuxon_1 = require("@mui/x-date-pickers/AdapterLuxon");
var LocalizationProvider_1 = require("@mui/x-date-pickers/LocalizationProvider");
var MobileDateTimePicker_1 = require("@mui/x-date-pickers/MobileDateTimePicker");
function CustomDateTimePicker() {
    var _a = React.useState(null), dateWithNoInitialValue = _a[0], setDateWithNoInitialValue = _a[1];
    return (React.createElement(LocalizationProvider_1.LocalizationProvider, { dateAdapter: AdapterLuxon_1.AdapterLuxon },
        React.createElement(MobileDateTimePicker_1.MobileDateTimePicker, { value: dateWithNoInitialValue, onChange: function (newValue) { return setDateWithNoInitialValue(newValue); }, label: "Set Date and Time", onError: console.log, renderInput: function (params) { return React.createElement(TextField_1.default, __assign({}, params)); } })));
}
exports.default = CustomDateTimePicker;
;
//# sourceMappingURL=dateTime.js.map