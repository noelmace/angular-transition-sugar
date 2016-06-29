import * as RoutesUtil from '../../utils/routes';

export function Routes(routes) {

    if (!angular.isArray(routes)) {
        throw new Error('the Routes decorators require an array argument !');
    }

    return function decorator(component) {
        let appModule = component.$ngmodule,
            states = [],
            futureStates = [],
            defaultStateUrl = false;

        routes.forEach((config) => {
            if (!angular.isString(config.path)) {
                throw new Error(`incorrect route configuration ${config}`);
            }
            if (appModule.$isTheMainModule === true) {
                if (!defaultStateUrl) {
                    defaultStateUrl = config.path;
                } else if (config.useAsDefault) {
                    defaultStateUrl = config.path;
                }
            }
            if (config.useAsDefault) {
                defaultStateUrl = config.path;
            }
            if (config.lazy === true && angular.isString(config.component)) {
                if (!angular.isString(config.name)) {
                    throw new Error(`incorrect route configuration ${config}`);
                }

                let futureState = config;
                futureState.stateName = futureState.name;
                delete futureState.name;
                futureState.url = futureState.path;
                delete futureState.path;
                futureState.type = 'lazy';

                futureStates.push(futureState);
            } else {
                states.push(RoutesUtil.transformStateDefinition(config));
            }
        });

        appModule.config(RoutesUtil.generateStateConfig(states));
        appModule.config(RoutesUtil.generateFutureStateConfig(futureStates));
        if (appModule.$isTheMainModule === true) {
            appModule.config(RoutesUtil.generateDefaultStateConfig(defaultStateUrl));
        }
    }
}
