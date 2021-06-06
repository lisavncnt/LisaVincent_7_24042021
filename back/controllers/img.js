const fs = require('fs');
const User = require('../models/user');
const Img = require('../models/img');
Img.belongsTo(User, {foreignKey: 'user_id'});

exports.createImg = (req, res) => {
    const body = req.body;
    Img.create({
        ...body,
        image_url: 
        `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    })
    .then(() => res.status(200).json({ message: 'Post image created !'}))
    .catch(error => res.status(400).json({error}));
};

exports.getAllImg = (req, res) => {
    Img.findAll({})
    .then((imgs) => res.status(200).json(imgs))
    .catch(error => res.status(400).json({error}));
};

exports.getImg = (req, res) => {
    Img.findOne({
        where: {
            id: req.params.id
        }
    })
    .then((img) => res.status(200).json(img))
    .catch(error => res.status(400).json({error}))
};

exports.updateImg = async (req, res) => {
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

exports.deleteImg = async (req, res) => {
    await Img.find({
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