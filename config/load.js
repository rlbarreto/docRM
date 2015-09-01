;
(function () {
    'use strict';

    const glob = require('glob');
    const fs = require('fs');
    const path = require('path');

    exports = module.exports = function () {
        return {
            loadModules: loadModules,
            loadControllers: loadControllers
        };
    };

    function loadModules(ioc) {
        let modulesDir = fs.readdirSync('./modules/');
        modulesDir.forEach(function (dir) {
            if (fs.statSync('./modules/' + dir).isDirectory()) {
                ioc.loader(dir, ioc.node('./modules/' + dir));
            }
        });


        ioc.loader(ioc.node_modules());
    }

    function loadControllers(ioc, app) {
        let controllersFiles = glob.sync('./modules/**/controller.js');
        controllersFiles.forEach(function eachControllerFile(controllerFile) {
            ioc.create(path.basename(path.dirname(controllerFile)) + '/' + path.basename(controllerFile, '.js'))(app);
        });
    }
})();