// const { User, Post, Comment } = require('../models/index');
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
            User.findOne({
                where: { id: req.params.id }
            }).then(
                (user) => {
                    user.update({
                        post_id: post.id
                    })
                }
            ).catch((error) => res.status(404).json({error: "cannot find user associate"}))
        }
    ).catch(
        (error) => {
            res.status(400).json({error});
            console.log(">> Error while creating post: ", error);
        }
    );
};

exports.getAllPosts = (req, res) => {
    Post.findAll({
        include: [
            {
                model: User,
                attributes: ['id', 'pseudo', 'photo']
            }
        ]
    })
    .then((posts) => {
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(400).json({error});
        console.error(">> Error: " + JSON.stringify(error));
    });
}; 

exports.getPost = (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        include: [
            { model: User, attributes: ['id', 'pseudo', 'photo'] }
        ]
    })
    .then((post) => res.status(200).json(post))
    .catch(error => {
        res.status(404).json({error: error});
        console.log(error);
    });
};

exports.updatePost = (req, res) => {
    const id = sessionStorage.getItem('user_id');
    const post_id = req.params.id;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decodedToken.user_id;

    if(id === userId) {
        console.log("id " + id);
        console.log("userId " + userId);
        Post.findOne({ where: {id: post_id }})
            .then(post => {
                console.log(...req.body);
                post.update( {...req.body, id : post_id})
                .then(() => res.status(200).json({ message: 'Votre post a bien été modifié !'}))
                .catch(error => res.status(400).json({error}));
            }).catch(
                error => res.status(500).json({ error })
            )
    } else {
        return res.status(418).json({ error: "Vous n'avez pas l'autorisation nécessaire !" })
    }
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