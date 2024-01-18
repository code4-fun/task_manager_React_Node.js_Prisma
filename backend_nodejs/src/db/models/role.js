import { Model, DataTypes } from 'sequelize'
import connection from '../connection.js'

const initRole = (sequelize, Types) => {
  class Role extends Model {}

  Role.init({
    id: {
      primaryKey: true,
      type: Types.UUID,
      defaultValue: Types.UUIDV4
    },
    age: {
      type: Types.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Role',
    tableName: 'Roles',
    timestamps: false
  })

  return Role
}

export default initRole(connection, DataTypes)
