'use strict';
const {Sequelize, database, DataTypes } = require('./connexion');

const Comment = database.define('comments', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    }
}, {
    Sequelize,
    modelName: 'Comment',
    underscored: true,
    paranoid: false,
    orderBy: [["createdAt", "DESC"]],
});

module.exports = Comment;