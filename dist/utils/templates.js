'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.importTemplateModuleIfExist = undefined;

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// class FakePromise {
//
//     constructor(data) {
//         this.data = data;
//     }
//
//     then(callback) {
//         return new FakePromise(callback(this.data));
//     }
//
//     catch(callback) {
//         return new FakePromise(callback());
//     }
// }

var importTemplateModuleIfExist = exports.importTemplateModuleIfExist = function importTemplateModuleIfExist(templateUrl) {
    if (templateUrl) {
        // let $templateCache = angular.injector().get('$templateCache'),
        //     $ocLazyLoad = angular.injector().get('$ocLazyLoad');
        // try {
        //     $templateCache.get(templateUrl);
        //     return new FakePromise();
        // } catch (error) {
        //     $log.debug(`template not found. Importing ...`);
        //     $log.debug(error);

        return require(replaceHtmlExtension(templateUrl));
        //}
    }
    return false;
};

var replaceHtmlExtension = function replaceHtmlExtension(templateUrl) {
    var newExtension = arguments.length <= 1 || arguments[1] === undefined ? 'js' : arguments[1];

    var splittedUrl = templateUrl.split('.');
    if (splittedUrl[splittedUrl.length - 1] === 'html') {
        splittedUrl[splittedUrl.length - 1] = newExtension;
    }
    return splittedUrl.join('.');
};