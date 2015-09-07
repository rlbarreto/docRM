/**
 * Created by rafael on 25/08/15.
 */
'use strict';

const sequelize = require('sequelize');

exports = module.exports = {
    Sequelize: sequelize,
    sequelize: new sequelize('postgres://doc:doc@localhost:5432/doc')
};
