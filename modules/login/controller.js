/**
 * Created by rafael on 24/08/15.
 */
(function () {
    'use strict';

    console.log('carregou o modulo');
    exports = module.exports = function loginController(express, loginService) {
        console.log('executando o modulo' + ' ' + express);
        let router = express.Router();

        router.get('', function teste(req, res) {
            res.json({msg: 'OK'});
        });

        router.post('/authenticate', authenticate);

        function authenticate(req, res) {
            let user = req.body;

            loginService.authenticate(user).then(
                function userAuthenticated(userAuthenticated) {
                    console.log(userAuthenticated);
                    res.json({msg: 'Logado', data: userAuthenticated});
                }
            );

        }


        return function (app) {
            app.use('/login', router);
        }

        //boot.use('/login', router);
    };

    exports['@singleton'] = true;
    exports['@require'] = ['express', 'login/service'];
})();