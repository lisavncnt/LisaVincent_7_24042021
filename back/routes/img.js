const express = require('express');
const router = express.Router();
const img_ctrl = require('../controllers/img');

router.post('/add', img_ctrl.createImg);
router.get('/', img_ctrl.getAllImg);
router.get('/:id', img_ctrl.getImg);
router.put('/:id', img_ctrl.updateImg);
router.delete('/:id', img_ctrl.deleteImg);

module.exports = router;