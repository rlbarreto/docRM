/* global rootRequire */

/**
 * Created by rafael on 02/09/15.
 */
'use strict';

const db = rootRequire('models/db');

const InstructorModel = db.sequelize.define('instrutor', {
    id: { type: db.Sequelize.UUID, defaultValue: db.Sequelize.UUIDV4, primaryKey: true },
    name: db.Sequelize.STRING,
    phone: db.Sequelize.STRING,
    celphone: db.Sequelize.STRING,
    address: db.Sequelize.STRING,
    zipcode: db.Sequelize.STRING,
    city: db.Sequelize.STRING,
    country: db.Sequelize.STRING,
    birthday: db.Sequelize.DATE,
    active: { type: db.Sequelize.BOOLEAN, defaultValue: true }
}, {
        freezeTableName: true
    });

exports = module.exports = InstructorModel;
