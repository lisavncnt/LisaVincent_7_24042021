const express = require('express');
const router = express.Router();
const user_ctrl = require('../controllers/user');
const { database } = require('../models/connexion');

router.post('/signup', user_ctrl.signup);
router.post('/signin', user_ctrl.signin);
router.get('/profil/:id', user_ctrl.getUser);

module.exports = router;