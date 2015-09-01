(function () {
    'use strict';

    const express = require('express');

    exports = module.exports = function boot() {
        console.log('executando boot')


        app.phase(function (done) {
            init(app);
            done();
        });

        app.phase(function listen(done) {
            app.listen(3000, function appListen(err) {
                if (err) {
                    return done(err);
                }
                let addr = this.address();
                console.log('server listening on http://' + addr.address + ':' + addr.port);
                done();
            });
        });
        return app;

    };

    exports['@singleton'] = true;
    exports['@require'] = ['bootable', 'express', 'init'];


})();