// 'use strict';
// module.exports = {
//     up: async (QueryInterface, Sequelize) => {
//         // const transaction = await queryInterface.sequelize.transaction();
//         await QueryInterface.createTable('posts', {
//             id: {
//                 allowNull: false,
//                 autoIncrement: false,
//                 primaryKey: true,
//                 type: Sequelize.UUID,
//                 defaultValue: Sequelize.UUIDV4
//             }, 
//             title: {
//                 allowNull: false,
//                 type: Sequelize.STRING,
//                 unique: true
//             },
//             content: {
//                 allowNull: false,
//                 type: Sequelize.STRING,
//                 unique: true
//             },
//             likes: {
//                 allowNull: true,
//                 type: Sequelize.INTEGER
//             },
//             created_at: {
//                 type: Sequelize.DATE
//             },
//             updated_at: {
//                 type: Sequelize.DATE,
//             }
//         })
//         // .then(
//         //     await QueryInterface.removeConstraint(
//         //         'posts',
//         //         'ck_user_pseudo',
//         //         { transaction }
//         //     ),
//         //     await queryInterface.addConstraint('posts', [user_pseudo], {
//         //         type: 'foreign key',
//         //         name: 'ck_post_id',
//         //         references: {
//         //             table: 'posts',
//         //             field: 'id'
//         //         },
//         //         onDelete: 'cascade',
//         //         onUpdate: 'cascade'
//         //     },
//         //     transaction
//         //     ),
//         //     await transaction.commit()
//         // )
//         // .catch(error => {
//         //     await transaction.rollback();
//         //     res.status(400).json({error})
//         // });
//     },
//     down: async (QueryInterface) => {
//         await QueryInterface.dropTable('posts');
//     }
// };