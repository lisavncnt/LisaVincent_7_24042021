const express = require('express');
const router = express.Router();
const post_ctrl = require('../controllers/post');
// const {verify} = require('../middleware/auth');

router.post('/add',  post_ctrl.createPost);
router.get('/', post_ctrl.getAllPosts);
router.get('/:id', post_ctrl.getPost);
router.put('/:id', post_ctrl.updatePost);
router.delete('/:id', post_ctrl.deletePost);

module.exports = router;