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

let Service = {
	findById: findById
};

let resultFind = {
	id: '123456',
	name: 'Exemplo',
	maxClients: 4,
	agenda: [{ day: 1, period: { from: '07:00', to: '12:00' }, instructorName: 'Viviane', instructorId: 1 },
		{ day: 2, period: { from: '07:00', to: '12:00' }, instructorName: 'Viviane', instructorId: 1 },
		{ day: 3, period: { from: '07:00', to: '12:00' }, instructorName: 'Viviane', instructorId: 1 },
		{ day: 4, period: { from: '07:00', to: '12:00' }, instructorName: 'Viviane', instructorId: 1 },
		{ day: 5, period: { from: '07:00', to: '12:00' }, instructorName: 'Viviane', instructorId: 1 }
	],
	plans: [{ times: 3, price: 250 }, { times: 2, price: 180 }, { times: 1, price: 100 }]
};

describe('Service service', function () {
	before(function () {
		serviceService.__set__('Service', Service);
	});

	describe('findById', function () {
		describe('should find a result', function () {
			let resultPromise;
			before(function onBefore() {
				resultPromise = serviceService.findById('123456');
			});

			it('should not be null', () => resultPromise.should.eventually.not.be.null);

			it('should have right json', function () {
				return resultPromise.then(function (result) {
					return result.register.should.be.deep.equal(resultFind);
				});
			});
		});
	});
});

function findById(id) {
	return new Promise(function (resolve, reject) {
		if (id.length > 5) {
			return resolve(resultFind);
		}
		return resolve({
			found: false
		});
	});
}
