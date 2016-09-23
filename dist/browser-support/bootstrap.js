'use strict';

exports.__esModule = true;
var bootstrap = exports.bootstrap = function bootstrap(component) {

    angular.element(document).ready(function () {
        var wrapper = document.createElement('div'),
            componentElmt = document.getElementsByTagName(component.$kissDecoratorsConfig.selector)[0];
        componentElmt.parentNode.insertBefore(wrapper, componentElmt);
        wrapper.appendChild(componentElmt);
        angular.bootstrap(wrapper, [component.$ngmodule.name], {
            strictDi: true
        });
    });
};