/* global rootRequire */
/**
 * Created by rafael on 02/09/15.
 */
'use strict';

let Client = rootRequire('models/Client');
const utilFunctions = rootRequire('util/util');

exports = module.exports = {
    disable: disable,
    findById: findById,
    list: list,
    update: update
};

function disable(client) {
    if (!client || !client.id) {
        throw new Error('O parametro cliente deve ser informado');
    }

    return update(client.id, { active: false });
}

function findById(id) {
    if (!id || typeof id !== 'string') {
        throw new Error('Parâmetro id não informado');
    }

    return Client.findById(id).then(row => {
        return {
            found: !!row,
            register: _createClient(row)
        };
    });

}

function list(filtroParam, offset) {
    let filtro = filtroParam || { where: {} };
    filtro.offset = offset || 0;
    filtro.limit = 10;

    return Client.findAndCountAll(filtro)
        .then(_listResult);
}

function update(id, newClient) {
    return Client.update(newClient, { where: { id: id } })
        .spread((rows, clientUpdated) => {
            return _createClient(clientUpdated);
        });
}

function _listResult(result) {
    return utilFunctions.makeList(result, _createClient);
}

function _createClient(result) {
    if (!result) {
        return null;
    }

    return {
        id: result.id,
        name: result.name,
        phone: result.phone,
        celphone: result.celphone,
        document: result.document,
        address: result.address,
        birthday: result.birthday,
        active: result.active
    };
}
