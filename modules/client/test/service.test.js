/*global rootRequire*/
/**
 * Created by rafael on 02/09/15.
 */
'use strict';

require('../../../injector');
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
const loader = rootRequire('config/load');
const Promise = require('bluebird');
const moment = require('moment');
const rewire = require('rewire');
const clientService = rewire('../service');

chai.config.includeStack = true;
chai.use(chaiAsPromised);
chai.should();



let Client = {
	findAndCountAll: findAndCountAll,
	findById: findById,
	update: update
};

describe('client service', function () {

	before(function onBefore() {
		//mock do model Client

		clientService.__set__('Client', Client);
	});

	describe('list()', function () {
		describe('no filter', function () {
			let resultPromise;
			let total;
			let clients;

			before(function onBeforeNoFilter() {
				resultPromise = clientService.list();
				total = 0;
				clients = [];
			});

			it('should not be null', function () {
				return resultPromise.should.eventually.not.be.null;
			});
			it('should have property total', function () {
				return resultPromise.should.eventually.have.property('total');
			});
			it('should have total of 10', function () {
				return resultPromise.then(function (result) {
					total = result.total;
					return total.should.be.equal(10);
				});

			});
			it('should have property clients', function () {
				return resultPromise.should.eventually.have.property('clients');
			});
			it('clients should have length equals total', function () {
				return resultPromise.then(result => {
					clients = result.clients;
					return clients.should.have.length(total);
				});

			});
		});

		describe('with filter', function withFilter() {
			let resultPromise;
			let total;
			let clients;

			before(function onBeforeWithFilter() {
				resultPromise = clientService.list({ where: { name: 'Rafael' } });
				total = 0;
				clients = [];
			});

			it('should not result a null value', function shouldNotBeNull() {
				return resultPromise.then(result => {
					return result.should.not.be.null;
				});
			});

			it('should have property clients', function () {
				return resultPromise.should.eventually.have.property('clients');
			});

			it('should have property total', function () {
				return resultPromise.should.eventually.have.property('total');
			});

			it('should have total = 0', function () {
				return resultPromise.then(result => {
					total = result.total;
					return total.should.be.equal(0);
				});
			});

			it('clients should be an array', () => {
				return resultPromise.then(function (result) {
					clients = result.clients;
					return clients.should.have.length(total);
				});
			});
		});

	});

	describe('findById()', function () {
		describe('should find a result', function () {
			let resultPromise;
			before(function onBefore() {
				resultPromise = clientService.findById('wfwqfqef1e12dqw');
			});

			it('should not be null', function () {
				return resultPromise.should.eventually.not.be.null;
			});

			it('should have property named found', () => resultPromise.should.eventually.have.property('found'));

			it('should have found', () => {
				return resultPromise.then(result => result.found);
			});

			it('should have property named register', () => resultPromise.should.eventually.have.property('register'));

			it('should have a client on property register', () => {
				return resultPromise.then(result => result.register.name);
			})
		});

		describe('should not find a result', function () {
			let resultPromise;
			beforeEach(function onBefore() {
				resultPromise = clientService.findById('wfwq');
			});

			it('should not be null', function () {
				return resultPromise.should.eventually.not.be.null;
			});

			it('should have property named found', () => resultPromise.should.eventually.have.property('found'));

			it('should not have found', () => {
				return resultPromise.then(result => !result.found);
			});

			it('should not have property named register', () => {
				return resultPromise.then(result => {
					return !result.register;
				});


			});

		});
	});

	describe('update client', function () {
		let client;
		let resultPromise;
		beforeEach(function onBefore() {
			client = {
				id: '123456',
				name: 'Vivine',
				phone: '2112345678'
			};

			Client._oldClient = client;

			resultPromise = clientService.update(client.id, {
				name: 'Viviane'
			});
		});

		it('result should no be null', () => resultPromise.should.eventually.not.be.null);

		it('id should be the same', () => {
			return resultPromise.then(result => {
				return (result.id.should.be.equal(client.id));
			});
		});

		it('result should have change property name', () => {
			return resultPromise.then(result => {
				return (result.name).should.be.equal('Viviane');
			});
		});
	});

	describe('disable client', () => {
		let client;
		let resultPromise;
		beforeEach(function onBefore() {
			client = {
				id: '123456',
				name: 'Viviane',
				phone: '2112345678',
				active: true
			};

			Client._oldClient = client;

			resultPromise = clientService.disable(client);
		});

		it('result should no be null', () => resultPromise.should.eventually.not.be.null);

		it('should have change ative property to false', function() {
			return resultPromise.then(function(result) {
				return (result.active).should.be.false;
			});
		})
	});
});

function update(newClient, options) {
	let self = this;
	return new Promise((resolve, reject) => {
		for (let key in newClient) {
			self._oldClient[key] = newClient[key];
		}

		resolve([1, self._oldClient]);
	});
}

function findById(id) {
	return new Promise(function (resolve, reject) {
		if (id.length > 5) {
			return resolve({
				found: true,
				register: {
					id: id,
					name: 'Exemplo ' + id.length,
					phone: '219' + id.length,
					celphone: '219' + id.length + '553',
					document: '08814573700',
					address: 'Rua Miguel de Frias, 169',
					zipcode: '24220001',
					city: 'Niterói',
					country: 'Brasil',
					birthday: moment().toDate(),//.format('31/07/1981', 'DD/MM/YYYY').toDate(),
					active: true
				}
			});
		}
		return resolve({
			found: false
		});
	})
}
function findAndCountAll(filtro) {
	return new Promise(function (resolve, reject) {
		let result = {
			rows: [],
			count: 0
		};

		let max = 0;
		if (filtro.where.name) {
			max = 0
		} else {
			max = 10
		}
		result.count = max;
		for (let i = 0; i < result.count; i++) {
			result.rows.push({
				id: i,
				name: 'Exemplo ' + i,
				phone: '219' + i + (i + 1) + '323',
				celphone: '219' + i + (i + 1) + '553',
				document: '08814573700',
				address: 'Rua Miguel de Frias, 169',
				zipcode: '24220001',
				city: 'Niterói',
				country: 'Brasil',
				birthday: moment().toDate(),//.format('31/07/1981', 'DD/MM/YYYY').toDate(),
				active: true
			});
		}
		resolve(result);
	});
}
