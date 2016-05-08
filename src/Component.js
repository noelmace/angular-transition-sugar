import angular from 'angular';
import { toBinding } from './utils/binding';

// TODO : factoring with Directive
let transformConfig = (config, ctrl) => {
    let finalConfig = {
        selector: config.selector,
        name: dashToCamel(config.selector),
        config: {
            bindings: {},
            controller: ctrl
        }
    };

    angular.extend(finalConfig.config.bindings, toBinding(config.inputs, '<'));
    angular.extend(finalConfig.config.bindings, toBinding(config.outputs, '&'));
    angular.extend(finalConfig.config.bindings, config.bindings);

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

    angular.merge(finalConfig.config, config);

    return finalConfig;
};

export function Component(config) {
    return function decorator(ctrl) {
        ctrl.$kissDecoratorsConfig = transformConfig(config, ctrl);
    }
}
