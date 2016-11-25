'use strict';

exports.__esModule = true;
exports.Directive = Directive;

var _binding = require('./utils/binding');

var _binding2 = _interopRequireDefault(_binding);

var _strings = require('./utils/strings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transformConfig = function transformConfig(config, ctrl) {
    var finalConfig = {
        selector: config.selector,
        name: (0, _strings.dashToCamel)(config.selector),
        directiveConfig: {
            controller: ctrl
        }
    };

    if (config.inputs || config.outputs || config.bindToController) {
        finalConfig.directiveConfig.bindToController = config.bindToController || {};

        angular.extend(finalConfig.directiveConfig.bindings, (0, _binding2.default)(config.inputs, '<'));
        angular.extend(finalConfig.directiveConfig.bindings, (0, _binding2.default)(config.outputs, '&'));
    }

    finalConfig.directiveConfig.restrict = config.restrict || 'A';
    finalConfig.directiveConfig.controllerAs = config.controllerAs || '$ctrl';

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
    delete config.outputs;
    delete config.bindToController;

    angular.extend(finalConfig.directiveConfig, config);

    return finalConfig;
};

function Directive(config) {
    return function decorator(ctrl) {
        ctrl.$kissDecoratorsConfig = transformConfig(config, ctrl);
    };
}