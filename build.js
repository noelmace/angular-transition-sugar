import fs from 'fs';
import Builder from 'systemjs-builder';


function getDirectories(srcpath) {
    return fs.readdirSync(srcpath).filter(function (file) {
        return fs.statSync(path.join(srcpath, file)).isDirectory() && file != 'layout';
    });
}

let directories = getDirectories('src'),
    modulesBuilder = new Builder('src', './system.config.js');

modulesBuilder.config({
    meta: {
        'jspm_packages/*': {build: false}
    }
});

directories.forEach((moduleName) => {
    modulesBuilder.bundle('src/' + moduleName + 'index.js', 'dist/' + moduleName + '.js');
    // TODO
});
