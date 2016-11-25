'use strict';

exports.__esModule = true;
var camelToDash = exports.camelToDash = function camelToDash(string) {
  return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};
var dashToCamel = exports.dashToCamel = function dashToCamel(string) {
  return string.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });
};
var upperToLowerCamel = exports.upperToLowerCamel = function upperToLowerCamel(string) {
  return string.charAt(0).toLowerCase() + string.substring(1);
};