var bundles = [ 'core', 'platform-browser-dynamic'];
var config = bundles.map(function (bundleName) {
    return {
        entry: './dist/all/' + bundleName + '/index.js',
        output: {
            path: './dist',
            filename: bundleName + '.js'
        },
        externals: ['angular']
    }
});

module.exports = config;
