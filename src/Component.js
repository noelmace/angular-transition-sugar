import angular from 'angular';
import { toBinding } from './utils/binding';

let transformConfig = (config, ctrl) => {
    let finalConfig = {
        selector: config.selector,
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
    delete config.outpus;

    angular.merge(finalConfig.config, config);

    return finalConfig;
};

export function Component(config) {
    return function decorator(ctrl) {
        let transformedConfig = transformConfig(config, ctrl);
        ctrl.$componentConfig = transformedConfig.config;
        ctrl.$selector = transformedConfig.selector;
    }
}
