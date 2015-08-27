/**
 * Created by rafael on 24/08/15.
 */
;(function () {
    'use strict';

    let router = require('express').Router();
    let passport = require('passport');
    let LocalStrategy = require('passport-local').Strategy;

    passport.use(new LocalStrategy(
       function passportValidation(username, password, done) {

       }
    ));

    module.exports = function loginController(app) {

        app.use('/login', router);

        router.get('', passport.authenticate('local'), function teste (req, res) {
            res.json({msg: 'OK'});
        });
    }

    console.log('carregou o arquivo');
})();