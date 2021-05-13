const User = require('../models/user');
const Post = require('../models/post');
Post.belongsTo(User, {foreignKey: 'user_id'});
User.hasMany(Post, {foreignKey: 'post_id'});

exports.createPost = (req, res) => {
    const body = req.body;
        Post.create({
            ...body
        })
        .then(() => res.status(200).json({ message: "Post created !"}))
        .catch(error => res.status(400).json({error}));
};

exports.getAllPosts = (req, res) => {
    Post.findAll({})
    .then((posts) => res.status(200).json({posts}))
    .catch(error => res.status(400).json({error}));
};

exports.getPost = (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        }
    })
    .then((post) => res.status(200).json(post))
    .catch(error => res.status(404).json({error: error}));
};

exports.updatePost = async (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id,
        }
    })
    await Post.create({
        title: req.body.title,
        content: req.body.content
    })
    .then((post) => res.status(200).json(post))
    .catch(error => res.status(404).json({error: error}));
};

exports.deletePost = async (req, res) => {
    await Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => res.status(200).json({ message : "Post deleted !"}))
    .catch(error => res.status(400).json({ error }));
};