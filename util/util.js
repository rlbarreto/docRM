/*global rootRequire*/
'use strict';

module.exports.makeList = function (result, objConstructor) {
	let obj = {
		total: result.count,
		list: []
	};

	result.rows.forEach(row => obj.list.push(objConstructor));

	return obj;
}; 

module.exports.findByIdHelper = function (id, findFunction, constructorFunction) {
	if (!id || typeof id !== 'string') {
        throw new Error('Parâmetro id não informado');
    }
	
	return findFunction(id).then(row => {
        return {
            found: !!row,
            register: constructorFunction(row)
        };
    });
}
