
;(function () {

    var bodyParser = require('body-parser');
    var logger = require('morgan');

    module.exports = function init() {

        return function(app) {
            app.use(logger('dev'));
            app.use(bodyParser.json());

        };
    };
})();
