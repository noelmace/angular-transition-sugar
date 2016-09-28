'use strict';

exports.__esModule = true;
exports.Component = Component;

var _binding = require('./utils/binding');

var _strings = require('./utils/strings');

var transformConfig = function transformConfig(config, ctrl) {
    var finalConfig = {
        selector: config.selector,
        name: (0, _strings.dashToCamel)(config.selector),
        componentConfig: {
            bindings: {},
            controller: ctrl
        }
    };

    angular.extend(finalConfig.componentConfig.bindings, (0, _binding.toBinding)(config.inputs, '<'));
    angular.extend(finalConfig.componentConfig.bindings, (0, _binding.toBinding)(config.outputs, '&'));
    angular.extend(finalConfig.componentConfig.bindings, config.bindings);

    delete config.selector;
    delete config.inputs;
    delete config.outputs;

    if (config.directives || config.providers) {
        finalConfig.dependencies = {};
    }
    if (config.directives) {
        finalConfig.dependencies.directives = config.directives;
    }

    if (config.providers) {
        finalConfig.dependencies.providers = config.providers;
    }

    angular.extend(finalConfig.componentConfig, config);

    return finalConfig;
};

function Component(config) {
    return function decorator(ctrl) {
        ctrl.$kissDecoratorsConfig = transformConfig(config, ctrl);
    };
}