;
(function () {

    var glob = require('glob');
    var fs = require('fs');
    var path = require('path');

    exports = module.exports = function () {
        return {
            loadModules: loadModules,
            loadControllers: loadControllers
        };
    };

    function loadModules(ioc) {
        var modulesDir = fs.readdirSync('./modules/');
        modulesDir.forEach(function (dir) {
            if (fs.statSync('./modules/' + dir).isDirectory()) {
                ioc.loader(dir, ioc.node('./modules/' + dir));
            }
        });


        ioc.loader(ioc.node_modules());
    }

    function loadControllers(ioc, app) {
        var controllersFiles = glob.sync('./modules/**/controller.js');
        controllersFiles.forEach(function eachControllerFile(controllerFile) {
            ioc.create(path.basename(path.dirname(controllerFile)) + '/' + path.basename(controllerFile, '.js'))(app);
        });
    }
})();