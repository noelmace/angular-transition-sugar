import angular from 'angular';
import toBinding from 'utils/binding';
import { dashToCamel } from 'utils/strings';

// TODO : factoring with Component
let transformConfig = (config, ctrl) => {
    let finalConfig = {
        selector: config.selector,
        name: dashToCamel(config.selector),
        config: {
            controller: ctrl
        }
    };

    if (config.inputs || config.outputs || config.bindToController) {
        finalConfig.config.bindToController = {};

        angular.extend(finalConfig.config.bindings, toBinding(config.inputs, '<'));
        angular.extend(finalConfig.config.bindings, toBinding(config.outputs, '&'));
        angular.extend(finalConfig.config.bindings, config.bindings);
    }

    finalConfig.config.restrict = config.restrict || 'A';
    finalConfig.config.controllerAs = config.controllerAs || '$ctrl';

    if (config.directives || config.providers) {
        finalConfig.dependencies = {};
    }
    if (config.directives) {
        finalConfig.dependencies.directive = config.directives;
    }

    if (config.providers) {
        finalConfig.dependencies.providers = config.providers;
    }

    delete config.selector;
    delete config.inputs;
    delete config.outputs;

    angular.merge(finalConfig.config, config);

    return finalConfig;
};

export function Directive(config) {
    return function decorator(ctrl) {
        ctrl.$kissDecoratorsConfig = transformConfig(config, ctrl);
    }
}
