const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const user_ctrl = require('../controllers/user');
const auth_params = require('../middleware/auth-params');

router.post('/auth/signup', multer, user_ctrl.signup);
router.post('/auth/signin', user_ctrl.signin);
router.get('/users/:id', auth_params, user_ctrl.getUser);
router.get('/users', auth_params, user_ctrl.getAllProfils);
router.put('/modify-user/:id', auth_params, multer, user_ctrl.modifyUser);
router.put('/modify-password/:id', auth_params, user_ctrl.modifyPassword);
router.delete('/users/:id', auth_params,user_ctrl.deleteUser);

module.exports = router;