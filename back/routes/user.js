const express = require('express');
const router = express.Router();
const user_ctrl = require('../controllers/user');

router.post('/register', user_ctrl.signup);
router.post('/login', user_ctrl.signin);

module.exports = router;