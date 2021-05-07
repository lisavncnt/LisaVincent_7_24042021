const express = require('express');
const router = express.Router();
const user_ctrl = require('../controllers/user');

router.post('/signup', user_ctrl.signup);
router.post('/signin', user_ctrl.signin);
router.get('/profil/:id', user_ctrl.getUser);
router.put('/profil/:id', user_ctrl.modifyUser);
router.delete('/profil/:id', user_ctrl.deleteUser);

module.exports = router;