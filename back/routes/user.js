const express = require('express');
const router = express.Router();
const user_ctrl = require('../controllers/user');

router.post('/auth/signup', user_ctrl.signup);
router.post('/auth/signin', user_ctrl.signin);
router.get('/user/:id', user_ctrl.getUser);
router.get('/users', user_ctrl.getAllProfils);
router.put('/user/:id', user_ctrl.modifyUser);
router.delete('/user/:id', user_ctrl.deleteUser);

module.exports = router;