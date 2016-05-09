import angular from 'angular';

lazyLoadStateFactory.$inject = ['futureState', '$ocLazyLoad'];
export function lazyLoadStateFactory(futureState, $ocLazyLoad) {
    return System.import(futureState.component).then((loaded) => {
        var component = loaded[Object.keys(loaded)[1]] ;
        $ocLazyLoad.load(component.$ngmodule);
        let config = angular.copy(futureState);
        config.component = component;
        config.name = config.stateName;
        delete config.stateName;
        config.path = config.url;
        delete config.url;
        delete config.type;
        return transformStateDefinition(config, true);
    });
}

export function transformStateDefinition(config, merge = false) {

    let paramObj = {
        name: config.name || config.component.$kissDecoratorsConfig.name,
        config: {
            url: config.path,
            template: config.template || `
                <${config.component.$kissDecoratorsConfig.selector}>
                </${config.component.$kissDecoratorsConfig.selector}>
            `
        }
    };

    if (config.parent) {
        paramObj.config.parent = parent;
    }

    if (angular.isDefined(config.abstract)) {
        paramObj.config.abstract = !!config.abstract;
    }

    if (config.data) {
        paramObj.config.data = config.data;
    }

    if (config.resolve) {
        paramObj.config.resolve = config.resolve;
    }

    let mergedObj = paramObj.config;
    mergedObj.name = paramObj.name;
    return !!merge ? mergedObj : paramObj;
}

export function generateStateConfig(params) {
    stateConfig.$inject = ['$stateProvider'];
    function stateConfig($stateProvider) {
        params.forEach((definition) => {
            $stateProvider.state(definition.name, definition.config);
        });
    }
    return stateConfig;
}

export function generateFutureStateConfig(params) {
    futureStateConfig.$inject = ['$futureStateProvider'];
    function futureStateConfig($futureStateProvider) {
        params.forEach((definition) => {
            $futureStateProvider.futureState(definition);
        });
    }
    return futureStateConfig;
}

lazyLoadConfig.$inject = ['$futureStateProvider'];
export function lazyLoadConfig($futureStateProvider) {
    $futureStateProvider.stateFactory('lazy', lazyLoadStateFactory);
}