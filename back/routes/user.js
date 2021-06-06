const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const user_ctrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/auth/signup', multer, user_ctrl.signup);
router.post('/auth/signin', user_ctrl.signin);
router.get('/user/:id', user_ctrl.getUser);
router.get('/users', multer, user_ctrl.getAllProfils);
router.put('/user/:id', multer, user_ctrl.modifyUser);
router.delete('/user/:id', user_ctrl.deleteUser);

module.exports = router;