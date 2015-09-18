/* global __dirname */
/* global global */
/**
 * Created by rafael on 27/08/15.
 */

'use strict';
global.rootRequire = function (name) {
    return require(__dirname + '/' + name);
};

exports = module.exports = {};