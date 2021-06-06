const express = require('express');
const router = express.Router();
const img_ctrl = require('../controllers/img');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/add', multer, img_ctrl.createImg);
router.get('/', img_ctrl.getAllImg);
router.get('/:id', img_ctrl.getImg);
router.put('/:id', multer, img_ctrl.updateImg);
router.delete('/:id', img_ctrl.deleteImg);

module.exports = router;