// 'use strict';
// module.exports = {
//     up: async (queryInterface, Sequelize) => {
//       const transaction = await queryInterface.sequelize.transaction();
//       await queryInterface.createTable('users', {
//         id: {
//           allowNull: false,
//           autoIncrement: false,
//           primaryKey: true,
//           type: Sequelize.UUID,
//           defaultValue: Sequelize.UUIDV4
//         },
//         pseudo: {
//           allowNull: false,
//           type: Sequelize.STRING,
//           unique:true
//         },
//         email: {
//           allowNull: false,
//           type: Sequelize.STRING,
//           unique:true
//         },
//         password: {
//           allowNull: false,
//           type: Sequelize.STRING
//         },
//         image_url: {
//           allowNull: true,
//           type: Sequelize.STRING
//         },
//         is_admin: {
//           type: Sequelize.BOOLEAN,
//           defaultValue: false
//         },
//         created_at: {
//           type: Sequelize.DATE,
//           defaultValue: Sequelize.NOW
//         },
//         updated_at: {
//           type: Sequelize.DATE,
//         }
//       })
//       .then(
//         queryInterface.removeConstraint(
//           'users',
//           'ck_post_id',
//           { transaction }
//         ),
//         queryInterface.addConstraint('users', ['post_id'], {
//           type: 'foreign key',
//           name: 'ck_post_id',
//           references: {
//             table: 'posts',
//             field: 'id'
//           },
//           onDelete: 'cascade',
//           onUpdate: 'cascade'
//         },
//         transaction 
//         ),
//         transaction.commit()
//       )
//       .catch(error => {
//         transaction.rollback();
//         res.status(400).json({error})
//       });
//     },
//     down: async (queryInterface) => {
//       await queryInterface.dropTable('users');
//     }
//   };
 