const { DataTypes } = require('sequelize');
const db = require('../config/db.js');

const Report = db.define('report', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nama_app: DataTypes.STRING,
    pelapor: DataTypes.STRING,
    tgl_masalah: DataTypes.DATEONLY,
    server: DataTypes.STRING,
    keluhan: DataTypes.STRING,
    screenshot: DataTypes.STRING,
    solusi: DataTypes.STRING,
    lama_fixing: DataTypes.STRING,
    skala: DataTypes.STRING,
    priority: DataTypes.STRING,
    tim_bertugas: DataTypes.STRING,
    cs: DataTypes.STRING,
    status: DataTypes.BOOLEAN
}, {
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

module.exports = Report;