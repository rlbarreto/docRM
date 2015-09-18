/*global rootRequire*/
'use strict';

require('../../../injector');
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
const loader = rootRequire('config/load');
const Promise = require('bluebird');
const moment = require('moment');
const rewire = require('rewire');
const serviceService = rewire('../service');

chai.config.includeStack = true;
chai.use(chaiAsPromised);
chai.should();

let Instructor = {
	findById: _findById
};

let resultFind = {
	id: '123456',
	name: 'Viviane',
    phone: '12345678',
    celphone: '12345678',
    address: 'Rua',
    zipcode: '24220001',
    city: 'Niteroi',
    country: 'Brasil',
    birthday: moment().toDate(),
    active: true
};




function _findById(id) {
	return new Promise(function (resolve, reject) {
		if (id.length > 5) {
			return resolve(resultFind);
		}
		return resolve({
			found: false
		});
	});
}