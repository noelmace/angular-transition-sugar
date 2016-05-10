'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Directive = Directive;

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _binding = require('utils/binding');

var _binding2 = _interopRequireDefault(_binding);

var _strings = require('utils/strings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO : factoring with Component
var transformConfig = function transformConfig(config, ctrl) {
    var finalConfig = {
        selector: config.selector,
        name: (0, _strings.dashToCamel)(config.selector),
        directiveConfig: {
            controller: ctrl
        }
    };

    if (config.inputs || config.outputs || config.bindToController) {
        finalConfig.directiveConfig.bindToController = {};

        _angular2.default.extend(finalConfig.directiveConfig.bindings, (0, _binding2.default)(config.inputs, '<'));
        _angular2.default.extend(finalConfig.directiveConfig.bindings, (0, _binding2.default)(config.outputs, '&'));
        _angular2.default.extend(finalConfig.directiveConfig.bindings, config.bindings);
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

    _angular2.default.extend(finalConfig.directiveConfig, config);

    return finalConfig;
};

function Directive(config) {
    return function decorator(ctrl) {
        ctrl.$kissDecoratorsConfig = transformConfig(config, ctrl);
    };
}