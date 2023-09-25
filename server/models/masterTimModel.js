const { DataTypes } = require('sequelize');
const db = require('../config/db.js');

const masterTim = db.define('tim_label', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nama_label: DataTypes.STRING,
    nama_lengkap: DataTypes.STRING,
   
}, {
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

module.exports = masterTim;
