'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Injectable = Injectable;

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _strings = require('./utils/strings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Injectable(config) {
    return function decorator(ctrl) {
        ctrl.$kissDecoratorsConfig = { injectableId: (0, _strings.upperToLowerCamel)(ctrl.name) };
    };
}