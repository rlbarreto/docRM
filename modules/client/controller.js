/* global rootRequire */


const router = require('express').Router();
const clientService = rootRequire('modules/client/service');

exports = module.exports = clientControllerStart;

router.get('', listClients);

function listClients(req, res) {
    clientService.list(0)
        .then(function (list) {
            res.json(list);
        });
}

function clientControllerStart(app) {
    app.use('/client', router);
};

