/* global rootRequire */

'use strict';

const glob = require('glob');
const path = require('path');
const db = rootRequire('models/db');

exports = module.exports = {
    loadModules: loadModules,
    loadControllers: loadControllers,
    createDB: createDB

};

function loadModules() {
    /*let modulesDir = fs.readdirSync('./modules/');
    modulesDir.forEach(function (dir) {
        if (fs.statSync('./modules/' + dir).isDirectory()) {
            rootRequire('/modules/' + dir)());
        }
    });


    ioc.loader(ioc.node_modules());*/
}

function loadControllers(app) {
    let controllersFiles = glob.sync('./modules/**/controller.js');
    controllersFiles.forEach(function eachControllerFile(controllerFile) {
        console.log('path.dirname(controllerFile)');
        console.log(path.dirname(controllerFile));
        console.log(path.dirname(controllerFile) + '/' + path.basename(controllerFile, '.js'));
        rootRequire(path.dirname(controllerFile) + '/' + path.basename(controllerFile, '.js'))(app);
    });
}

function createDB() {
    console.log('criando o db');
    let modelsFiles = glob.sync('./models/*.js');
    console.log(modelsFiles);
    modelsFiles.forEach(function eachModelFile(modelFile) {
        console.log('vendo o q veio');
        if ('db' !== path.basename(modelFile)) {
            console.log(modelFile);
            rootRequire(modelFile);
        }
    })
    return db.sequelize.sync({force: true});
}
