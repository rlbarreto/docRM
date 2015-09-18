/* global rootRequire */

/**
 * Created by rafael on 02/09/15.
 */
'use strict';

const db = rootRequire('models/db');

const ClientModel = db.sequelize.define('cliente', {
    id: { type: db.Sequelize.UUID, defaultValue: db.Sequelize.UUIDV4, primaryKey: true },
    name: db.Sequelize.STRING,
    phone: db.Sequelize.STRING,
    celphone: db.Sequelize.STRING,
    document: { type: db.Sequelize.STRING, unique: 'ix1_document_unique'},
    address: db.Sequelize.STRING,
    zipcode: db.Sequelize.STRING,
    city: db.Sequelize.STRING,
    country: db.Sequelize.STRING,
    birthday: db.Sequelize.DATE,
    active: { type: db.Sequelize.BOOLEAN, defaultValue: true },
    contractServices: db.Sequelize.JSONB
}, {
        freezeTableName: true
    });

exports = module.exports = ClientModel;
