const { DataTypes } = require('sequelize');
const db = require('../config/db.js');

const MasterServer = db.define('master_server', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nama: DataTypes.STRING
}, {
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

module.exports = MasterServer;