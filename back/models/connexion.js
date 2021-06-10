const {Sequelize,DataTypes} = require('sequelize');

const database = new Sequelize('groupomania_db', 'groupomania_admin', '2txJG6?a5N5S!ZhvZwe', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
  });

database.authenticate()
    .then(() => console.log("Vous êtes maintenant connecté à la base de donnée !"))
    .catch(err => console.log("erreur d'authentification: " + err));

module.exports = {Sequelize, DataTypes,database};
