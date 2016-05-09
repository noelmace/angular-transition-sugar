'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Routes = Routes;

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _routes = require('./utils/routes');

var RoutesUtil = _interopRequireWildcard(_routes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Routes(routes) {

    if (!_angular2.default.isArray(routes)) {
        throw new Error('the Routes decorators require an array argument !');
    }

    return function decorator(component) {
        var appModule = component.$ngmodule,
            states = [],
            futureStates = [],
            defaultStateUrl = false;

        routes.forEach(function (config) {
            if (!_angular2.default.isString(config.path)) {
                throw new Error('incorrect route configuration ' + config);
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
            if (config.lazy === true && _angular2.default.isString(config.component)) {
                if (!_angular2.default.isString(config.name)) {
                    throw new Error('incorrect route configuration ' + config);
                }

                var futureState = config;
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
    };
}