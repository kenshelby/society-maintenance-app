const express = require('express');
const router = express.Router();
const { login } = require('../controllers/adminController');

router.post('/login', login); // POST /api/admin/login

module.exports = router;
