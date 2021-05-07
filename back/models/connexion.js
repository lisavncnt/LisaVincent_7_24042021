const {Sequelize,DataTypes} = require('sequelize');

// Connexion to db
const database = new Sequelize(`mysql://groupomania_admin:2txJG6a5N@127.0.0.1/groupomania_db`, {
    logging: false,
});
// intégrer base de donnée de façon sécurisée

    
database.authenticate()
    .then(() => console.log("Vous êtes maintenant connecté à la base de donnée !"))
    .catch(err => console.log("erreur d'authentification: " + err));

module.exports = {Sequelize, DataTypes,database};
