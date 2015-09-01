/**
 * Created by rafael on 27/08/15.
 */
;
(function () {
    'use strict';

    let ioc = require('electrolyte');

    ioc.loader('config', ioc.node('./config'));
    ioc.loader('models', ioc.node('./models'));

    exports = module.exports = ioc;


})();
