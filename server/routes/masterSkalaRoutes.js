const express = require('express');
const { getMasterSkala, createMasterSkala, updateMasterSkala, deleteMasterSkala } = require('../controllers/masterSkalaController.js');
const { requireAuth } = require('../middlewares/requireAuth.js');

const router = express.Router();

router.get('/master-skala', requireAuth, getMasterSkala);
router.post('/master-skala', requireAuth, createMasterSkala);
router.put('/master-skala/:id', requireAuth, updateMasterSkala);
router.delete('/master-skala/:id', requireAuth, deleteMasterSkala);

module.exports = router;