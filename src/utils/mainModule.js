export let generateDebugConfig = (debug = false) => {
    debugConfig.$inject = ['$logProvider', '$compileProvider', '$ocLazyLoadProvider'];
    function debugConfig($logProvider, $compileProvider, $ocLazyLoadProvider) {
        $logProvider.debugEnabled(debug);
        // http://ng-perf.com/2014/10/24/simple-trick-to-speed-up-your-angularjs-app-load-time/
        $compileProvider.debugInfoEnabled(debug);
        $ocLazyLoadProvider.config({ debug });
    }
    return debugConfig;
};

export let generateHtml5ModeConfig = (config) => {
    html5modeConfig.$inject = ['$locationProvider'];
    function html5modeConfig($locationProvider) {
        $locationProvider.html5Mode(config);
    }
    return html5modeConfig;
};