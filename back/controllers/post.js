const Comment = require('../models/comment');
const User = require('../models/user');
const Post = require('../models/post');

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: { as: 'id', constraints: false },
    onDelete: 'cascade',
});

const jwt = require('jsonwebtoken');

exports.createPost = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decodedToken.user_id;

    Post.create({
        ...req.body, 
        user_id: userId 
    }).then(
        (post) => {
            res.status(200).json(post);
        }
    ).catch(
        (error) => {
            res.status(400).json({error});
        }
    );
};

exports.getAllPosts = (req, res) => {
    Post.findAll({
        include: [
            { model: User },
            { 
                model: Comment
            }
        ],
        order: [['created_at', 'DESC']]
    })
    .then((posts) => {
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(400).json({error});
    });
}; 

exports.getPost = (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        include: [
            { model: User },
            { model: Comment,
                include: [{
                    model: User
                }],
                order: [['created_at', 'DESC']]
            }
        ]
    })
    .then((post) => res.status(200).json(post))
    .catch(error => {
        res.status(404).json({error: error});
    });
};

exports.updatePost = (req, res) => {
    const post_id = req.params.id;

    Post.findOne({ where: {id: post_id }})
        .then(post => {
            post.update( {...req.body, id : req.params.id})
            .then(() => res.status(200).json({ message: 'Votre post a bien été modifié !'}))
            .catch(error => res.status(400).json({error}));
        }).catch(
            error => res.status(500).json({ error })
        )
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