const MasterServer = require('../models/masterServerModel.js');

exports.getMasterServer = async (req, res) => {
    try {
        const response = await MasterServer.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};