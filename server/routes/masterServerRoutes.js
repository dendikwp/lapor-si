const express = require('express');
const { getMasterServer } = require('../controllers/masterServerController.js');
const { requireAuth } = require('../middlewares/requireAuth.js');

const router = express.Router();

router.get('/master-server', requireAuth, getMasterServer);

module.exports = router;
