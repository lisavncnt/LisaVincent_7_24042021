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
    Img.findOne({ where: { id: req.params.id } })
            .then(img => {
                if (req.file) {
                    console.log(req.file);
                    if (img.image_url !== null){
                        const fileName = img.image.split('/images/')[1]
                        fs.unlink(`images/${fileName}`, (err => {
                            if (err) console.log(err);
                else {
                  console.log("Image supprimée: " + fileName);
                }
            }))
          }
          req.body.image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        }
        img.update( {...req.body, id: req.params.id} )
        .then(() => res.status(200).json({ message: 'Votre post est modifié !' }))
        .catch(error => res.status(400).json({ error }));
    }).catch(error => res.status(500).json({ error }));  
};

exports.deleteImg = async (req, res) => {
    await Img.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(img => {
        const filename = img.image_url.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            Img.destroy({
                where: {id: req.params.id}
            })
        });
    })
    .catch(error => res.status(400).json({error}));
};