const express = require('express');
const router = express.Router();
const post_ctrl = require('../controllers/post');
// const {verify} = require('../middleware/auth');

router.post('/add',  post_ctrl.createPost);
router.get('/', post_ctrl.getAllPosts);
router.get('/post/:id', post_ctrl.getPost);
router.put('/post/:id', post_ctrl.updatePost);
router.delete('/post/:id', post_ctrl.deletePost);

module.exports = router;