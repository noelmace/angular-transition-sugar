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

var _templates = require('./utils/templates');

var TemplateUtil = _interopRequireWildcard(_templates);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addTemplateModule = function addTemplateModule(appModule, templateUrl, templatesDependencies) {
    if (templatesDependencies && templateUrl) {
        appModule.requires.push(templateUrl);
    }
};

function Module(_ref) {
    var name = _ref.name;
    var _ref$dependencies = _ref.dependencies;
    var dependencies = _ref$dependencies === undefined ? [] : _ref$dependencies;
    var _ref$configs = _ref.configs;
    var configs = _ref$configs === undefined ? [] : _ref$configs;
    var _ref$main = _ref.main;
    var main = _ref$main === undefined ? false : _ref$main;
    var _ref$debug = _ref.debug;
    var debug = _ref$debug === undefined ? false : _ref$debug;
    var _ref$html5mode = _ref.html5mode;
    var html5mode = _ref$html5mode === undefined ? false : _ref$html5mode;
    var _ref$templatesDepende = _ref.templatesDependencies;
    var templatesDependencies = _ref$templatesDepende === undefined ? true : _ref$templatesDepende;

    return function decorator(component) {
        var appModule = _angular2.default.module(name, dependencies);

        addTemplateModule(appModule, component.$kissDecoratorsConfig.componentConfig.templateUrl, templatesDependencies);
        appModule.component(component.$kissDecoratorsConfig.name, component.$kissDecoratorsConfig.componentConfig);

        if (component.$kissDecoratorsConfig.dependencies) {
            if (component.$kissDecoratorsConfig.dependencies.directives) {
                component.$kissDecoratorsConfig.dependencies.directives.forEach(function (directive) {
                    if (_angular2.default.isDefined(directive.$kissDecoratorsConfig.componentConfig)) {
                        addTemplateModule(appModule, directive.$kissDecoratorsConfig.componentConfig.templateUrl, templatesDependencies);
                        appModule.component(directive.$kissDecoratorsConfig.name, directive.$kissDecoratorsConfig.componentConfig);
                    } else if (_angular2.default.isDefined(directive.$kissDecoratorsConfig.directiveConfig)) {
                        addTemplateModule(appModule, directive.$kissDecoratorsConfig.directiveConfig.templateUrl, templatesDependencies);
                        appModule.directive(directive.$kissDecoratorsConfig.name, directive.$kissDecoratorsConfig.directiveConfig);
                    }
                });
            }

            if (component.$kissDecoratorsConfig.dependencies.services) {
                component.$kissDecoratorsConfig.dependencies.services.forEach(function (service) {
                    appModule.service(service.$kissDecoratorsConfig.injectableId, service);
                });
            }
        }

        if (_angular2.default.isArray(configs)) {
            configs.forEach(function (config) {
                appModule.config(config);
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