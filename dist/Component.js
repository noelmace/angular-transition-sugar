'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Component;

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toBinding = function toBinding(params, type) {
    var bindings = {};
    if (params) {
        params.forEach(function (id) {
            bindings[id] = type;
        });
    }
    return bindings;
};

var transformConfig = function transformConfig(config, ctrl) {
    var finalConfig = {
        selector: config.selector,
        config: {
            bindings: {},
            controller: ctrl
        }
    };

    if (config.templateUrl) {
        finalConfig.config.templateUrl = config.templateUrl;
    } else if (config.template) {
        finalConfig.config.template = config.template;
    }

    _angular2.default.extend(finalConfig.config.bindings, toBinding(config.inputs, '<'));
    _angular2.default.extend(finalConfig.config.bindings, toBinding(config.outputs, '&'));
    _angular2.default.extend(finalConfig.config.bindings, toBinding(config.bindings, '='));
    _angular2.default.extend(finalConfig.config.bindings, toBinding(config.properties, '@'));

    if (config.controllerAs) {
        finalConfig.config.controllerAs = config.ng1.controllerAs;
    }

    if (config.transclude) {
        finalConfig.config.transclude = !!config.ng1.transclude;
    }

    if (config.require) {
        finalConfig.config.require = config.require;
    }

    return finalConfig;
};

function Component(config) {
    return function decorator(ctrl) {
        var transformedConfig = transformConfig(config, ctrl);
        ctrl.$componentConfig = transformedConfig.config;
        ctrl.$selector = transformedConfig.selector;
    };
}