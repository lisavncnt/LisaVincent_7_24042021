const { Sequelize, UUID, UUIDV4 } = require('sequelize');
const sequelize = require('../utils/database');

const User = sequelize.define('users', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    imageUrl: { type: Sequelize.STRING },
    complete_name: { type: Sequelize.STRING, allowNull: true, unique: true},
    birthday: { type: Sequelize.DATE },
    city: { type: Sequelize.STRING },
    pseudo: { type: Sequelize.STRING, allowNull: false, unique: true },
    email: { type: Sequelize.STRING, allowNull: false, unique: true },
    password: { type: Sequelize.STRING },
    createdAt: { type: Sequelize.DATE },
    updatedAt: { type: Sequelize.DATE },
});

module.exports = User;