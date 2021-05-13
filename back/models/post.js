'use strict';
const {Sequelize, database, DataTypes} = require('./connexion');

const Post = database.define('posts', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    // pseudo: { type: DataTypes.STRING, },
    user_id: { type: DataTypes.UUID, allowNull: false },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
}, {
    Sequelize,
    modelName: 'Post',
    underscored: true,
    paranoid: false
});

module.exports = Post;