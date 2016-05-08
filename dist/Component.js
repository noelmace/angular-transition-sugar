'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Component = Component;

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _binding = require('./utils/binding');

var _strings = require('./utils/strings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO : factoring with Directive
var transformConfig = function transformConfig(config, ctrl) {
    var finalConfig = {
        selector: config.selector,
        name: (0, _strings.dashToCamel)(config.selector),
        config: {
            bindings: {},
            controller: ctrl
        }
    };

    _angular2.default.extend(finalConfig.config.bindings, (0, _binding.toBinding)(config.inputs, '<'));
    _angular2.default.extend(finalConfig.config.bindings, (0, _binding.toBinding)(config.outputs, '&'));
    _angular2.default.extend(finalConfig.config.bindings, config.bindings);

    delete config.selector;
    delete config.inputs;
    delete config.outputs;

    if (config.directives || config.providers) {
        finalConfig.dependencies = {};
    }
    if (config.directives) {
        finalConfig.dependencies.directive = config.directives;
    }

    if (config.providers) {
        finalConfig.dependencies.providers = config.providers;
    }

    _angular2.default.merge(finalConfig.config, config);

    return finalConfig;
};

function Component(config) {
    return function decorator(ctrl) {
        ctrl.$kissDecoratorsConfig = transformConfig(config, ctrl);
    };
}