const express = require('express');
const { createReport, getReport, deleteReport, updateReport, toggleStatus, getDateNow } = require('../controllers/reportController.js');
const { requireAuth } = require('../middlewares/requireAuth.js');

const router = express.Router();

router.get('/report/:bulan/:tahun/:st_report', requireAuth, getReport);
router.post('/report', requireAuth, createReport);
router.patch('/report', requireAuth, updateReport);
router.put('/report', requireAuth, deleteReport);
router.post('/toggle-report', requireAuth, toggleStatus);

router.get('/date', getDateNow);

module.exports = router;