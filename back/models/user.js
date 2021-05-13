'use strict';
const {Sequelize, DataTypes, database} = require('./connexion');
const {Post} = require('./index');


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
    // post_id: {type: DataTypes.UUID},
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
// User.associate = function(models) {
//   User.hasMany(models.Post, {
//       foreignKey: 'post_id',
//       as: 'post'
//   });
//   Post.belongsTo(models.User, {
//       foreignKey:'user_id',
//       as: 'user'
//   });
// };
// User.associate = function(models) {
//     User.hasMany(models.Comment, {
//         foreignKey: 'comment_id',
//         as: 'comment'
//     });
//     Comment.belongsTo(models.User, {
//         foreignKey: 'user_id',
//         as: 'user'
//     });
// };
// User.hasMany(Post);
// User.hasMany(Comment);
    
module.exports = User;

// post_id: {
    //     type: DataTypes.UUID,
    //     defaultValue: DataTypes.UUIDV4,
    //     foreignKey: Post.id,
    //     as: "post_id",
    // },
    // comment_id: {
    //     type: DataTypes.STRING,
    //     foreignKey: Comment.id,
    //     as: "comment_id"
    // },