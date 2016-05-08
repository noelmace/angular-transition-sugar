'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Module = Module;

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Module(_ref) {
    var name = _ref.name;
    var dependencies = _ref.dependencies;
    var configs = _ref.configs;

    return function decorator(component) {
        var appModule = _angular2.default.module(name, dependencies);

        appModule.component(component.$kissDecoratorsConfig.name, component.$kissDecoratorsConfig.componentConfig);

        if (_angular2.default.isArray(configs)) {
            configs.some(function (config) {
                if (_angular2.default.isString(config) || _angular2.default.isFunction(config)) {
                    return true;
                }
                appModule.config(config);
                return false;
            });
        }

        if (component.$kissDecoratorsConfig.dependencies) {
            component.$kissDecoratorsConfig.dependencies.directives.forEach(function (directive) {
                if (_angular2.default.isDefined(directive.$kissDecoratorsConfig.componentConfig)) {
                    appModule.component(directive.$kissDecoratorsConfig.name, directive.$kissDecoratorsConfig.componentConfig);
                } else if (_angular2.default.isDefined(directive.$kissDecoratorsConfig.directiveConfig)) {
                    appModule.directive(directive.$kissDecoratorsConfig.name, directive.$kissDecoratorsConfig.directiveConfig);
                }
            });

            component.$kissDecoratorsConfig.dependencies.services.forEach(function (service) {
                appModule.service(service.$kissDecoratorsConfig.injectableId, service);
            });
        }

        component.$ngmodule = appModule;
    };
}