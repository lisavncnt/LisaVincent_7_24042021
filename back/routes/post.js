const express = require('express');
const router = express.Router();
const post_ctrl = require('../controllers/post');
const auth = require('../middleware/auth');

router.post('/messages/add', auth, post_ctrl.createPost);
router.get('/messages/',  post_ctrl.getAllPosts);
router.get('/message/:id', auth, post_ctrl.getPost);
router.put('/message/:id', auth, post_ctrl.updatePost);
router.delete('/message/:id', auth, post_ctrl.deletePost);

module.exports = router;