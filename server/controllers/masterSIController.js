const MasterSI = require('../models/masterSIModel.js');

exports.getMasterSI = async (req, res) => {
    try {
        const response = await MasterSI.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.createMasterSI = async (req, res) => {
    let { nama, tahun, divisi, deskripsi } = req.body;
    let newMasterSI = new MasterSI({
        nama,
        tahun,
        divisi,
        deskripsi
    });
    try {
        await newMasterSI.save();
        res.status(200).json({ status: 'Berhasil Tambah!' });
    } catch (error) {
        console.log(error.message);
    }
};

exports.updateMasterSI = async (req, res) => {
    try {
        await MasterSI.update(req.body, {
            where: { id: req.params.id }
        });
        res.status(200).json({ status: 'Berhasil Edit!' });
    } catch (error) {
        console.log(error.message);
    }
};

exports.deleteMasterSI = async (req, res) => {
    try {
        await MasterSI.destroy({
            where: { id: req.params.id }
        });
        res.status(200).json({ status: 'Berhasil Hapus!' });
    } catch (error) {
        console.log(error.message);
    }
};