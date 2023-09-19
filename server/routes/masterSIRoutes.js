const express = require('express');
const { createMasterSI, updateMasterSI, getMasterSI, deleteMasterSI } = require('../controllers/masterSIController.js');
const { requireAuth } = require('../middlewares/requireAuth.js');

const router = express.Router();

router.get('/master-si', requireAuth, getMasterSI);
router.post('/master-si', requireAuth, createMasterSI);
router.put('/master-si/:id', requireAuth, updateMasterSI);
router.delete('/master-si/:id', requireAuth, deleteMasterSI);

module.exports = router;