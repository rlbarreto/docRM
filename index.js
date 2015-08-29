;
(function () {
    'use strict';

    console.log('vai começar');

    let ioc = require('./injector');
    let bootable = require('bootable');
    let express = require('express');
    let init = require('./config/init')();
    let glob = require('glob');
    let path = require('path');
    let fs = require('fs');

    let app = bootable(express());

    app.phase(function (done) {
        init(app);
        done();
    });

    app.phase(function (done) {
        let modulesDir = fs.readdirSync('./modules/');
        modulesDir.forEach(function(dir) {
            if (fs.statSync('./modules/' + dir).isDirectory()) {
                ioc.loader(ioc.node('./modules/' + dir));
            }
        });


        ioc.loader(ioc.node_modules());

        let controllersFiles = glob.sync('./modules/**/*Controller.js');
        controllersFiles.forEach(function eachControllerFile(controllerFile) {
            ioc.create(path.basename(controllerFile, '.js'))(app);
        });

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
    app.boot(function (err) {
        if (err) {
            throw err;
        }
        console.log('iniciada');
    });
    /*let app = require('./config/boot');

     let server = app.start(process.env.PORT || 3000);



     process.on('message', function(msg) {
     if (msg === 'shutdown') {

     console.info('Iniciando o desligamento');

     console.info('Parando de atender por novos requests');
     server.close();

     setTimeout(function() {
     console.info('Estourou o tempo para finalizar tudo. Mandando um exit');

     process.exit(0);
     });
     }
     });

     process.on('uncaughtException', function (er) {
     console.error(er.stack);
     server.close();

     setTimeout(function () {
     console.info('Estourou o tempo para finalizar tudo. Mandando um exit');

     process.exit(1);
     });
     });*/
})();