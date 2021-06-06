'use strict';
const {Sequelize, database, DataTypes} = require('./connexion');

const Img = database.define('images',{
    id: {
        type:DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    dislikes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    usersLiked: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    usersDisliked: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    comment_id: {
        type: DataTypes.UUID,
        allowNull: true,
    },
},{
    Sequelize,
    modelName: 'Img',
    underscored: true,
    paranoid: false,
});

module.exports = Img;