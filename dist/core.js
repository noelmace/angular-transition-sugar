'use strict';

exports.__esModule = true;

var _Component = require('./core-decorators/Component');

Object.keys(_Component).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Component[key];
    }
  });
});

var _Directive = require('./core-decorators/Directive');

Object.keys(_Directive).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Directive[key];
    }
  });
});

var _Injectable = require('./core-decorators/Injectable');

Object.keys(_Injectable).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Injectable[key];
    }
  });
});

var _Module = require('./ng1-specific/Module');

Object.keys(_Module).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Module[key];
    }
  });
});