'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Injectable = Injectable;

var _strings = require('./utils/strings');

function Injectable(config) {
    return function decorator(ctrl) {
        ctrl.$kissDecoratorsConfig = { injectableId: (0, _strings.upperToLowerCamel)(ctrl.name) };
    };
}