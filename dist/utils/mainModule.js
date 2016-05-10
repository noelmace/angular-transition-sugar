'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var generateDebugConfig = exports.generateDebugConfig = function generateDebugConfig() {
    var debug = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

    debugConfig.$inject = ['$logProvider', '$compileProvider', '$ocLazyLoadProvider'];
    function debugConfig($logProvider, $compileProvider, $ocLazyLoadProvider) {
        $logProvider.debugEnabled(debug);
        // http://ng-perf.com/2014/10/24/simple-trick-to-speed-up-your-angularjs-app-load-time/
        $compileProvider.debugInfoEnabled(debug);
        $ocLazyLoadProvider.config({ debug: debug });
    }
    return debugConfig;
};

var generateHtml5ModeConfig = exports.generateHtml5ModeConfig = function generateHtml5ModeConfig(config) {
    html5modeConfig.$inject = ['$locationProvider'];
    function html5modeConfig($locationProvider) {
        $locationProvider.html5Mode(config);
    }
    return html5modeConfig;
};