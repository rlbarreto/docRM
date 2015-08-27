;(function () {
    'use strict';

    let Scatter = require('scatter');
    let scatter = new Scatter();

    scatter.registerParticles(__dirname + '/models');


    scatter.load()
    console.log('vai começar');
    let app = require('./config/boot');

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
    });
})();