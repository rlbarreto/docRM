/* global rootRequire */
/**
 * Created by rafael on 25/08/15.
 */

'use strict';

const db = rootRequire('models/db');

console.log('criando o model User');
let UserModel = db.sequelize.define('usuario', {
    id: { type: db.Sequelize.UUID, defaultValue: db.Sequelize.UUIDV4, primaryKey: true },
    username: db.Sequelize.STRING,
    password: db.Sequelize.STRING
}, {
        freezeTableName: true // Model tableName will be the same as the model name
    });

exports = module.exports = UserModel;
