/**
 * Created by rafael on 25/08/15.
 */
;(function() {
    'use strict';

    exports = module.exports = function User(db) {
        let User = db.sequelize.define("usuario", {
            id: { type: db.Sequelize.UUID, defaultValue: db.Sequelize.UUIDV4, primaryKey: true },
            username: db.Sequelize.STRING,
            password: db.Sequelize.STRING
        }, {
            freezeTableName: true // Model tableName will be the same as the model name
        });

        /*User.sync({force: true}).then(function () {
            User.create({username: 'teste', password: 'teste2'});
        })*/
        return User;
    };

    exports['@singleton'] = true;
    exports['@require'] = ['models/db'];
})();

