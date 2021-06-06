const { User, Post, Comment } = require('../models/index');
// const Comment = require('../models/comment');

// this is probably false or write bad
    Post.belongsTo(User);
    Post.hasMany(Comment, {
        onDelete: "cascade"
    })


const jwt = require('jsonwebtoken');
// const user_id = sessionStorage.getItem('user_id');

exports.createPost = (req, res) => {
    const body = req.body;
    Post.create({
        ...body
    }).then(
        (post) => {
            res.status(200).json({ message: "Post created !"})
        }
    ).catch(
        error => res.status(400).json({error})
    );
};

exports.getAllPosts = (req, res) => {
    Post.findAll({
        include: [
            {
                model: User,
                // model: Comment
            }
        ]
    })
    .then((posts) => res.status(200).json(posts))
    .catch(error => res.status(400).json({error}));
}; 

exports.getPost = (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: User,
                // model: Comment
            }
        ]
    })
    .then((post) => res.status(200).json(post))
    .catch(error => res.status(404).json({error: error}));
};

exports.updatePost = (req, res) => {
    // const id = sessionStorage.getItem('user_id');
    const post_id = req.params.id;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decodedToken.user_id;

    // if(id === userId) {
        // console.log("id" + id);
        console.log("userId" + userId);
        Post.findOne({ where: {id: post_id }})
            .then(post => {
                // console.log(...req.body);
                post.update( {...req.body, id : post_id})
                .then(() => res.status(200).json({ message: 'Votre post a bien été modifié !'}))
                .catch(error => res.status(400).json({error}));
            }).catch(
                error => res.status(500).json({ error })
            )
    // } else {
    //     return res.status(418).json({ error: "Vous n'avez pas l'autorisation nécessaire !" })
    // }
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