
export let camelToDash = (string) => string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
export let dashToCamel = (string) => string.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
