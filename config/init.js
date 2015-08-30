
;(function () {

    var bodyParser = require('body-parser');
    var logger = require('morgan');

    module.exports = function initialize() {
        return init;
    };

    function init(app) {
        app.use(logger('dev'));
        app.use(bodyParser.json());

    };
})();
