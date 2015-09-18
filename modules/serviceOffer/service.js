/*global rootRequire*/
'use strict';

let Service = rootRequire('models/Service');
let util = rootRequire('util/util');

exports = module.exports = {
    findById: findById,
    list: list
};

function list(filterParam, offset) {
    let filter = filterParam || { where: {} };
    filter.offset = offset || 0;
    filter.limit = 10;
    return Service.findAndCountAll(filter)
        .then(_listResult);
}

function findById(id) {
    return util.findByIdHelper(id, Service.findById, _createService);
}

function _listResult(result) {
    return util.makeList(result, _createService);
}

function _createService(result) {
    if (!result) {
        return null;
    }

    return {
        id: result.id,
        name: result.name,
        maxClients: result.maxClients,
        agenda: result.agenda,
        plans: result.plans
    };
}