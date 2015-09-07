/* global rootRequire */
/**
 * Created by rafael on 24/08/15.
 */

'use strict';

exports = module.exports = loginControllerStart;

const express = require('express');
const loginService = rootRequire('modules/authenticate/service');

console.log('executando o modulo' + ' ' + express);
let router = express.Router();

router.get('', function teste(req, res) {
    res.json({ msg: 'OK' });
});

router.post('', authenticate);

function authenticate(req, res) {
    let user = req.body;

    loginService.authenticate(user)
        .then(function userAuthenticated(userAuthenticated) {
            console.log(userAuthenticated);
            res.json({ msg: 'Logado', data: userAuthenticated });
        })
        .catch(function (err) {
            res.json({ msg: 'Falha na autenticação', data: err.message });
        });

}

function loginControllerStart(app) {
    app.use('/authenticate', router);
    app.use(function validateToken(req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        loginService.validateToken(token, function validateCallback(err, decoded) {

            if (err) {
                return res.status(403).json({ message: err.message });
            }

            req.decoded = decoded;
            next();
        });

    });

};





