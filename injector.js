/* global __dirname */
/* global global */
/**
 * Created by rafael on 27/08/15.
 */
global.rootRequire = function (name) {
    return require(__dirname + '/' + name);
};

exports = module.exports = {};