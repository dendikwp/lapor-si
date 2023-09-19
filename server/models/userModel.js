const { DataTypes } = require('sequelize');
const db = require('../config/db.js');

const User = db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING
}, {
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

module.exports = User;