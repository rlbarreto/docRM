/* global __dirname */
/* global global */
/**
 * Created by rafael on 31/08/15.
 */
(function () {
    'use strict';
    
    require('../../../injector');
    const Promise = require('bluebird');
    const chai = require('chai');
    const rewire = require('rewire');
    const authService = rewire('../service');

    chai.config.includeStack = true;
    chai.should();

    describe('login service', function () {
        before(function onBefore() {

            //mock do Model User
            let User = {
                findOne: function (user) {
                    return new Promise(function (resolve, reject) {
                        if (user.where.password === 'teste2') {
                            resolve(user);
                        } else {
                            reject(new Error('Nothing found'));
                        }
                    });
                }

            };

            authService.__set__('User', User);


        });

        describe('authenticate()', function () {
            it('should be rejected', function () {
                return authService.authenticate({ username: 'teste', password: 'teste3' }).should.be.rejected;

            });

            it('should be fullfiled', function () {
                return authService.authenticate({ username: 'teste', password: 'teste2' });

            });
        });

        describe('validateToken()', function () {
            it('should not validate', function () {
                authService.validateToken('aqdqwe2fq23df32qfdq2', function (err, decoded) {
                    err.should.not.be.null;
                    err.should.have.property('message');
                    expect(err.message).to.be.equal('Failed to authenticate token.');
                });
            });

            it('should not validate empty token', function () {
                authService.validateToken('', function (err, decoded) {
                    err.should.be.an('error');
                    err.message.should.be.a('string');
                    err.message.should.equal('No token informed');
                });
            });

            it('should validate token', function () {
                authService.validateToken('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3RlIiwiaWF0IjoxNDQxMTYyMjIwLCJleHAiOjE0NDEyNDg2MjB9.ZjdoWlSQFwQa-pXo5iFnCzmtxjN87tbndkey_EcRqDE', function (err, decoded) {
                    err.should.be.null;
                    decoded.should.not.be.null;
                    decoded.should.be.an('string');
                    decoded.should.have.property('username');


                });
            });
        });


    });
})();
