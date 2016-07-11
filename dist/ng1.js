'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
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