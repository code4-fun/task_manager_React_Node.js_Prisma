/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async t => {
      return Promise.all([
        await queryInterface.createTable('Roles', {
          id: {
            primaryKey: true,
            allowNull: false,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
          },
        }, {transaction: t}),

        await queryInterface.createTable('RoleUser', {
          userId: {
            primaryKey: true,
            allowNull: false,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            references: {
              model: {
                tableName: 'Users'
              },
              key: 'id',
              onDelete: 'cascade',
              onUpdate: 'cascade'
            }
          },
          roleId: {
            primaryKey: true,
            allowNull: false,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            references: {
              model: {
                tableName: 'Roles'
              },
              key: 'id',
              onDelete: 'cascade',
              onUpdate: 'cascade'
            }
          },
        }, {transaction: t}),
      ]);
    });
  },
  async down(queryInterface) {
    return queryInterface.sequelize.transaction(async t => {
      return Promise.all([
        await queryInterface.dropTable('RoleUser', { transaction: t }),
        await queryInterface.dropTable('Roles', { transaction: t })
      ]);
    });
  }
};
