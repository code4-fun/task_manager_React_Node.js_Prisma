/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async t => {
      return Promise.all([
        await queryInterface.sequelize.query(`
          create type "Status" as enum ('Queue', 'Development', 'Done');
        `, {transaction: t}),

        await queryInterface.createTable('Boards', {
          id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
          },
          order: {
            type: Sequelize.INTEGER
          }
        }, {transaction: t}),

        await queryInterface.addColumn('Boards', 'status', {
          type: 'public."Status"'
        }, {transaction: t})
      ]);
    });
  },
  async down(queryInterface) {
    return queryInterface.sequelize.transaction(async t => {
      return Promise.all([
        await queryInterface.dropTable('Boards', { transaction: t }),
        await queryInterface.sequelize.query(`
          drop type if exists "Status";
        `, {transaction: t})
      ]);
    });
  }
};
