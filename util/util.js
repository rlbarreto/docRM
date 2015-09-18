/*global rootRequire*/

module.exports.makeList = function (result, objConstructor) {
	let obj = {
		total: result.count,
		list: []
	};

	result.rows.forEach(row => obj.list.push(objConstructor));

	return obj;
}; 
