const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

router.post('/register', registerUser); // POST /api/user/register
router.post('/login', loginUser);       // POST /api/user/login

module.exports = router;
