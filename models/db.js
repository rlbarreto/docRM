/**
 * Created by rafael on 25/08/15.
 */
;(function () {
    'use strict';

    module.exports = function db(sequelize) {

        let db = {
            Sequelize : sequelize,
            sequelize : new sequelize('postgres://doc:doc@localhost:5432/doc'),
        }

        return db;
    };

})();