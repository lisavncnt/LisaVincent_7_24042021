'use strict';
const {Sequelize, database, DataTypes} = require('./connexion');

const Img = database.define('images',{
    id: {
        type:DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
    }
},{
    Sequelize,
    modelName: 'Img',
    underscored: true,
    paranoid: false,
    orderBy: [["created_at", "DESC"]],
});

module.exports = Img;