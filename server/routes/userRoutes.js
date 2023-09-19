const express = require('express');
const { signIn } = require('../controllers/authController.js');

const router = express.Router();

// auth 
router.post('/login', signIn);

module.exports = router;