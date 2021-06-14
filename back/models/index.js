const User = require('./user');
const Post = require('./post');
const Img = require('./img');
const Comment = require('./comment');

const { database } = require('./connexion');

async function loadModel() {
  await User.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null)
  await Post.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null)
  await User.sync({alter:true});
  await Post.sync({alter:true});
  await Comment.sync({alter:true});
  await Img.sync({alter: true});
  await User.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null)
  await Post.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null)
};
// loadModel();

module.exports = {User, Post, Comment, Img};