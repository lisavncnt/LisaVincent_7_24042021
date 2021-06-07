const express = require('express');
const router = express.Router();
const post_ctrl = require('../controllers/post');
const auth = require('../middleware/auth');
const auth_params = require('../middleware/auth-params');

router.post('/messages/add', auth_params, post_ctrl.createPost);
router.get('/messages/' , auth_params,  post_ctrl.getAllPosts);
router.get('/message/:id', auth_params,  post_ctrl.getPost);
router.put('/message/:id',  auth_params, post_ctrl.updatePost);
router.delete('/message/:id',  auth_params, post_ctrl.deletePost);

module.exports = router;