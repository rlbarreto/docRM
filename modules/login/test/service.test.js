/**
 * Created by rafael on 31/08/15.
 */
(function () {
    'use strict';

    const Promise = require('bluebird');
    const chai = require('chai');
    //const ioc = require('../../../injector');
    const loader = require('../../../config/load')();
    const ioc = require('electrolyte');

    chai.config.includeStack = true;
    chai.should();

    describe('login service', function () {
        let loginService;
        before(function onBefore() {

            //mock do Model User
            let User = function () {
                return {
                    findOne: function (user) {
                        return new Promise(function (resolve, reject) {
                            if (user.where.password === 'teste2') {
                                resolve(user);
                            } else {
                                reject(new Error('Nothing found'));
                            }
                        });
                    }
                }
            };

            loader.loadModules(ioc);
            ioc.loader('models', User);

            loginService = ioc.create('login/service');
        });

        describe('authenticate()', function () {
            it('should be rejected', function () {
                return loginService.authenticate({username: 'teste', password: 'teste3'}).should.be.rejected;

            });

            it('should be fullfiled', function () {
                return loginService.authenticate({username: 'teste', password: 'teste2'});

            });
        });


    });
})();
