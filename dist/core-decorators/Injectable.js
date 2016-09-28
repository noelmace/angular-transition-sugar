'use strict';

exports.__esModule = true;
exports.Injectable = Injectable;

var _strings = require('./utils/strings');

function Injectable(config) {
    return function decorator(ctrl) {
        ctrl.$kissDecoratorsConfig = { injectableId: config.id || (0, _strings.upperToLowerCamel)(ctrl.name) };
    };
}