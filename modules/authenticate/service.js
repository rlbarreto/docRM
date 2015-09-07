/* global rootRequire */
/**
 * Created by rafael on 31/08/15.
 */
'use strict';
let User = rootRequire('models/User');
const jwt = require('jsonwebtoken');

exports = module.exports = {
    authenticate: authenticate,
    validateToken: validateToken
};

function validateToken(token, cb) {
    const callback = cb || function fake() { };
    if (token) {
        jwt.verify(token, 'ilovescotchyscotch', function (err, decoded) {
            if (err) {
                callback(new Error('Failed to authenticate token.'));
            } else {
                callback(null, decoded);
            }
        });
    } else {
        callback(new Error('No token informed'));
    }
}


function authenticate(userToAuth) {
    return _findUser(userToAuth)
        .then(function (user) {
            if (!user) {
                throw new Error('User not found');
            }

            return jwt.sign(user, 'ilovescotchyscotch', {
                expiresInMinutes: 1440 //24 horas
            });
        });
}

function _findUser(userToFind) {
    return User.findOne({ where: { username: userToFind.username, password: userToFind.password } })
        .then(function authenticated(user) {
            if (user) {
                return { username: user.username };
            } else {
                throw new Error('Nothing found');
            }
        });
}