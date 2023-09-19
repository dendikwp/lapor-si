const { DataTypes } = require('sequelize');
const db = require('../config/db.js');

const MasterSI = db.define('master_SI', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nama: DataTypes.STRING,
    tahun: DataTypes.STRING,
    divisi: DataTypes.STRING,
    deskripsi: DataTypes.STRING
}, {
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

module.exports = MasterSI;
