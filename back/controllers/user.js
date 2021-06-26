const {User, Post, Img, Comment} = require('../models');

User.hasMany(Post, {
  foreignKey: { as: 'id', constraints: false },
  onDelete: 'cascade',
});
User.hasMany(Comment, {
  foreignKey: { as: 'id', constraints: false},
  onDelete: 'cascade',
});
User.hasMany(Img, {
  foreignKey: { as: 'id', constraints: false },
  onDelete: 'cascade',
})

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');

exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            User.create({
                image_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                pseudo: req.body.pseudo,
                email: req.body.email,
                is_admin: req.body.is_admin,
                likes: 0,
                password: hash
            })
            .then(() => res.status(201).json({ message: 'User created !' }))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.signin = (req, res) => {
    User.findOne({ 
      where: {
          email: req.body.email
      }
    }).then((user) => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then((valid) => {
            console.log('>> req.body.password: ' + req.body.password);
            console.log('>> user password hash: ' + user.password);
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
          }).catch((error) => res.status(400).json({ error }))
      }).catch((error) => res.status(500).json({ error }));
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

exports.modifyUser = (req, res) => {
  const id = req.params.id;
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const userId = decodedToken.user_id;

  if(id === userId) {
    User.findOne({
      where: {
        id: id
      }
    }).then(
      user => {
        if (req.file) {
          if (user.image_url !== null) {
            const fileName = user.image_url.split('/images/')[1]
            fs.unlink(`images/${fileName}`, (err => {
              if (err) {console.log(err)};
            }))
          }
          req.body.image_url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        }
        user.update({
          ...req.body,
          where: {
            id: req.params.id
          }
        }).then(
          (user) => {
            res.status(200).json(user)
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

exports.modifyPassword = (req, res) => {
  const id = req.params.id;
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const userId = decodedToken.user_id;

  if(id === userId) {
    User.findOne({
      where: {
        id: req.params.id
      },
    }).then(
      (user) => {
        console.log('>> old password hash: ' + user.password);
        bcrypt.hash(user.password, 10)
        .then(
          (hash => {
            console.log('>> new password hash: ' + hash);
            user.update({
              password: hash
            }).then(
              (user) => res.status(200).json(user)
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

// essayer user.destroy sans user.find
// supprimer l'image (mais avec user.find)
// exports.deleteUser = async (req, res) => {
//   const user = await User.findOne({ where: {id: req.params.id }});
//     user.destroy()
//     .then(() => res.status(201).json({ message: 'User deleted !' }))
//     .catch(error => res.status(400).json({ error }));
// };

exports.deleteUser = async (req, res) => {
  await User.findOne({
    where: { id: req.params.id }
  }).then(
    user => {
      const filename = user.image_url.split('/images/'[1]);
      fs.unlink(`images/${filename}`, () => {
        User.destroy({
          where: { id: req.params.id }
        });
      });
    }
  ).catch( error => res.status(400).json({error}));
};