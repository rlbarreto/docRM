/*global rootRequire*/
'use strict';

let Instructor = rootRequire('models/Instructor');
const util = rootRequire('util/util');

exports = module.exports = {
	findById: findById
};

function findById(id) {
	return util.findByIdHelper(id, Instructor.findById, _createInstructor);
}


function _createInstructor(row) {
	if (!row) {
		return null;
	}
	
	return {
		id: row.id,
		name: row.name,
		phone: row.phone,
		celphone: row.celphone,
		address: row.address,
		zipcode: row.zipcode,
		city: row.city,
		country: row.country,
		birthday: row.birthday,
		active: row.active
	};
}