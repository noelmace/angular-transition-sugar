import angular from 'angular';
import toBinding from 'utils/binding';

let transformConfig = (config, ctrl) => {
    let finalConfig = {
        selector: config.selector,
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
    delete config.outpus;

    angular.merge(finalConfig.config, config);

    return finalConfig;
};

export function Directive(config) {
    return function decorator(ctrl) {
        let transformedConfig = transformConfig(config, ctrl);
        ctrl.$directiveConfig = transformedConfig.config;
        ctrl.$selector = transformedConfig.selector;
        if (transformedConfig.directives) {
            ctrl.$dependencies = transformedConfig.directives;
        }
    }
}
