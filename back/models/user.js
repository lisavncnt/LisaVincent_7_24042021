'use strict';
const {Sequelize, DataTypes, database} = require('./connexion');

const User = database.define('User', {
    pseudo: {
        type: DataTypes.STRING,
        required: true,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        required: true,
        unique: true
    },
    password: { type: DataTypes.STRING, required: true },
    image_url: { type: DataTypes.STRING },
    is_admin: {
        type:DataTypes.BOOLEAN,
        defaultValue:0
    }
}, {
    Sequelize,
    modelName: 'User',
    underscored: true,
    paranoid: false
});


module.exports = User;

// const { Sequelize, UUID, UUIDV4 } = require('sequelize');
// const sequelize = require('../utils/database');

// const User = sequelize.define('users', {
//     id: {
//         type: Sequelize.UUID,
//         defaultValue: Sequelize.UUIDV4,
//         allowNull: false,
//         primaryKey: true,
//     },
//     imageUrl: { type: Sequelize.STRING },
//     complete_name: { type: Sequelize.STRING, allowNull: true, unique: true},
//     birthday: { type: Sequelize.DATE },
//     city: { type: Sequelize.STRING },
//     pseudo: { type: Sequelize.STRING, allowNull: false, unique: true },
//     email: { type: Sequelize.STRING, allowNull: false, unique: true },
//     password: { type: Sequelize.STRING },
//     createdAt: { type: Sequelize.DATE },
//     updatedAt: { type: Sequelize.DATE },
// });