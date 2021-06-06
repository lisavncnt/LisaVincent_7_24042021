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
    password: { 
        type: DataTypes.STRING, 
        required: true 
    },
    image_url: { 
        type: DataTypes.STRING, 
        defaultValue: "https://media.istockphoto.com/vectors/woman-default-avatar-icon-vector-isolated-on-white-vector-id1310731736?b=1&k=6&m=1310731736&s=170667a&w=0&h=z_vIF9VJO9DGW_45isCqfmVFL0FOZUbIxZWKfOucwtU=", 
    },
    is_admin: {
        type:DataTypes.BOOLEAN,
        defaultValue:0
    },
    totalLiked: {
        type: DataTypes.INTEGER,
        required: false,
        allowNull: true,
        defaultValue: 0
    },
}, {
    Sequelize,
    modelName: 'User',
    underscored: true,
    paranoid: false
});

module.exports = User;