const User = require('../models/user');
const Post = require('../models/post');
const Img = require('../models/img');
const Comment = require('../models/comment');

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});
Comment.belongsTo(Img, {
    foreignKey: 'image_id'
});
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

exports.createComment = (req, res) => {
    const body = req.body;
    Comment.create({
        ...body,
    }).then(
        (comment) => {
        res.status(200).json({ message: "Comment created !"})
        Post.findOne({
            where: { id: comment.post_id }
        }).then(
            (post) => {
                post.update({
                    comment_id: comment.id
                })
            }
        ).catch(
            (error) => {
                res.status(400).json({error});
            }
        );
        User.findOne({
            where: { id: req.params.id }
        }).then(
            (user) => {
                user.update({
                    comment_id: comment.id
                })
            }
        ).catch(
            (error) => {
                res.status(400).json({error});
            }
        );
    }).catch(
        error => res.status(400).json({error})
    );
};

exports.getAllComments = (req, res, next) => {
    Comment.findAll({
        include: [
            { model: User}
        ]
    })
    .then((comments) => res.status(200).json(comments))
    .catch(error => res.status(400).json({error}));
};

exports.getComment = (req, res, next) => {
    Comment.findOne({
        where: {
            id: req.params.id
        },
        include: [
            { model: User}
        ]
    })
    .then((comment) => res.status(200).json(comment))
    .catch(error => res.status(404).json({ error: error }));
};

exports.modifyComment = (req, res, next) => {
    Comment.findOne({
        where: {
            id: req.params.id
        }
    }).then(
        () => {
            Comment.update({
                ...req.body,
                where: {
                    id: req.params.id
                }
            })
            .then((comment) => res.status(200).json(comment))
            .catch(error => res.status(400).json({ error: error }))
        }
    ).catch(
        (error) => res.status(500).json({error: error})
    );
};

exports.deleteComment = async (req, res, next) => {
    await Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => res.status(200).json({ message: 'Comment deleted !'}))
    .catch(error => res.status(400).json({error}));
};