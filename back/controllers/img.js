const fs = require('fs');
const User = require('../models/user');
const Img = require('../models/img');
const Comment = require('../models/comment');

Img.belongsTo(User, { 
    foreignKey: 'user_id', 

});
Img.hasMany(Comment, {
    foreignKey: { as: 'id', constraints: false },
    onDelete: 'cascade',
});

const jwt = require('jsonwebtoken');

exports.createImg = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decodedToken.user_id;
    Img.create({
        ...req.body,
        user_id: userId,
        image_url: 
        `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    })
    .then((image) => {
        res.status(200).json(image);
    }).catch(error => res.status(400).json({error}));
}



exports.getAllImg = (req, res) => {
    Img.findAll({
        include: [
            { 
                model: User
            },
            {
                model: Comment
            }
        ],
        order: [['created_at', 'DESC']]
    })
    .then((images) => {
        res.status(200).json(images);
    })
    .catch(error => res.status(400).json({error}));
};

exports.getImg = (req, res) => {
    Img.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: User
            },
            { model: Comment,
                include: [{
                    model: User
                }],
                order: [['created_at', 'DESC']]
            }
        ]
    })
    .then((img) => res.status(200).json(img))
    .catch(error => res.status(400).json({error}))
};

exports.updateImg = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decodedToken.user_id;
        Img.findOne({
            where: { id: req.params.id }
        }).then(
            (image) => {
                if (req.file) {
                    if (image.image_url !== null) {
                        const filename = image.image_url.split('/images/')[1];
                        fs.unlink(`images/${filename}`, (err => {
                            if (err) {console.log(error)};
                        }));
                    }
                    req.body.image_url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                }
                image.update({
                    ...req.body,
                    where: {
                        id: req.params.id
                    }
                }).then(
                    (image) => {
                        console.log('image updated');
                        res.status(200).json(image)
                    }
                ).catch(
                    error => res.status(400).json({error})
                )
            }
        ).catch(
            error => res.status(404).json({ error })
        );
};

// exports.deleteImg = (req, res) => {
//     Img.findOne({
//         where: {
//             id: req.params.id
//         }
//     })
//     .then(img => {
//         const filename = img.image_url.split('/images/')[1];
//         fs.unlink(`images/${filename}`, () => {
//             Img.destroy({
//                 where: {id: req.params.id}
//             })
//         });
//     })
//     .catch(error => res.status(400).json({error}));
// };

exports.deleteImg = (req, res) => {
    Img.findOne({
        where: { id: req.params.id }
    }).then(
        (image) => {
            console.log('req.params.id:' + req.params.id);
            if (image.image_url) {
                const filename = image.image_url.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Img.destroy({
                        where: { id: req.params.id }
                    }).then(() => res.status(200).json({ message: 'Image deleted'}))
                    .catch((error) => res.status(400).json({error}))
                });
            }
            // Img.destroy({
            //     where: { id: req.params.id }
            // }).then(() => res.status(200).json({ message: 'Image deleted'}))
            // .catch((error) => res.status(400).json({error}))
        }
    ).catch(
        (error) => {
            console.error(error);
            res.status(500).json({error: error})
        }
    );
}