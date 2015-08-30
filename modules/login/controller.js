/**
 * Created by rafael on 24/08/15.
 */
(function () {
    'use strict';

    console.log('carregou o modulo');
    exports = module.exports = function loginController(express) {
        console.log('executando o modulo' + ' ' + express);
        let router = express.Router();

        router.get('', function teste(req, res) {
            res.json({msg: 'OK'});
        });

        return function (app) {
            app.use('/login', router);
        }
        //boot.use('/login', router);
    };

    exports['@singleton'] = true;
    exports['@require'] = ['express'];


})();