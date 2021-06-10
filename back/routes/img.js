const express = require('express');
const router = express.Router();
const img_ctrl = require('../controllers/img');
const  auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/add', auth, multer, img_ctrl.createImg);
router.get('/', auth, img_ctrl.getAllImg);
router.get('/:id', auth, img_ctrl.getImg);
router.put('/:id', auth, multer, img_ctrl.updateImg);
router.delete('/:id', auth, img_ctrl.deleteImg);

module.exports = router;