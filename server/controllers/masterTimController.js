const masterTim = require('../models/masterTimModel.js');

exports.getMasterTim = async (req, res) => {
    try {
        const response = await masterTim.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

exports.createMasterTim = async (req, res) => {
    let {
        nama_label,
        nama_lengkap
    } = req.body;
    let newMasterTim = new masterTim({
        nama_label,
        nama_lengkap
    });
    try {
        await newMasterTim.save();
        res.status(200).json({
            status: 'Berhasil Tambah!'
        });
    } catch (error) {
        console.log(error.message);
    }
};

exports.updateMasterTim = async (req, res) => {
    try {
        await masterTim.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({
            status: 'Berhasil Edit!'
        });
    } catch (error) {
        console.log(error.message);
    }
};

exports.deleteMasterTim = async (req, res) => {
    try {
        await masterTim.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({
            status: 'Berhasil Hapus!'
        });
    } catch (error) {
        console.log(error.message);
    }
};