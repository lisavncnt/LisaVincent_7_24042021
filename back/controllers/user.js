const { User } = require('../models/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = require('../routes/user');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            User.create({
                image_url: req.body.image_url,
                complete_name: req.body.complete_name,
                biography: req.body.biography,
                city: req.body.city,
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

// exports.signin = (req,res, next) => {
//     console.log('function begin');
    // User.findOne({ 
    //     where: {
    //         email: req.body.email
    //     }
    // })
//     .then(user => {
//         console.log('email find, try to auth');
//         if(user.length < 1) {
//             return res.status(401).json({
//                 message: 'Auth failed'
//             });
//         }
//         bcrypt.compare(req.body.password, user.password, (err, res) => {
            
            
//         });
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({
//             message: 'Cannot find User'
//         });
//     });
// };

exports.signin = (req, res, next) => {
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
              user_id: user.id,
              is_admin: user.is_admin,
              token: jwt.sign(
                  { userId: user.id },
                  'RANDOM_TOKEN_SECRET',
                  { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};

exports.getUser = (req, res, next) => {
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