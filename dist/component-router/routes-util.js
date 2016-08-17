'use strict';

exports.__esModule = true;
exports.lazyLoadStateFactory = lazyLoadStateFactory;
exports.transformStateDefinition = transformStateDefinition;
exports.generateStateConfig = generateStateConfig;
exports.generateFutureStateConfig = generateFutureStateConfig;
exports.generateDefaultStateConfig = generateDefaultStateConfig;
exports.lazyLoadConfig = lazyLoadConfig;

lazyLoadStateFactory.$inject = ['futureState', '$ocLazyLoad'];
function lazyLoadStateFactory(futureState, $ocLazyLoad) {
    return System.import(futureState.component).then(function (loaded) {
        var component = loaded[Object.keys(loaded)[1]];
        $ocLazyLoad.load(component.$ngmodule);
        var config = angular.copy(futureState);
        config.component = component;
        config.name = config.stateName;
        delete config.stateName;
        config.path = config.url;
        delete config.url;
        delete config.type;
        return transformStateDefinition(config, true);
    });
}

function transformStateDefinition(config) {
    var merge = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];


    var paramObj = {
        name: config.name || config.component.$kissDecoratorsConfig.name,
        config: {
            url: config.path,
            template: config.template || '\n                <' + config.component.$kissDecoratorsConfig.selector + '>\n                </' + config.component.$kissDecoratorsConfig.selector + '>\n            '
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

    var mergedObj = paramObj.config;
    mergedObj.name = paramObj.name;
    return !!merge ? mergedObj : paramObj;
}

function generateStateConfig(params) {
    stateConfig.$inject = ['$stateProvider'];
    function stateConfig($stateProvider) {
        params.forEach(function (definition) {
            $stateProvider.state(definition.name, definition.config);
        });
    }
    return stateConfig;
}

function generateFutureStateConfig(params) {
    futureStateConfig.$inject = ['$futureStateProvider'];
    function futureStateConfig($futureStateProvider) {
        params.forEach(function (definition) {
            $futureStateProvider.futureState(definition);
        });
    }
    return futureStateConfig;
}

function generateDefaultStateConfig(defaultStateUrl) {
    defaultStateConfig.$inject = ['$urlRouterProvider'];
    function defaultStateConfig($urlRouterProvider) {
        $urlRouterProvider.otherwise(defaultStateUrl);
    }
    return defaultStateConfig;
}

lazyLoadConfig.$inject = ['$futureStateProvider', '$httpProvider'];
function lazyLoadConfig($futureStateProvider, $httpProvider) {
    $httpProvider.useApplyAsync(true);
    $futureStateProvider.stateFactory('lazy', lazyLoadStateFactory);
}