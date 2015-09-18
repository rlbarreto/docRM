/*global rootRequire*/

'use strict';

const db = rootRequire('models/db');

const ServiceModel = db.sequelize.define('service', {
  id: { type: db.Sequelize.UUID, defaultValue: db.Sequelize.UUIDV4, primaryKey: true },
  name: { type: db.Sequelize.STRING, unique: 'ix1_name_unique'},
  maxClients: db.Sequelize.INTEGER,
  agenda: db.Sequelize.JSONB,
  plans: db.Sequelize.JSONB

}, {
  freezeTableName: true
});

exports = module.exports = ServiceModel;
