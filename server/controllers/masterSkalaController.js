const MasterSkala = require('../models/masterSkalaModel.js');

exports.getMasterSkala = async (req, res) => {
    try {
        const response = await MasterSkala.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.createMasterSkala = async (req, res) => {
    let { skala } = req.body;
    let newMasterSkala = new MasterSkala({
        skala
    });
    try {
        await newMasterSkala.save();
        res.status(200).json({ status: 'Berhasil Tambah!' });
    } catch (error) {
        console.log(error.message);
    }
};

exports.updateMasterSkala = async (req, res) => {
    try {
        await MasterSkala.update(req.body, {
            where: { id: req.params.id }
        });
        res.status(200).json({ status: 'Berhasil Edit!' });
    } catch (error) {
        console.log(error.message);
    }
};

exports.deleteMasterSkala = async (req, res) => {
    try {
        await MasterSkala.destroy({
            where: { id: req.params.id }
        });
        res.status(200).json({ status: 'Berhasil Hapus!' });
    } catch (error) {
        console.log(error.message);
    }
};