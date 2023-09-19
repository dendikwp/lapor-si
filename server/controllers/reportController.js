const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const Report = require('../models/reportModel.js');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

exports.getDateNow = async (req, res) => {
    const tanggalSekarang = new Date();
    const bulanSekarang = (tanggalSekarang.getMonth() + 1).toString().padStart(2, '0');
    const tahunSekarang = tanggalSekarang.getFullYear();
    let data = {
        bulan: bulanSekarang,
        tahun: tahunSekarang
    }
    res.json(data);
};

exports.getReport = async (req, res) => {
    try {
        const { bulan, tahun, st_report } = req.params;

        const kondisi = {
            tgl_masalah: {
                [Op.and]: [
                    Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('tgl_masalah')), '=', bulan),
                    Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('tgl_masalah')), '=', tahun)
                ]
            }
        };

        if (st_report !== 'all') {
            kondisi.status = st_report;
        }

        const response = await Report.findAll({
            where: kondisi,
            order: [['id', 'DESC']],
        });

        const plainResponse = response.map(item => item.get({ plain: true }));

        plainResponse.forEach((item) => {
            const screenshotPath = '/assets/' + item.screenshot;
            item.lampiran = screenshotPath;
        });

        res.status(200).json(plainResponse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = path.join(__dirname, '..', 'assets');
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, uniqueSuffix + ext);
    },
});

const upload = multer({ storage: storage });

exports.createReport = async (req, res) => {
    try {
        upload.single('photo')(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ result: err.message });
            }
            const {
                nama_app,
                pelapor,
                tgl_masalah,
                server,
                keluhan,
                solusi,
                lama_fixing,
                skala,
                priority,
                tim_bertugas,
                cs,
                status
            } = req.body;

            try {
                const newFileName = req.file.filename ?? "";

                const newReport = new Report({
                    nama_app,
                    pelapor,
                    tgl_masalah,
                    server,
                    keluhan,
                    screenshot: newFileName,
                    solusi,
                    lama_fixing,
                    skala,
                    priority,
                    tim_bertugas,
                    cs,
                    status
                });
                await newReport.save();
                return res.status(200).json({ status: "Berhasil Tambah!" });
            } catch {
                const newReport = new Report({
                    nama_app,
                    pelapor,
                    tgl_masalah,
                    server,
                    keluhan,
                    screenshot: "",
                    solusi,
                    lama_fixing,
                    skala,
                    priority,
                    tim_bertugas,
                    cs,
                    status
                });
                await newReport.save();
                return res.status(200).json({ status: "Berhasil Tambah!" });
            }
        });
    } catch (err) {
        return res.status(500).json({
            result: err.message
        });
    }
};

exports.updateReport = async (req, res) => {
    try {
        upload.single('photo')(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ result: err.message });
            }
            try {
                const { screenshot } = req.body;

                const file = req.file;

                const newFileName = req.file.filename;

                if (file != null) {
                    const filePath = path.join(__dirname, '..', 'assets', screenshot);
                    fs.unlink(filePath, async (no_assets) => {
                        if (no_assets) {
                            let newData = {
                                ...req.body,
                                screenshot: newFileName
                            }
                            await Report.update(newData, {
                                where: { id: req.body.id }
                            });
                            res.status(200).json({ status: "Berhasil Edit!" });
                        } else {
                            let newData = {
                                ...req.body,
                                screenshot: newFileName
                            }
                            await Report.update(newData, {
                                where: { id: req.body.id }
                            });
                            res.status(200).json({ status: "Berhasil Edit!" });
                        }
                    });
                } else {
                    try {
                        await Report.update(req.body, {
                            where: { id: req.body.id }
                        });
                        res.status(200).json({ status: "Berhasil Edit!" });
                    } catch (error) {
                        return res.status(500).json({
                            result: err.message
                        });
                    }
                }
            } catch {
                try {
                    await Report.update(req.body, {
                        where: { id: req.body.id }
                    });
                    res.status(200).json({ status: "Berhasil Edit!" });
                } catch (error) {
                    return res.status(500).json({
                        result: err.message
                    });
                }
            }
        });
    } catch {
        try {
            await Report.update(req.body, {
                where: { id: req.body.id }
            });
            res.status(200).json({ status: "Berhasil Edit!" });
        } catch (error) {
            return res.status(500).json({
                result: err.message
            });
        }
    }
};

exports.deleteReport = async (req, res) => {
    try {
        const { id, fileName } = req.body;
        const filePath = path.join(__dirname, '..', 'assets', fileName);

        fs.unlink(filePath, async (no_assets) => {
            if (no_assets) {
                await Report.destroy({
                    where: { id: id }
                });
                res.status(200).json({ status: "Berhasil Hapus!" });
            } else {
                await Report.destroy({
                    where: { id: id }
                });
                res.status(200).json({ status: "Berhasil Hapus!" });
            }
        });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.toggleStatus = async (req, res) => {
    try {
        const { id, status } = req.body;
        await Report.update(
            { status },
            { where: { id: id } }
        );
        res.status(200).json({ status: "Berhasil mengubah status!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};