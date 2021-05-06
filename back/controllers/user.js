const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signup = (req, res, next) => {
    console.log("toto");
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            User.create({
                imageUrl: req.body.imageUrl,
                complete_name: req.body.complete_name,
                birthday: req.body.birthday,
                city: req.body.city,
                pseudo: req.body.pseudo,
                email: req.body.email,
                password: hash
            })
            .then(() => res.status(201).json({ message: 'Utilisateur cr�� !' }))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};