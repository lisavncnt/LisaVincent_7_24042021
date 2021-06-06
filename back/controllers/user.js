const User = require('../models/user');
const Post = require('../models/post');
const Img = require('../models/img');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

User.hasMany(Post, {onDelete: "cascade"});
User.hasMany(Img, {onDelete: "cascade"});


exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            User.create({
                image_url: req.body.image_url,
                pseudo: req.body.pseudo,
                email: req.body.email,
                is_admin: req.body.is_admin,
                likes: 0,
                dislikes: 0,
                usersLiked: [],
                usersDisliked: [],
                post_id:[],
                image_id: [],
                password: hash
            })
            .then(() => res.status(201).json({ message: 'User created !' }))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.signin = (req, res, next) => {
    User.findOne({ 
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

exports.getAllProfils = (req, res) => {
  User.findAll({})
  .then((users) => res.status(200).json(users))
  .catch(error => res.status(400).json(error));
};

exports.modifyUser = (req, res, next) => {
  const id = req.params.id;
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const userId = decodedToken.user_id;

  if(id === userId) {
    User.findOne({
      where: {id: req.params.id}
    }).then(
      user => {
        //bcrypt.hash

        if (req.file) {
          if (user.image_url !== null) {
            const fileName = user.image_url.split('/images/')[1]
            false.unlink(`images/${fileName}`, (err => {
              if (err) {console.log(err)};
            }))
          }
          req.body.image_url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        }
        delete(req.body.is_admin);
        user.update({
          ...req.body,
          where: {
            id: req.params.id
          }
        }).then(
          (user) => {
            res.status(200).json(user), 
            console.log(user)
          }
        ).catch(
          error => res.status(400).json({error})
        )
      }
    ).catch(
      error => res.status(404).json({error})
    )
  }
};

exports.modifyPassword = (req, res, next) => {
  const id = req.params.id;
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const userId = decodedToken.user_id;

  if(id === userId) {
    User.findOne({
      where: {
        id: req.params.id
      }
    }).then(
      (user) => {
        bcrypt.hash(user.password, 10)
        .then(
          (hash => {
            user.update({
              password: hash,
              id: req.params.id
            }).then(
              () => res.status(200).json({error})
            ).catch(
              (error) => res.status(400).json({error})
            );
          })
        ).catch(
          (error) => res.status(400).json({ error })
        )
      }
    );
  }
};

// exports.modifyUser = async (req, res) => {
//   const id = req.params.id;
//   const token = req.headers.authorization.split(' ')[1];
//   const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
//   const userId = decodedToken.user_id;

//   if(id === userId) {
//     User.update({ where: { id: req.params.id } })
//       .then(user => {
//         console.log(user);
    //     if (req.file) {
    //       if (user.image_url !== null){
    //         const fileName = user.image_url.split('/images/')[1]
    //         fs.unlink(`images/${fileName}`, (err => {
    //           if (err) console.log(err);
    //           else {
    //               console.log("Image supprimée: " + fileName);
    //           }
    //         }))
    //       }
    //       req.body.image_url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    //     }
    //   delete(req.body.is_admin);
    //   user.update( {...req.body, id: req.params.id})
    //   .then(() => res.status(200).json({ message: 'Votre profil est modifié !' }))
    //   .catch(error => res.status(400).json({ error }));
    //   })
    // .catch(error => res.status(500).json({ error }));
//   } else {
//     return res.status(401).json({ error: "vous n'avez pas l'autorisation nécessaire !" });
//   }
// };

exports.deleteUser = async (req, res, next) => {
    await User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => res.status(201).json({ message: 'User deleted !' }))
    .catch(error => res.status(400).json({ error }));
};