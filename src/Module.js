import angular from 'angular';

export function Module({ name, dependencies, configs }) {
    return function decorator(component) {
        let appModule = angular.module(name, dependencies);

        appModule.component(component.$selector, component.$componentConfig);

        if (angular.isArray(configs)) {
            configs.some((config) => {
                if (angular.isString(config) || angular.isFunction(config)) {
                    return true;
                }
                appModule.config(config);
                return false;
            });
        }

        if (component.$dependencies) {
            component.$dependencies.directives.forEach((directive) => {
                if (angular.isDefined(directive.$componentConfig)) {
                    appModule.component(directive.$selector, directive.$componentConfig);
                } else if (angular.isDefined(directive.$directiveConfig)) {
                    appModule.directive(directive.$selector, directive.$directiveConfig);
                }
            });

            component.$dependencies.services.forEach((service) => {
                appModule.service(service.$injectableId, service);
            });
        }

        component.$module = appModule;
    }
}
