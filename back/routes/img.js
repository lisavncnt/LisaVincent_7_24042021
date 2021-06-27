const express = require('express');
const router = express.Router();
const img_ctrl = require('../controllers/img');
const  auth_params = require('../middleware/auth-params');
const multer = require('../middleware/multer-config');

router.post('/images/add', auth_params, multer, img_ctrl.createImg);
router.get('/images', auth_params, img_ctrl.getAllImg);
router.get('/image/:id', auth_params, img_ctrl.getImg);
router.put('edit-image/:id', auth_params, multer, img_ctrl.updateImg);
router.delete('image/:id', auth_params, img_ctrl.deleteImg);

module.exports = router;