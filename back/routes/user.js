const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const user_ctrl = require('../controllers/user');
const auth = require('../middleware/auth');
const auth_params = require('../middleware/auth-params');

router.post('/auth/signup', multer, user_ctrl.signup);
router.post('/auth/signin', user_ctrl.signin);
router.get('/user/:id', auth_params, user_ctrl.getUser);
router.get('/users', auth, multer, user_ctrl.getAllProfils);
router.put('modify/user/:id', auth, multer, user_ctrl.modifyUser);
router.delete('/user/:id', auth, user_ctrl.deleteUser);

module.exports = router;