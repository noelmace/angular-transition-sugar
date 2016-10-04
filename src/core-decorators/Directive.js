import toBinding from './utils/binding';
import { dashToCamel } from './utils/strings';

let transformConfig = (config, ctrl) => {
    let finalConfig = {
        selector: config.selector,
        name: dashToCamel(config.selector),
        directiveConfig: {
            controller: ctrl
        }
    };

    if (config.inputs || config.outputs || config.bindToController) {
        finalConfig.directiveConfig.bindToController = config.bindToController || {};

        angular.extend(finalConfig.directiveConfig.bindings, toBinding(config.inputs, '<'));
        angular.extend(finalConfig.directiveConfig.bindings, toBinding(config.outputs, '&'));
    }

    finalConfig.directiveConfig.restrict = config.restrict || 'A';
    finalConfig.directiveConfig.controllerAs = config.controllerAs || '$ctrl';

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
    delete config.bindToController;


    angular.extend(finalConfig.directiveConfig, config);

    return finalConfig;
};

export function Directive(config) {
    return function decorator(ctrl) {
        ctrl.$kissDecoratorsConfig = transformConfig(config, ctrl);
    }
}
