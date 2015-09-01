/**
 * Created by rafael on 31/08/15.
 */
'use strict';

exports = module.exports = service;

function service(User) {
    return {
        authenticate: authenticate
    }

    function authenticate(userToLog) {
        return User
            .findOne({ where: {username: userToLog.username, password: userToLog.password}})
            .then(function authenticated(user) {
                return {username: user.username};
            });
    }

}
exports['@singleton'] = true;
exports['@require'] = ['models/User'];