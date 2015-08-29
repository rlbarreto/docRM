/**
 * Created by rafael on 25/08/15.
 */
;(function() {
    'use strict';

    module.exports = function(db) {
        let User = db.sequelize.define("usuario", {
            id: { type: db.Sequelize.UUID, defaultValue: db.Sequelize.UUIDV4, primaryKey: true },
            username: db.Sequelize.STRING,
            password: db.Sequelize.STRING
        }, {
            freezeTableName: true // Model tableName will be the same as the model name
        });

        return User;
    };
})();

