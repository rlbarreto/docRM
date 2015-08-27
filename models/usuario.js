/**
 * Created by rafael on 25/08/15.
 */
;(function() {
    'use strict';

    module.exports = function(sequelize, DataTypes) {
        var User = sequelize.define("usuario", {
            id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
            username: DataTypes.STRING,
            password: DataTypes.STRING
        }, {
            freezeTableName: true // Model tableName will be the same as the model name
        });

        User.sync({force: true}).then(function () {
            // Table created
            return User.create({
                username: 'rlbarreto',
                password: '1234'
            });
        }).then(function() {
            console.log('criou o usuario');
        });

        return User;
    };
})();

