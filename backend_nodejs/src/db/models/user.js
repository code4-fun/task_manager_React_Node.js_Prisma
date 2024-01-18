import { Model, DataTypes } from 'sequelize'
import connection from '../connection.js'

const initUser = (sequelize, Types) => {
  class User extends Model {}

  User.init({
    id: {
      primaryKey: true,
      type: Types.UUID,
      defaultValue: Types.UUIDV4
    },
    name: {
      type: Types.STRING
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: false
  })

  return User
}

export default initUser(connection, DataTypes)
