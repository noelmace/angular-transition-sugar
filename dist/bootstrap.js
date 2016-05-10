'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.bootstrap = undefined;

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bootstrap = exports.bootstrap = function bootstrap(component) {

    _angular2.default.element(document).ready(function () {
        var wrapper = document.createElement('div'),
            componentElmt = document.getElementsByTagName(component.$kissDecoratorsConfig.selector)[0];
        componentElmt.parentNode.insertBefore(wrapper, componentElmt);
        wrapper.appendChild(componentElmt);
        _angular2.default.bootstrap(wrapper, [component.$ngmodule.name], {
            strictDi: true
        });
    });
};