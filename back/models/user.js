'use strict';
const {Sequelize, DataTypes, database} = require('./connexion');

const User = database.define('users', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
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
    },
}, {
    Sequelize,
    modelName: 'User',
    underscored: true,
    paranoid: false
});

module.exports = User;