
import { lazyLoadConfig } from '../../utils/routes';
import * as MainModuleUtil from '../../utils/mainModule';

let addTemplateModule = (appModule, templateUrl, templatesDependencies) => {
    if (templatesDependencies && templateUrl) {
        appModule.requires.push(templateUrl);
    }
}

export function Module({ name, dependencies = [], configs = [], main = false, debug = false, html5mode = false, templatesDependencies = true }) {
    return function decorator(component) {
        let appModule = angular.module(name, dependencies);

        addTemplateModule(appModule, component.$kissDecoratorsConfig.componentConfig.templateUrl, templatesDependencies);
        appModule.component(component.$kissDecoratorsConfig.name, component.$kissDecoratorsConfig.componentConfig);

        if (component.$kissDecoratorsConfig.dependencies) {
            if (component.$kissDecoratorsConfig.dependencies.directives) {
                component.$kissDecoratorsConfig.dependencies.directives.forEach((directive) => {
                    if (angular.isDefined(directive.$kissDecoratorsConfig.componentConfig)) {
                        addTemplateModule(appModule, directive.$kissDecoratorsConfig.componentConfig.templateUrl, templatesDependencies);
                        appModule.component(directive.$kissDecoratorsConfig.name, directive.$kissDecoratorsConfig.componentConfig);
                    } else if (angular.isDefined(directive.$kissDecoratorsConfig.directiveConfig)) {
                        addTemplateModule(appModule, directive.$kissDecoratorsConfig.directiveConfig.templateUrl, templatesDependencies);
                        appModule.directive(directive.$kissDecoratorsConfig.name, directive.$kissDecoratorsConfig.directiveConfig);
                    }
                });
            }

            if (component.$kissDecoratorsConfig.dependencies.providers) {
                component.$kissDecoratorsConfig.dependencies.providers.forEach((service) => {
                    appModule.service(service.$kissDecoratorsConfig.injectableId, service);
                });
            }
        }

        if (angular.isArray(configs)) {
            configs.forEach((config) => {
                appModule.config(config);
            });
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
