const express = require('express');
const { createMasterTim, updateMasterTim, getMasterTim, deleteMasterTim } = require('../controllers/masterTimController.js');
const { requireAuth } = require('../middlewares/requireAuth.js');

const router = express.Router();

router.get('/master-tim', requireAuth, getMasterTim);
router.post('/master-tim', requireAuth, createMasterTim);
router.put('/master-tim/:id', requireAuth, updateMasterTim);
router.delete('/master-tim/:id', requireAuth, deleteMasterTim);

module.exports = router;