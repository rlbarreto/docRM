/* global rootRequire */

exports = module.exports = clientControllerStart;

const router = require('express').Router();
const clientService = rootRequire('modules/client/service');
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

exports['@singleton'] = true;
exports['@require'] = ['express', 'client/service'];