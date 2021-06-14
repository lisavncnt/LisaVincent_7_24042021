const express = require('express');
const router = express.Router();
const post_ctrl = require('../controllers/post');
const auth = require('../middleware/auth');
const auth_params = require('../middleware/auth-params');

router.post('/messages/add', auth_params, post_ctrl.createPost);
router.get('/messages/' , auth_params,  post_ctrl.getAllPosts);
router.get('/messages/:id', auth_params,  post_ctrl.getPost);
router.put('/messages/:id',  auth_params, post_ctrl.updatePost);
router.delete('/messages/:id',  auth_params, post_ctrl.deletePost);

module.exports = router;