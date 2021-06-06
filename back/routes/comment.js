const express = require('express');
const router = express.Router();
const comment_ctrl = require('../controllers/comment');
const auth = require('../middleware/auth');


router.post('/add', comment_ctrl.createComment);
router.get('/', comment_ctrl.getAllComments);
router.get('/:id', comment_ctrl.getComment);
router.put('/:id', comment_ctrl.modifyComment);
router.delete('/:id', comment_ctrl.deleteComment);

module.exports = router;