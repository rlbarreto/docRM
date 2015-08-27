;(function () {
    'use strict';

    let Promise = require('bluebird');
    let glob = require('glob');
    let logger = require('morgan');
    let bodyParser = require('body-parser');

    let app = require('express')();
    let models = require("../models");

    app.use(logger('dev'));
    app.use(bodyParser.json());

    glob.sync('./modules/**/*controller.js')
        .forEach(function eachFile(file) {
            require('.' + file)(app);
        });

    app.start = start;


    module.exports = app;

    function start(port) {
        return models.sequelize.sync().then(function bancoDadosAtualizado() {
           return app.listen(port);
        });
    }

})();