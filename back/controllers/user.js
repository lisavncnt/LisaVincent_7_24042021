const { User } = require('../models/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

exports.signin = (req,res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'User not found.'});
        }
        bcrypt.compare(req.body.password, user.body.password)
        .then(valid => {
            if (!valid) {
                res.status(401).json({ error: 'Incorrect password.' });
            }
            res.status(200).json({
                id: user.id,
                is_admin: user.is_admin,
                token: jwt.sign(
                    { id: user.id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h'}
                )
            });
        })
        .catch(error => res.status(501).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
}