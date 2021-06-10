'use strict';
const {Sequelize, database, DataTypes} = require('./connexion');

const Post = database.define('posts', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
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
        allowNull: true,
        defaultValue: 0
    },
}, {
    Sequelize,
    modelName: 'Post',
    underscored: true,
    paranoid: false,
    orderBy: [["created_at", "DESC"]]
});

module.exports = Post;