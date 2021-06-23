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
        User.findOne({
            where: { id: req.params.id }
        }).then(
            (user) => {
                user.update({
                    image_id: image.id
                })
            }
        ).catch(
            (error) => {
                res.status(404).json({error});
            }
        )
    }).catch(error => res.status(400).json({error}));
}



exports.getAllImg = (req, res) => {
    Img.findAll({
        include: [
            { 
                model: User,
                attributes: ['id', 'pseudo', 'image_url']
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
                model: User,
                attributes: ['id', 'pseudo', 'image_url']
            }
        ]
    })
    .then((img) => res.status(200).json(img))
    .catch(error => res.status(400).json({error}))
};

exports.updateImg = (req, res) => {
    const id = JSON.parse(req.params.id)
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decodedToken.user_id;
    if(id === userId) {
        Img.findOne({ where: { id: id } })
            .then(img => {
                if (req.file) {
                    if (img.image !== null){
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
      })
      .catch(error => res.status(500).json({ error }));
  } else {
    return res.status(401).json({ error: "vous n'avez pas l'autorisation nécessaire !" });
  }
};

exports.deleteImg = (req, res) => {
    Img.find({
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
    .then(() => res.status(200).json({ message: 'Image deleted !'}))
    .catch(error => res.status(400).json({error}));
};