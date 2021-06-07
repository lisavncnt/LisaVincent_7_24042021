const express = require('express');
const router = express.Router();
const img_ctrl = require('../controllers/img');
const  auth_params = require('../middleware/auth-params');
const multer = require('../middleware/multer-config');

router.post('/add', auth_params, multer, img_ctrl.createImg);
router.get('/', auth_params, img_ctrl.getAllImg);
router.get('/:id', auth_params, img_ctrl.getImg);
router.put('/:id', auth_params, multer, img_ctrl.updateImg);
router.delete('/:id', auth_params, img_ctrl.deleteImg);

module.exports = router;