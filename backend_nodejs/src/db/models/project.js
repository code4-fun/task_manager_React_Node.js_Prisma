import { Model, DataTypes } from 'sequelize'
import connection from '../connection.js'

const initProject = (sequelize, Types) => {
  class Project extends Model {}

  Project.init({
    id: {
      primaryKey: true,
      type: Types.UUID,
      defaultValue: Types.UUIDV4
    },
    name: {
      type: Types.STRING,
      allowNull: false
    },
    description: {
      type: Types.STRING
    }
  }, {
    sequelize,
    modelName: 'Project',
    tableName: 'Projects',
    timestamps: true,
    updatedAt: false
  })

  return Project
}

export default initProject(connection, DataTypes)
