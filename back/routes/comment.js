const express = require('express');
const router = express.Router();
const comment_ctrl = require('../controllers/comment');
const  auth_params = require('../middleware/auth-params');
const auth = require('../middleware/auth');


router.post('/add', auth_params, comment_ctrl.createComment);
router.get('/', auth_params, comment_ctrl.getAllComments);
router.get('/:id', auth_params, comment_ctrl.getComment);
router.put('/:id', auth_params, comment_ctrl.modifyComment);
router.delete('/:id', auth_params, comment_ctrl.deleteComment);

module.exports = router;