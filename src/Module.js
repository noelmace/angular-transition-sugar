import angular from 'angular';

import { lazyLoadConfig } from './utils/routes';
import * as MainModuleUtil from './utils/mainModule';

export function Module({ name, dependencies, configs, main, debug, html5mode }) {
    return function decorator(component) {
        let appModule = angular.module(name, dependencies);

        appModule.component(component.$kissDecoratorsConfig.name, component.$kissDecoratorsConfig.componentConfig);

        if (angular.isArray(configs)) {
            configs.forEach((config) => {
                appModule.config(config);
            });
        }

        if (component.$kissDecoratorsConfig.dependencies) {
            if (component.$kissDecoratorsConfig.dependencies.directives) {
                component.$kissDecoratorsConfig.dependencies.directives.forEach((directive) => {
                    if (angular.isDefined(directive.$kissDecoratorsConfig.componentConfig)) {
                        appModule.component(directive.$kissDecoratorsConfig.name, directive.$kissDecoratorsConfig.componentConfig);
                    } else if (angular.isDefined(directive.$kissDecoratorsConfig.directiveConfig)) {
                        appModule.directive(directive.$kissDecoratorsConfig.name, directive.$kissDecoratorsConfig.directiveConfig);
                    }
                });
            }
            
            if (component.$kissDecoratorsConfig.dependencies.services) {
                component.$kissDecoratorsConfig.dependencies.services.forEach((service) => {
                    appModule.service(service.$kissDecoratorsConfig.injectableId, service);
                });
            }
        }

        if (main) {
            appModule.config(lazyLoadConfig);
            appModule.config(MainModuleUtil.generateDebugConfig(!!debug));
            appModule.config(MainModuleUtil.generateHtml5ModeConfig(html5mode));
            appModule.$isTheMainModule = true;
        }

        component.$ngmodule = appModule;
    }
}
