const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const localStorage = require('node-localstorage');
localStorage.LocalStorage('../my-code');

exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            User.create({
                image_url: req.body.image_url,
                pseudo: req.body.pseudo,
                email: req.body.email,
                is_admin: req.body.is_admin,
                password: hash
            })
            .then(() => res.status(201).json({ message: 'User created !' }))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.signin = async (req, res, next) => {
    await User.findOne({ 
      where: {
          email: req.body.email
      }
    }).then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
                user_id: user.id,
                is_admin: user.is_admin,
                token: jwt.sign(
                    { user_id: user.id },
                    process.env.JWT_SECRET_KEY,
                    { expiresIn: '24h' }
                )});  
          }).catch(error => res.status(401).json({ error }))
      }).catch(error => res.status(500).json({ error }));
};

exports.getUser = (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(
        (user) => {
            res.status(200).json(user);
        })
    .catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        });
};

exports.modifyUser = async (req, res) => {
  const id = JSON.parse(req.params.id)
  const token = req.headers.authorization.split(' ')[1];//On extrait le token de la requête
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);//On décrypte le token grâce à la clé secrète
  const userId = decodedToken.userId;//On récupère l'userId du token décrypté
  if(id === userId) {
    User.findOne({ where: { id: id } })
      .then(user => {
        //Si une nouvelle image est reçue dans la requête
        if (req.file) {
          if (user.image !== null){
            const fileName = user.image.split('/images/')[1]
            fs.unlink(`images/${fileName}`, (err => {//On supprime l'ancienne image
              if (err) console.log(err);
              else {
                  console.log("Image supprimée: " + fileName);
              }
            }))
          }
          req.body.image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        }
        delete(req.body.is_admin);
        user.update( {...req.body, id: req.params.id} )
        .then(() => res.status(200).json({ message: 'Votre profil est modifié !' }))
        .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  }else {
    return res.status(401).json({ error: "vous n'avez pas l'autorisation nécessaire !" });
  }
    // User.destroy({
    //     where: {
    //         id:req.params.id
    //     }
    // });
    // bcrypt.hash(req.body.password, 10)
    //     .then(hash => {
    //         User.create({
    //             image_url: req.body.image_url,
    //             pseudo: req.body.pseudo,
    //             email: req.body.email,
    //             is_admin: req.body.is_admin,
    //             password: hash
    //         })
    //         .then(() => res.status(200).json({message: 'user update'}))
    //         .catch(err => res.json({err}));
    //     })
};

exports.deleteUser = async (req, res, next) => {
    await User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => res.status(201).json({ message: 'User deleted !' }))
    .catch(error => res.status(400).json({ error }));
};