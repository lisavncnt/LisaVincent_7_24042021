'use strict';
const {Sequelize, database, DataTypes } = require('./connexion');

const Comment = database.define('comments', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    post_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    Sequelize,
    modelName: 'Comment',
    underscored: true,
    paranoid: false
});

module.exports = Comment;