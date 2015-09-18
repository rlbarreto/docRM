/*global rootRequire*/

const router = require('express').Router();
const serviceOfferedService = rootRequire('modules/serviceOffer/service');

exports = module.exports = serviceOfferedController;

function serviceOfferedController(app) {
	app.use('/servicesOffered', router);
}

router.get('', listServices);

function listServices(req, res) {
	serviceOfferedService.
}