import angular from 'angular';

let toBinding = (params, type) => {
    let bindings = {};
    if (params) {
        params.forEach((id) => {
            bindings[id] = type;
        });
    }
    return bindings;
};

let transformConfig = (config, ctrl) => {
    let finalConfig = {
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

    angular.extend(finalConfig.config.bindings, toBinding(config.inputs, '<'));
    angular.extend(finalConfig.config.bindings, toBinding(config.outputs, '&'));
    angular.extend(finalConfig.config.bindings, toBinding(config.bindings, '='));
    angular.extend(finalConfig.config.bindings, toBinding(config.properties, '@'));

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

export default function Component(config) {
    return function decorator(ctrl) {
        let transformedConfig = transformConfig(config, ctrl);
        ctrl.$componentConfig = transformedConfig.config;
        ctrl.$selector = transformedConfig.selector;
    }
}
