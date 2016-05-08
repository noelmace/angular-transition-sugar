import angular from 'angular';

export function Module({ name, dependencies, configs }) {
    return function decorator(component) {
        let appModule = angular.module(name, dependencies);

        appModule.component(component.$kissDecoratorsConfig.name, component.$kissDecoratorsConfig.componentConfig);

        if (angular.isArray(configs)) {
            configs.some((config) => {
                if (angular.isString(config) || angular.isFunction(config)) {
                    return true;
                }
                appModule.config(config);
                return false;
            });
        }

        if (component.$kissDecoratorsConfig.dependencies) {
            component.$kissDecoratorsConfig.dependencies.directives.forEach((directive) => {
                if (angular.isDefined(directive.$kissDecoratorsConfig.componentConfig)) {
                    appModule.component(directive.$kissDecoratorsConfig.name, directive.$kissDecoratorsConfig.componentConfig);
                } else if (angular.isDefined(directive.$kissDecoratorsConfig.directiveConfig)) {
                    appModule.directive(directive.$kissDecoratorsConfig.name, directive.$kissDecoratorsConfig.directiveConfig);
                }
            });

            component.$kissDecoratorsConfig.dependencies.services.forEach((service) => {
                appModule.service(service.$kissDecoratorsConfig.injectableId, service);
            });
        }

        component.$ngmodule = appModule;
    }
}
