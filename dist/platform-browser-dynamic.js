'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bootstrap = require('./browser-support/bootstrap');

Object.keys(_bootstrap).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _bootstrap[key];
    }
  });
});