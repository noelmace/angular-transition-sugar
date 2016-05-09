'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Module = Module;

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _routes = require('./utils/routes');

var _mainModule = require('./utils/mainModule');

var MainModuleUtil = _interopRequireWildcard(_mainModule);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Module(_ref) {
    var name = _ref.name;
    var dependencies = _ref.dependencies;
    var configs = _ref.configs;
    var main = _ref.main;
    var debug = _ref.debug;
    var html5mode = _ref.html5mode;

    return function decorator(component) {
        var appModule = _angular2.default.module(name, dependencies);

        appModule.component(component.$kissDecoratorsConfig.name, component.$kissDecoratorsConfig.componentConfig);

        if (_angular2.default.isArray(configs)) {
            configs.forEach(function (config) {
                appModule.config(config);
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

        if (main) {
            appModule.config(_routes.lazyLoadConfig);
            appModule.config(MainModuleUtil.generateDebugConfig(!!debug));
            appModule.config(MainModuleUtil.generateHtml5ModeConfig(html5mode));
            appModule.$isTheMainModule = true;
        }

        component.$ngmodule = appModule;
    };
}