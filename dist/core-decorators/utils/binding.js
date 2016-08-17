'use strict';

exports.__esModule = true;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var toBinding = exports.toBinding = function toBinding(params, type) {
    var bindings = {};
    if (params) {
        params.forEach(function (param) {
            var id = param,
                value = '';
            if (param.includes(': ')) {
                param.split(': ');

                var _param = _slicedToArray(param, 2);

                id = _param[0];
                value = _param[1];
            }
            bindings[id] = type + value;
        });
    }
    return bindings;
};