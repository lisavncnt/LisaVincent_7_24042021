const express = require('express');
const user_ctrl = require('../controllers/user');
const router = express.Router();

router.post('/register', user_ctrl.signup);
//router.post('/login', user_ctrl.signin);

module.exports = router;