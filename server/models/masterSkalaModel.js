const { DataTypes } = require('sequelize');
const db = require('../config/db.js');

const MasterSkala = db.define('master_skala', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    skala: DataTypes.STRING
}, {
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

module.exports = MasterSkala;