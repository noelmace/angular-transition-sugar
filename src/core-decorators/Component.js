import { toBinding } from './utils/binding';
import { dashToCamel } from './utils/strings';

let transformConfig = (config, ctrl) => {
    let finalConfig = {
        selector: config.selector,
        name: dashToCamel(config.selector),
        componentConfig: {
            bindings: config.bindings || {},
            controller: ctrl
        }
    };

    angular.extend(finalConfig.componentConfig.bindings, toBinding(config.inputs, '<'));
    angular.extend(finalConfig.componentConfig.bindings, toBinding(config.outputs, '&'));

    delete config.selector;
    delete config.inputs;
    delete config.outputs;
    delete config.bindings;


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

export function Component(config) {
    return function decorator(ctrl) {
        ctrl.$kissDecoratorsConfig = transformConfig(config, ctrl);
    }
}
