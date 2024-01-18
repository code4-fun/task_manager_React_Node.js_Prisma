import { Model, DataTypes } from 'sequelize'
import connection from '../connection.js'

const initBoard = (sequelize, Types) => {
  class Board extends Model {}

  Board.init({
    id: {
      primaryKey: true,
      type: Types.UUID,
      defaultValue: Types.UUIDV4
    },
    order: {
      type: Types.INTEGER,
      allowNull: false
    },
    status: {
      type: Types.ENUM,
      values: ['Queue', 'Development', 'Done']
    }
  }, {
    sequelize,
    modelName: 'Board',
    tableName: 'Boards',
    timestamps: true,
    updatedAt: false
  })

  return Board
}

export default initBoard(connection, DataTypes)
