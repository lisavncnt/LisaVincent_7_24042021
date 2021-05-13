const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const { Post } = require('../models');
// User.hasMany(Post, {foreignKey: 'post_id'});

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

exports.signin = (req, res) => {
    User.findOne({ 
        where: {
            email: req.body.email
        }
    })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
                userId: user.id,
                token: jwt.sign(
                    payload,
                    process.env.ACCESS_TOKEN_SECRET, {
                        algorithm: 'HS256',
                        expiresIn: process.env.ACCESS_TOKEN_LIFE
                    }
                )
              });
          })
          res.cookie("jwt", accessToken, {secure: true, httpOnly: true})
          res.send()
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
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
    User.destroy({
        where: {
            id:req.params.id
        }
    });
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            User.create({
                image_url: req.body.image_url,
                pseudo: req.body.pseudo,
                email: req.body.email,
                is_admin: req.body.is_admin,
                password: hash
            })
            .then(() => res.status(200).json({message: 'user update'}))
            .catch(err => res.json({err}));
        })
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